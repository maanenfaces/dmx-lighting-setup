# Set 4 spots au sol

## Description + Plan

Ce set est prévu pour 4 spots LED (vue depuis le public):

| Spot | Puis. | Position            | Installation | Inclinaison   | Direction                  |
|------|-------|---------------------|--------------|---------------|----------------------------|
| B1   | 370W  | Back côté batterie  | Au sol       | 35° vers haut | Vers public + centre scène |
| F2   | 84W   | Front côté batterie | Au sol       | 35° vers haut | Vers côté claviers         |
| F3   | 84W   | Front côté claviers | Au sol       | 35° vers haut | Vers côté batterie         |
| B3   | 84W   | Back côté claviers  | Au sol       | 35° vers haut | Vers public + centre scène |

Prérequis:

- Scène 3,5m × 3m
- Disposition en carré : batterie + claviers en back, basse + guitare en front
- 6 bougies LED réparties pour la texture.

Plan:

```
--------------------------------
      [B1]            [B3]
   [Batterie]      [Claviers]  
     [Guitare]    [Basse]
[F2]                        [F3]
--------------------------------
             Public
```

##  Patch DMX

**Remarque :** Chaque spot utilise 7 canaux DMX
(Dimmer + R + G + B + Strobe + Macro + Mode). La numérotation laisse de la place
pour des extensions futures.

| Spot | Position            | Code Spot | Canaux utilisés |
|------|---------------------| --------- | --------------- |
| B1   | back  côté batterie | A141      | 141–152 (11)    |
| F2   | front côté batterie | D109      | 109–115 (7)     |
| F3   | front côté claviers | D117      | 117–123 (7)     |
| B3   | back  côté claviers | D133      | 133-139 (7)     |
