# Widget App Froid

Application web regroupant des outils pratiques pour les professionnels du froid : calculs, références et aides au quotidien.

## Description

**Widget App Froid** est une application légère et rapide qui centralise plusieurs outils utiles pour le secteur du froid. Accessible depuis n'importe quel navigateur, elle permet d'accéder instantanément à des règles, calculs et références sans installation.

## Fonctionnalités

| Outil | Description |
|-------|-------------|
| **Test Azote** | Calculs et tests liés à l'azote |
| **DESP** | Outils de désembauchage (gaz et liquide) |
| **Signal Capteur** | Calculs de signal pour capteurs |
| **Calcul Diamètre** | Calcul du diamètre des tuyauteries |
| **Propriétés Air** | Données et propriétés de l'air |

## Prérequis

- **Node.js** 18 ou supérieur
- **pnpm** ou **npm**

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/math-dev-24/APP-FROID-WIDGET.git
cd APP-FROID-WIDGET

# Installer les dépendances
pnpm install
```

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `pnpm run dev` | Lance le serveur de développement |
| `pnpm run build` | Compile l'application pour la production |
| `pnpm run preview` | Prévisualise le build de production |
| `pnpm run lint` | Vérifie le code avec ESLint |

## Technologies

- **React 18** — Interface utilisateur
- **TypeScript** — Typage statique
- **Vite** — Build et développement
- **Tailwind CSS** — Styles
- **Radix UI** — Composants accessibles
- **React Router** — Navigation
- **Lucide React** — Icônes

## Structure du projet

```
src/
├── components/       # Composants réutilisables (Header, Badge, etc.)
├── features/         # Fonctionnalités par domaine
│   ├── air-data/     # Propriétés de l'air
│   ├── azote/        # Test azote
│   ├── calcul-diam/  # Calcul de diamètre
│   ├── capteur-signal/ # Signal capteur
│   ├── desp/         # Désembauchage
│   └── home/         # Page d'accueil
├── hooks/            # Hooks React
├── lib/              # Utilitaires
├── pages/            # Pages
├── styles/           # Styles globaux
└── types/            # Types TypeScript
```

## Contribution

Les contributions sont les bienvenues ! Consultez le [Guide de contribution](CONTRIBUTING.md) pour savoir comment participer au projet.

**Dépôt** : [https://github.com/math-dev-24/APP-FROID-WIDGET](https://github.com/math-dev-24/APP-FROID-WIDGET)

## Licence

Projet privé — Tous droits réservés.

---

Développé avec ❤️ pour les professionnels du froid.
