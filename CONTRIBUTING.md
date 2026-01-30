# Guide de contribution

Merci de votre intérêt pour contribuer à **Widget App Froid** ! Ce document décrit comment participer au projet.

**Dépôt** : [https://github.com/math-dev-24/APP-FROID-WIDGET](https://github.com/math-dev-24/APP-FROID-WIDGET)

## Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment contribuer](#comment-contribuer)
- [Configuration de l'environnement](#configuration-de-lenvironnement)
- [Workflow de contribution](#workflow-de-contribution)
- [Standards de code](#standards-de-code)
- [Signaler un bug](#signaler-un-bug)
- [Proposer une fonctionnalité](#proposer-une-fonctionnalité)

## Code de conduite

En participant à ce projet, vous vous engagez à maintenir un environnement respectueux et accueillant pour tous. Les contributions constructives, quelles qu'elles soient, sont les bienvenues.

## Comment contribuer

Vous pouvez contribuer de plusieurs façons :

- **Signaler des bugs** : Ouvrez une issue pour nous aider à améliorer l'application
- **Proposer des fonctionnalités** : Partagez vos idées d'amélioration
- **Corriger des bugs** : Consultez les issues et proposez des corrections
- **Améliorer la documentation** : Aidez à clarifier ou compléter la documentation
- **Soumettre des pull requests** : Proposez directement vos modifications

## Configuration de l'environnement

### Prérequis

- **Node.js** 18 ou supérieur
- **pnpm** (recommandé) ou npm

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/math-dev-24/APP-FROID-WIDGET.git
cd APP-FROID-WIDGET

# Installer les dépendances
pnpm install
# ou
npm install
```

### Lancer le projet en développement

```bash
pnpm run dev
# ou
npm run dev
```

L'application sera accessible sur `http://localhost:5173` (ou le port indiqué par Vite).

## Workflow de contribution

### 1. Fork et clone

1. Créez un fork du dépôt sur GitHub
2. Clonez votre fork en local
3. Ajoutez le dépôt original comme remote `upstream` :

```bash
git remote add upstream https://github.com/math-dev-24/APP-FROID-WIDGET.git
```

### 2. Créer une branche

Créez une branche pour votre contribution :

```bash
git checkout -b feature/ma-fonctionnalite
# ou
git checkout -b fix/correction-bug
```

Conventions de nommage des branches :

- `feature/` — Nouvelles fonctionnalités
- `fix/` — Corrections de bugs
- `docs/` — Modifications de la documentation
- `refactor/` — Refactorisation du code

### 3. Développer et tester

- Effectuez vos modifications
- Vérifiez que le code fonctionne : `pnpm run dev`
- Lancez le linter : `pnpm run lint`
- Assurez-vous que le build passe : `pnpm run build`

### 4. Commiter

Utilisez des messages de commit clairs et descriptifs :

```bash
git add .
git commit -m "feat: ajout du calcul de pression pour l'azote"
```

Préfixes recommandés :

- `feat:` — Nouvelle fonctionnalité
- `fix:` — Correction de bug
- `docs:` — Documentation
- `style:` — Formatage, espaces, etc.
- `refactor:` — Refactorisation
- `test:` — Tests

### 5. Pousser et ouvrir une Pull Request

```bash
git push origin feature/ma-fonctionnalite
```

Ouvrez une Pull Request sur GitHub en décrivant :

- Le problème ou la fonctionnalité
- Les modifications apportées
- Les éventuels points d'attention

## Standards de code

- **TypeScript** : Le projet utilise TypeScript. Évitez `any` autant que possible
- **ESLint** : Respectez les règles définies dans `.eslintrc.cjs`
- **Tailwind CSS** : Utilisez les classes Tailwind pour le style
- **Composants** : Suivez la structure existante dans `src/components` et `src/features`
- **Nommage** : Utilisez le camelCase pour les variables/fonctions, PascalCase pour les composants

### Structure des dossiers

```
src/
├── components/     # Composants réutilisables
├── features/       # Fonctionnalités par domaine (azote, desp, etc.)
├── hooks/          # Hooks React personnalisés
├── lib/            # Utilitaires et helpers
├── pages/          # Pages (wrapper vers les features)
├── styles/         # Styles globaux
└── types/          # Types TypeScript
```

## Signaler un bug

Ouvrez une issue avec les informations suivantes :

- **Description** : Décrivez le bug de manière claire
- **Étapes pour reproduire** : Comment reproduire le problème
- **Comportement attendu** : Ce qui devrait se passer
- **Comportement actuel** : Ce qui se passe réellement
- **Environnement** : Navigateur, OS, version de l'app si pertinent

## Proposer une fonctionnalité

Avant de proposer une nouvelle fonctionnalité :

1. Vérifiez qu'une issue similaire n'existe pas déjà
2. Décrivez le cas d'usage et la valeur ajoutée
3. Expliquez comment elle s'intègre aux outils existants (Azote, DESP, Calcul diamètre, etc.)

---

Merci pour votre contribution !
