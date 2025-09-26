# Set de scènes de base - Concert

Ce set est prévu pour 7 spots LED (vue depuis le public):

- F1, F2: 2 frontaux (36W chacun), au sol,
- SIDE_L1: 1 latéral gauche (84W), en hauteur,
- BACK_L1: 1 arrière gauche (324W), derrière la batterie au sol,
- SIDE_R1, SIDE_R2: 2 latéraux droite (84W), en hauteur,
- BACK_R1: 1 arrière droite (84W), derrière les synthés au sol.

Il considère les prérequis suivants:

- Scène : 6m de large x 3m de profondeur
- Les instruments sont alignés sur scène
- Vidéo-projecteur au sol sur la scène devant l'écran (ultra-courte focale)
- Ecran vidéo-projecteur en fond de scène centré

Schéma:

```
               Vidéo projecteur / fond scène
------------------------------------------------------
      [BACK_L1]                            [BACK_R1]
       Batterie       (VP_au_sol)           Synthés  
       Batterie                             Synthés  [SIDE_R1]
[SIDE_L1]         Basse           Guitare            [SIDE_R2]
              [F1]                      [F2]
------------------------------------------------------
                         Public
```

# Set de Scenes - Patch mis à jour avec couleurs visibles

## 1. Ambiance House Lights (Avant / Après concert)

- Objectif : éclairage complet, visible pour tout le monde
- Spots : tous → Blanc fort (100%)
- Effets : aucun, statique
- Utilisation : avant le concert et après le concert

| Scene                 | Spot    | Dimmer | Red  | Green | Blue | Strobe | Macro | Mode | Notes                  |
|-----------------------|---------|--------|------|-------|------|--------|-------|------|:-----------------------|
| Avant / Après concert | F1      | 150    | 255  | 255   | 255  | 0      | 0     | 0    | Blanc fort front 36W   |
|                       | F2      | 150    | 255  | 255   | 255  | 0      | 0     | 0    | Blanc fort front 36W   |
|                       | SIDE_L1 | 220    | 255  | 255   | 255  | 0      | 0     | 0    | Blanc fort latéral 84W |
|                       | SIDE_L2 | 220    | 255  | 255   | 255  | 0      | 0     | 0    | Blanc fort latéral 84W |
|                       | SIDE_R1 | 220    | 255  | 255   | 255  | 0      | 0     | 0    | Blanc fort latéral 84W |
|                       | SIDE_R2 | 220    | 255  | 255   | 255  | 0      | 0     | 0    | Blanc fort latéral 84W |

## 2. Ambiance Dark / Low Light 1 (Interlude)

- Objectif : ambiance mystérieuse, entrée des musiciens
- Frontaux : léger blanc doux (30–40%) → juste assez pour voir silhouettes
- Latéraux : rouge ou bleu très faible (10–15%)
- Effets : fade lent pour créer une pulsation subtile

| Scene                  | Spot    | Dimmer | Red  | Green | Blue | Strobe | Macro | Mode | Notes                         |
|------------------------|---------|--------|------|-------|------|--------|-------|------|:------------------------------|
| Intro Concert          | F1      | 50     | 255  | 255   | 255  | 0      | 0     | 0    | Blanc doux front 36W          |
|                        | F2      | 50     | 255  | 255   | 255  | 0      | 0     | 0    | Blanc doux front 36W          |
|                        | SIDE_L1 | 120    | 255  | 0     | 0    | 0      | 0     | 0    | Rouge très faible latéral 84W |
|                        | SIDE_L2 | 120    | 0    | 0     | 255  | 0      | 0     | 0    | Bleu très faible latéral 84W  |
|                        | SIDE_R1 | 120    | 255  | 0     | 0    | 0      | 0     | 0    | Rouge très faible latéral 84W |
|                        | SIDE_R2 | 120    | 0    | 0     | 255  | 0      | 0     | 0    | Bleu très faible latéral 84W  |

## 3. Ambiance Rouge

- Objectif : scène rouge dominante
- Latéraux gauche/droite : rouge 60–70%
- Frontaux : rouge doux 30–40% → dessiner les silhouettes
- Effets : variations lentes sur les dimmers pour créer du mouvement

| Scene                  | Spot    | Dimmer | Red  | Green | Blue | Strobe | Macro | Mode | Notes                   |
|------------------------|---------|--------|------|-------|------|--------|-------|------|:------------------------|
| Ambiance Rouge         | F1      | 80     | 255  | 0     | 0    | 0      | 0     | 0    | Silhouette front 36W    |
|                        | F2      | 80     | 255  | 0     | 0    | 0      | 0     | 0    | Silhouette front 36W    |
|                        | SIDE_L1 | 180    | 255  | 0     | 0    | 0      | 0     | 0    | Rouge moyen latéral 84W |
|                        | SIDE_L2 | 180    | 255  | 0     | 0    | 0      | 0     | 0    | Rouge moyen latéral 84W |
|                        | SIDE_R1 | 180    | 255  | 0     | 0    | 0      | 0     | 0    | Rouge moyen latéral 84W |
|                        | SIDE_R2 | 180    | 255  | 0     | 0    | 0      | 0     | 0    | Rouge moyen latéral 84W |

## 4. Ambiance Rouge / Jaune

- Objectif : couleurs chaudes, mixées
- Latéraux : alternance rouge / jaune
- Frontaux : rouge faible 20–30%
- Effets : fade croisé pour donner vie à la scène

| Scene                  | Spot    | Dimmer | Red  | Green | Blue | Strobe | Macro | Mode | Notes                      |
|------------------------|---------|--------|------|-------|------|--------|-------|------|:---------------------------|
| Ambiance Jaune / Rouge | F1      | 60     | 255  | 128   | 0    | 0      | 0     | 0    | Rouge/jaune doux front 36W |
|                        | F2      | 60     | 255  | 128   | 0    | 0      | 0     | 0    | Rouge/jaune doux front 36W |
|                        | SIDE_L1 | 180    | 255  | 255   | 0    | 0      | 0     | 0    | Jaune latéral 84W          |
|                        | SIDE_L2 | 180    | 255  | 0     | 0    | 0      | 0     | 0    | Rouge latéral 84W          |
|                        | SIDE_R1 | 180    | 255  | 255   | 0    | 0      | 0     | 0    | Jaune latéral 84W          |
|                        | SIDE_R2 | 180    | 255  | 0     | 0    | 0      | 0     | 0    | Rouge latéral 84W          |


## 5. Ambiance Rouge / Vert

- Objectif : rouge sombre plus organique
- Latéraux : rouge dominant 70% + vert dominant 70%
- Frontaux : rouge faible pour maintenir silhouettes
- Effets : mouvements subtils de dimmer pour variation

| Scene                       | Spot    | Dimmer | Red | Green | Blue | Strobe | Macro | Mode | Notes                           |
|-----------------------------|---------|--------|-----|-------|------|--------|-------|------|:--------------------------------|
| Ambiance Rouge + Léger Vert | F1      | 80     | 255 | 20    | 0    | 0      | 0     | 0    | Rouge sombre front 36W          |
|                             | F2      | 80     | 255 | 20    | 0    | 0      | 0     | 0    | Rouge sombre front 36W          |
|                             | SIDE_L1 | 180    | 255 | 30    | 0    | 0      | 0     | 0    | Rouge sombre + vert latéral 84W |
|                             | SIDE_L2 | 180    | 30  | 255   | 0    | 0      | 0     | 0    | Rouge sombre + vert latéral 84W |
|                             | SIDE_R1 | 180    | 255 | 30    | 0    | 0      | 0     | 0    | Rouge sombre + vert latéral 84W |
|                             | SIDE_R2 | 180    | 30  | 255   | 0    | 0      | 0     | 0    | Rouge sombre + vert latéral 84W |

## 6. Ambiance Silhouettes / Contre-jour

- Objectif : mettre les musiciens en silhouette
- Frontaux : très faibles 10% → juste contour
- Latéraux : forts (rouge/blanc) pour éclairer de côté
- Fond vidéo : visible derrière les musiciens

| Scene                     | Spot    | Dimmer | Red  | Green | Blue | Strobe | Macro | Mode | Notes                           |
|---------------------------|---------|--------|------|-------|------|--------|-------|------|:--------------------------------|
| Silhouettes / Contre-jour | F1      | 30     | 255  | 255   | 255  | 0      | 0     | 0    | Faible front blanc pour contour |
|                           | F2      | 30     | 255  | 255   | 255  | 0      | 0     | 0    | Faible front blanc pour contour |
|                           | SIDE_L1 | 200    | 255  | 255   | 255  | 0      | 0     | 0    | Latéraux forts blanc 84W        |
|                           | SIDE_L2 | 200    | 255  | 0     | 0    | 0      | 0     | 0    | Latéraux forts blanc 84W        |
|                           | SIDE_R1 | 200    | 255  | 255   | 255  | 0      | 0     | 0    | Latéraux forts rouge 84W        |
|                           | SIDE_R2 | 200    | 255  | 0     | 0    | 0      | 0     | 0    | Latéraux forts rouge 84W        |

## 7. Effet Strobe Blanc Color Rouge

- Objectif : climax ou break
- Un spot latéral : strobe blanc rapide (5–10 Hz)
- Autres spots : rouge fixe
- Effets : ponctuel, utilisé sur un temps court

| Scene                  | Spot    | Dimmer | Red  | Green | Blue | Strobe | Macro | Mode | Notes                           |
|------------------------|---------|--------|------|-------|------|--------|-------|------|:--------------------------------|
| Strobe / Accent        | F1      | 80     | 255  | 0     | 0    | 0      | 0     | 0    | Rouge fixe front 36W            |
|                        | F2      | 80     | 255  | 0     | 0    | 0      | 0     | 0    | Rouge fixe front 36W            |
|                        | SIDE_L1 | 180    | 255  | 255   | 255  | 250    | 0     | 0    | Strobe blanc rapide latéral 84W |
|                        | SIDE_L2 | 180    | 255  | 0     | 0    | 0      | 0     | 0    | Rouge fixe latéral 84W          |
|                        | SIDE_R1 | 180    | 255  | 255   | 255  | 250    | 0     | 0    | Strobe blanc rapide latéral 84W |
|                        | SIDE_R2 | 180    | 255  | 0     | 0    | 0      | 0     | 0    | Rouge fixe latéral 84W          |
