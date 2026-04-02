import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

let scene, camera, renderer, controls, transformControls;
let lightsMap = {};
let fixturesData = [];
let lastDmxData = new Array(512).fill(0);
let globalLastDmx = new Array(512).fill(0);

// --- VARIABLES DE SCÈNE & LOGS ---
let currentSceneName = "Aucune";
let sceneStartTime = Date.now();
const SCALE_FACTOR = 100;

// Interface Overlay
const infoDiv = document.createElement('div');
infoDiv.style.cssText = "position:absolute; top:10px; left:10px; color:white; font-family:monospace; background:rgba(0,0,0,0.7); padding:10px; pointer-events:none; border-left: 4px solid #00ff00; z-index:100;";
document.body.appendChild(infoDiv);

// Panneau d'aide au positionnement (Copier-Coller QLC+)
const helperDiv = document.createElement('div');
helperDiv.style.cssText = "position:absolute; top:10px; right:10px; color:#00ff00; font-family:monospace; background:rgba(0,0,0,0.8); padding:15px; border:1px solid #444; display:none; width:300px; z-index:100;";
document.body.appendChild(helperDiv);

const logDiv = document.createElement('div');
logDiv.style.cssText = "position:absolute; bottom:10px; left:10px; color:#aaa; font-family:monospace; background:rgba(0,0,0,0.7); padding:10px; max-height:200px; overflow-y:auto; width:350px; font-size:12px; border: 1px solid #333;";
document.body.appendChild(logDiv);

init();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020202);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 50);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    scene.add(new THREE.GridHelper(100, 50, 0x444444, 0x222222));

    controls = new OrbitControls(camera, renderer.domElement);
    transformControls = new TransformControls(camera, renderer.domElement);
    scene.add(transformControls);

    // --- LOGIQUE DE POSITIONNEMENT LIVE ---
    transformControls.addEventListener('dragging-changed', (e) => controls.enabled = !e.value);
    transformControls.addEventListener('change', updateHelperUI);

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('resize', onWindowResize);

    window.addEventListener('keydown', (e) => {
        switch (e.key.toLowerCase()) {
            case 'g': transformControls.setMode('translate'); break; // G pour Grab (Déplacer)
            case 'r': transformControls.setMode('rotate'); break;    // R pour Rotate (Pivoter)
        }
    });

    connectWS();
    animate();
}

function updateHelperUI() {
    const obj = transformControls.object;
    if (!obj) return;

    // Calculs
    const qlcX = Math.round((obj.position.x + 40) * SCALE_FACTOR);
    const qlcY = Math.round((obj.position.z + 20) * SCALE_FACTOR);
    const yVal = obj.position.y.toFixed(1);
    const pVal = Math.round(THREE.MathUtils.radToDeg(obj.rotation.y));

    const head = obj.children.find(c => c.name === "headGroup");
    const tVal = head ? Math.round(THREE.MathUtils.radToDeg(head.rotation.x)) : 0;

    helperDiv.style.display = "block";
    helperDiv.innerHTML = `
        <b style="color:white">ÉDITEUR DE FIXTURE</b><br>
        <small>[G] Déplacer | [R] Pivoter</small><br><br>
        Position Monitor QLC+ :<br>
        <span style="color:yellow">X: ${qlcX} | Y: ${qlcY}</span><br><br>
        Tag à ajouter au nom :<br>
        <span style="background:#111; padding:8px; display:block; border:1px dashed #555; user-select:all; color:#00ff00">
        [Y=${yVal} P=${pVal} T=${tVal}]
        </span>
    `;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function connectWS() {
    const socket = new WebSocket(`ws://${window.location.hostname}:8080`);
    socket.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.type === 'config') { fixturesData = msg.fixtures; create3DObjects(); }
        else if (msg.type === 'dmx') { globalLastDmx = msg.data; }
    };
}

function create3DObjects() {
    // 1. Mémoriser quel objet était sélectionné avant le nettoyage
    // On récupère l'ID stocké dans le userData de l'objet actuellement attaché
    const selectedId = transformControls.object ? transformControls.object.userData.fixtureId : null;

    // 2. Nettoyage de la scène existante
    Object.values(lightsMap).forEach(l => scene.remove(l.group));
    lightsMap = {};

    fixturesData.forEach((fix) => {
        const group = new THREE.Group();
        // IMPORTANT : On stocke l'ID pour pouvoir le retrouver après une mise à jour auto
        group.userData.fixtureId = fix.id;

        // --- PARSING FACULTATIF ET INDÉPENDANT ---
        let posY = 18;
        let pan = 0;
        let tilt = 0;

        const extractParam = (key) => {
            const regex = new RegExp(`${key}=([-?0-9.]+)`, 'i');
            const match = fix.name.match(regex);
            return match ? parseFloat(match[1]) : null;
        };

        const valY = extractParam('Y');
        const valP = extractParam('P');
        const valT = extractParam('T');

        if (valY !== null) posY = valY;
        if (valP !== null) pan = THREE.MathUtils.degToRad(valP);
        if (valT !== null) tilt = THREE.MathUtils.radToDeg(valT); // Correction : bien utiliser les degrés si c'est ce que tu as dans le nom

        // Positionnement X, Z (QLC+) et Y (Tag)
        const posX = (fix.pos.x / SCALE_FACTOR) - 40;
        const posZ = (fix.pos.y / SCALE_FACTOR) - 20;
        group.position.set(posX, posY, posZ);

        // Structure Head / Body
        const headGroup = new THREE.Group();
        headGroup.name = "headGroup";

        const bodyMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(0.6, 0.8, 2, 16),
            new THREE.MeshStandardMaterial({ color: 0x151515, metalness: 0.6, roughness: 0.4 })
        );
        bodyMesh.rotation.x = Math.PI / 2;
        headGroup.add(bodyMesh);

        // Application des rotations (Y pour Pan, X pour Tilt)
        group.rotation.y = pan;
        headGroup.rotation.x = THREE.MathUtils.degToRad(valT || 0);
        group.add(headGroup);

        // Étiquette visuelle
        const displayName = fix.name.split('[')[0].trim();
        const canvas = document.createElement('canvas');
        canvas.width = 512; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'; ctx.fillRect(0, 0, 512, 256);
        ctx.strokeStyle = '#00ff00'; ctx.lineWidth = 15; ctx.strokeRect(0, 0, 512, 256);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 70px Arial'; ctx.textAlign = 'center';
        ctx.fillText(displayName, 256, 110);
        ctx.font = 'bold 50px Arial';
        ctx.fillText(`ADDR: ${fix.address + 1}`, 256, 200);

        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas) }));
        sprite.position.set(0, 4, 0);
        sprite.scale.set(8, 4, 1);
        group.add(sprite);

        // Faisceau
        const beamGeom = new THREE.CylinderGeometry(0.2, 12, 35, 32, 1, true);
        beamGeom.translate(0, -17.5, 0);
        const beam = new THREE.Mesh(beamGeom, new THREE.MeshBasicMaterial({
            color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false
        }));
        headGroup.add(beam);

        // Spotlight
        const light = new THREE.SpotLight(0xffffff, 0, 150, Math.PI / 4, 0.5);
        const target = new THREE.Object3D();
        target.position.set(0, -1, 0);
        headGroup.add(target);
        light.target = target;
        headGroup.add(light);

        scene.add(group);

        lightsMap[fix.id.toString()] = {
            group, light, beam, head: headGroup,
            addr: parseInt(fix.address),
            channels: parseInt(fix.channels)
        };

        // 3. Restaurer la sélection si cet objet était celui manipulé
        if (selectedId && fix.id === selectedId) {
            transformControls.attach(group);
        }
    });
}

function update3D(dmx) {
    const ids = Object.keys(lightsMap);
    if (ids.length === 0) return;
    const time = (performance.now() / 1000) % 10000;
    infoDiv.innerHTML = `SÉQUENCE ACTIVE : ${currentSceneName}<br>DURÉE : ${((Date.now() - sceneStartTime) / 1000).toFixed(1)}s`;

    ids.forEach(id => {
        const l = lightsMap[id];
        const base = l.addr;
        const d = (dmx[base] || 0) / 255;
        const strobeRaw = (l.channels === 7) ? dmx[base + 5] : dmx[base + 7];
        let strobeFactor = 1;
        if (strobeRaw > 10) {
            const freq = 0.5 + ((strobeRaw - 11) / 244) * 14.5;
            strobeFactor = Math.sin(2 * Math.PI * freq * time) > 0 ? 1 : 0;
        }
        const finalInt = d * strobeFactor;
        l.light.color.setRGB((dmx[base+1]||0)/255, (dmx[base+2]||0)/255, (dmx[base+3]||0)/255);
        l.light.intensity = finalInt * 800;
        l.beam.material.color.copy(l.light.color);
        l.beam.material.opacity = finalInt * 0.4;
    });
}

function onMouseDown(event) {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // On cherche l'intersection
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        let obj = intersects[0].object;
        // On remonte jusqu'au Group parent (le spot)
        while(obj.parent && !(obj instanceof THREE.Group)) { obj = obj.parent; }

        if (obj instanceof THREE.Group && obj !== scene) {
            transformControls.attach(obj);
            updateHelperUI();
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    update3D(globalLastDmx);
    renderer.render(scene, camera);
}
