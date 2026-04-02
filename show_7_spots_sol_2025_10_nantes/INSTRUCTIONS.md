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

| Spot | Position        | Code Spot | Canaux utilisés |
| ---- | --------------- | --------- | --------------- |
| F1   | Avant gauche    | D001      | 1–7   (7)       |
| F2   | Avant droit     | D009      | 9–15  (7)       |
| F3   | (réservé futur) | D017      | 17–23 (7)       |
| F4   | (réservé futur) | D025      | 25–31 (7)       |

**Back**

Spots back sur l'arrière de la scène.

| Spot     | Position        | Code Spot | Canaux utilisés |
|----------| --------------- | --------- | --------------- |
| B2       | Centre gauche   | D109      | 109–115 (7)     |
| B3       | Centre droit    | D117      | 117–123 (7)     |
| B4       | Coin droit      | D125      | 125–131 (7)     |
| B5       | Coin droit      | D133      | 133-139 (7)     |
| B1       | Coin gauche     | A141      | 141–152 (11)    |
