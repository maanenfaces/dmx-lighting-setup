const fs = require('fs');
const path = require('path');
const dgram = require('dgram');
const WebSocket = require('ws');
const xml2js = require('xml2js');

const WS_PORT = 8080;
const ARTNET_PORT = 6454;
const UNIVERSE = 0;

/* =========================
   WebSocket
   ========================= */

const wss = new WebSocket.Server({ port: WS_PORT });

/* =========================
   Chargement config QLC+
   ========================= */

const parser = new xml2js.Parser();
const QXW_PATH = process.env.QXW_PATH || '/app/data/show.qxw';
const WATCHDOG_TIMEOUT = 5000;

let fixtures = [];
let lastDmxFrame = null;
let watchdogTimer;

// Fonction isolée pour charger/recharger la config
function loadConfig(broadcast = false) {
    try {
        console.log(`Lecture du fichier QXW : ${QXW_PATH}`);
        const xmlData = fs.readFileSync(QXW_PATH, 'utf8');

        parser.parseString(xmlData, (err, result) => {
            if (err) {
                console.error("❌ Erreur de parsing XML:", err);
                return;
            }

            const monitorItems = {};
            try {
                const monitor = result.Workspace.Engine[0].Monitor;
                if (monitor && monitor[0].FxItem) {
                    monitor[0].FxItem.forEach(item => {
                        monitorItems[item.$.ID] = {
                            x: parseInt(item.$.XPos, 10),
                            y: parseInt(item.$.YPos, 10)
                        };
                    });
                }
            } catch (e) {
                console.warn("⚠️ Aucune position trouvée dans le moniteur QLC+");
            }

            const fixtureList = result.Workspace.Engine[0].Fixture || [];
            fixtures = fixtureList.map(f => {
                const id = f.ID[0];
                return {
                    id: id,
                    name: f.Name[0],
                    address: parseInt(f.Address[0], 10),
                    channels: parseInt(f.Channels[0], 10),
                    model: f.Model ? f.Model[0] : "Generic",
                    pos: monitorItems[id] || { x: 0, y: 0 }
                };
            });

            console.log(`✅ Configuration QLC+ chargée (${fixtures.length} fixtures)`);

            // Si broadcast est vrai, on envoie la mise à jour à tous les clients connectés
            if (broadcast) {
                const configMsg = JSON.stringify({ type: 'config', fixtures });
                wss.clients.forEach(ws => {
                    if (ws.readyState === WebSocket.OPEN) ws.send(configMsg);
                });
            }
        });
    } catch (e) {
        console.error("❌ ERREUR : Lecture du fichier impossible", e.message);
    }
}

// Premier chargement au démarrage
loadConfig();

// --- FILE WATCHER ROBUSTE ---
console.log(`Watching for changes on: ${QXW_PATH}`);

// On utilise watchFile car c'est le plus fiable sur les volumes montés
// On augmente un peu la fréquence pour plus de réactivité (300ms)
fs.watchFile(QXW_PATH, { interval: 300 }, (curr, prev) => {
    // Si la date de modification (mtime) a changé
    if (curr.mtimeMs !== prev.mtimeMs) {
        console.log(`🔄 [${new Date().toLocaleTimeString()}] Fichier QXW mis à jour, rechargement...`);
        loadConfig(true);
    }
});

// Sécurité supplémentaire : si le fichier est supprimé/recréé par QLC+
// on s'assure que le watcher ne "meurt" pas.
fs.access(QXW_PATH, fs.constants.F_OK, (err) => {
    if (err) console.error(`⚠️ Attention: Le fichier ${QXW_PATH} n'est pas accessible.`);
});

function resetWatchdog() {
    clearTimeout(watchdogTimer);
    watchdogTimer = setTimeout(() => {
        console.error("⛔ ALERT: Aucun signal Art-Net depuis 5s. Suicide pour redémarrage...");
        process.exit(1);
    }, WATCHDOG_TIMEOUT);
}

resetWatchdog();

/* =========================
   Art-Net UDP raw
   ========================= */

const udp = dgram.createSocket('udp4');

udp.on('error', (err) => {
    console.error('UDP error:', err);
});

udp.on('listening', () => {
    const addr = udp.address();
    console.log(`Art-Net listening on ${addr.address}:${addr.port}`);
});

udp.on('message', (msg, rinfo) => {
    if (msg.length < 18) return;
    if (msg.slice(0, 8).toString('ascii') !== 'Art-Net\0') return;

    const opcode = msg.readUInt16LE(8);
    if (opcode !== 0x5000) return;

    const universe = msg.readUInt16LE(14);
    if (universe !== UNIVERSE) return;

    const length = msg.readUInt16BE(16);
    if (length < 2 || length > 512) return;
    if (msg.length < 18 + length) return;

    const dmxData = msg.slice(18, 18 + length);
    lastDmxFrame = Array.from(dmxData);

    wss.clients.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                type: 'dmx',
                universe,
                data: lastDmxFrame
            }));
        }
    });

    resetWatchdog();
});

udp.bind(ARTNET_PORT, '0.0.0.0');

/* =========================
   WebSocket clients
   ========================= */

wss.on('connection', (ws) => {
    console.log('Client UI connecté');

    ws.send(JSON.stringify({
        type: 'config',
        fixtures
    }));

    if (lastDmxFrame) {
        ws.send(JSON.stringify({
            type: 'dmx',
            universe: UNIVERSE,
            data: lastDmxFrame
        }));
    }
});

console.log(`WS listening on :${WS_PORT}`);
