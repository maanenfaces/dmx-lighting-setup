# Set de scènes de base - Concert

## Description + Plan

Ce set est prévu pour 7 spots LED (vue depuis le public):

- B1 (370W): fond de scène coin gauche, 20/30cm du sol, inclinaison 35° vers haut, direction public + centre scène
- B2 (84W) : fond de scène centré gauche, 20/30cm du sol, inclinaison 35° vers haut, direction public
- B3 (84W) : fond de scène centré droit, 20/30cm du sol, inclinaison 35° vers haut, direction public
- B4 (84W) : fond de scène coin droit, 20/30cm du sol, inclinaison 35° vers haut, direction public + centre scène
- B5 (84W) : fond de scène coin droit, 20/30cm du sol, inclinaison 35° vers haut, direction public + centre scène
- F1 (32W) : front centré gauche au sol, inclinaison 70° vers haut, direction fond de scène
- F2 (32W) : front centré droit au sol, inclinaison 70° vers haut, direction fond de scène

Il considère les prérequis suivants:

- Scène 7m × 3,5m
- Écran vidéo 3m centré, écran à 50 cm du sol, VP ultra courte focale posé au sol à 1,5m de l’écran
- Instruments alignés : batterie à gauche (hors écran), basse/chant centre-gauche, guitare centre-droit, clavier à droite (hors écran).
- 8 bougies LED réparties pour la texture.

Schéma:

```
                [    Ecran VP 3m    ]
------------------------------------------------------
[B1]        [B2]                     [B3]       [B4][B5]
   [Batterie]            [VP]           [Synthés]  
                [Basse]        [Guitare]
            [F1]                     [F2]
------------------------------------------------------
                         Public
```

##  Patch DMX

**Remarque :** Chaque spot utilise 7 canaux DMX
(Dimmer + R + G + B + Strobe + Macro + Mode). La numérotation laisse de la place
pour des extensions futures.

**Front**

Spots frontaux sur le devant de la scène.

| Spot | Position        | Adresse de départ | Canaux utilisés |
| ---- | --------------- | ----------------- | --------------- |
| F1   | Avant gauche    | 1                 | 1–7             |
| F2   | Avant droit     | 9                 | 9–15            |
| F3   | (réservé futur) | 17                | 17–23           |
| F4   | (réservé futur) | 25                | 25–31           |

**Back**

Spots back sur l'arrière de la scène.

| Spot     | Position        | Adresse de départ | Canaux utilisés |
|----------| --------------- | ----------------- | --------------- |
| B1       | Coin gauche     | 101               | 101–107         |
| B2       | Centre gauche   | 109               | 109–115         |
| B3       | Centre droit    | 117               | 117–123         |
| B4       | Coin droit      | 125               | 125–131         |
| B5       | Coin droit      | 133               | 133-139         |

## Set de scène

### Scène 1 — BLACKOUT

- Tous dimmers = 0. (DMX 0)

### Scène 2 — AVANT / APRÈS CONCERT (lumière d’installation)

- F1, F2 = 100% white warm → DMX Dimmer 200–220 (ou RGB 255,240,200 if RGBW)
- B1–B5 = 10–20% ambient red → DMX 25–51

### Scène 3 — SCÈNE PRINCIPALE (ambiance rouge + ombres mouvantes)

- Base fixe : B1 = 89, B2–B5 = 153, F1/F2 = 76
- Chaser / EFX :
  - Scintillement irrégulier : choisis 1–2 spots (par ex. B4 & B5 côte à côte) et crée un chaser qui les fait monter/descendre de 60 → 153 sur des temps longs : fade 1–2 s, hold 5–15 s, pause aléatoire 10–20 s.
  - Ombres mouvantes : applique un EFX dimmer lent (sine) sur B1–B3 avec phases décalées (ex. 0°, 90°, 180°).

### Scène 4 — PENOMBRE + scintillement doux

- B1–B5 base à 10–25% (DMX 25–64)
- F1/F2 très bas (DMX 20–40)
- Chaser “pulsation douce” : 1–2 spots (par ex. F1 et F2) qui clignotent très lentement, fades longs (2–4 s), pauses aléatoires 8–15 s.

## Setlist label QLC+

Note: copier/coller le bloc qui suit dans le label de la set list
dans le console virtuelle.

<pre style="font-size: 2.7em; text-align: left;">
INTRO     : TWILIGHT STROBE
GDP       : MAIN RED
INTERLUDE : TWILIGHT
DARKNESS  : MAIN RED
INTERLUDE : STROBE TWILIGHT
LIGEIA    : MAIN BLUE
PART 1    : MAIN BLUE
BOOGEYMAN : MAIN RED
ROBOTS    : MAIN RED PULSE
OUTRO     : MAIN RED OUTRO
</pre>
