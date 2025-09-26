# Projet QLC+ — Show 6 Spots LED

Ce dépôt contient la configuration QLC+ (v4.14.3) pour piloter un set de
6 spots LED via Raspberry Pi + iPad et un controlleur DMX USB.

L'objectif est de pouvoir importer l'output MIDI dans l'iPad pour qu'il puisse
contrôler les spots quand la click track est lancée.

---

## Structure

```
- README.md         # Ce fichier
- <project_name>/
  - INSTRUCTIONS.md  # Instructions d'utilisation
  - show.qxw         # Fichier principal du projet QLC+
  - assets/          # Ressources (sons, images, vidéos)
  - fixtures/        # Fixtures personnalisées (si besoin)
    - spot-led.qxf
  - notes/           # Autre documentation interne
```


---

## Matériel utilisé

- **Contrôleur logiciel :** QLC+ 4.14.3
- **Contrôleur physique :** Raspberry Pi + interface USB → DMX (Enttec Open DMX / DMXKing / clone)
- **Interface utilisateur :** iPad Mini 2 (Virtual Console via web access)
- **Projecteurs :** 6 spots LED RGB (mode 7 canaux)

---

##  Patch DMX

**Remarque :** Chaque spot utilise 7 canaux DMX
(Dimmer + R + G + B + Strobe + Macro + Mode). La numérotation laisse de la place
pour des extensions futures.

**Frontaux (Fx)**

| Spot | Position        | Adresse de départ | Canaux utilisés |
| ---- | --------------- | ----------------- | --------------- |
| F1   | Avant gauche    | 1                 | 1–7             |
| F2   | Avant droit     | 9                 | 9–15            |
| F3   | (réservé futur) | 17                | 17–23           |
| F4   | (réservé futur) | 25                | 25–31           |

**Side gauche (SIDE_Lx)**

| Spot     | Position        | Adresse de départ | Canaux utilisés |
|----------| --------------- | ----------------- | --------------- |
| SIDE_L1  | Haut gauche     | 101               | 101–107         |
| SIDE_L2  | Bas gauche      | 109               | 109–115         |
| SIDE_L3  | (réservé futur) | 117               | 117–123         |

**Side droit (SIDE_Rx)**

| Spot     | Position        | Adresse de départ | Canaux utilisés |
|----------| --------------- | ----------------- | --------------- |
| SIDE_R1  | Haut droit      | 201               | 201–207         |
| SIDE_R2  | Bas droit       | 209               | 209–215         |
| SIDE_R3  | (réservé futur) | 217               | 217–223         |

**Backlights (BACK_xx)**

| Spot    | Position               | Adresse de départ | Canaux utilisés |
|---------|------------------------| ----------------- | --------------- |
| BACK_L1 | Derrière batterie, sol | 301               | 301–307         |
| BACK_L2 | (réservé futur)        | 301               | 301–307         |
| BACK_R1 | Derrière claviers, sol | 317               | 317–323         |
| BACK_R2 | (réservé futur)        | 325               | 325–331         |

---

## Instructions de travail

### Lancer le projet QLC+

1. Ouvrir QLC+ 4.14.3
2. Charger `project/show.qxw`
3. Vérifier que les fixtures apparaissent correctement

### Lancer sur Raspberry Pi

**TODO**

---

## Instructions sur scène

**TODO**
