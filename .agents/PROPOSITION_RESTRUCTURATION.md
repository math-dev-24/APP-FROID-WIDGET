# Proposition de restructuration — widget-app-froid

> Document rédigé en tant que lead dev, aligné sur les bonnes pratiques React/Vite et les skills `.agents/` (vercel-composition-patterns, web-design-guidelines).

---

## 1. État actuel

### Structure actuelle

```
src/
├── App.tsx
├── main.tsx
├── components/          # Composants UI génériques + shadcn
│   ├── ui/              # Primitives shadcn
│   ├── InputCustom.tsx
│   ├── SelectCustom.tsx
│   ├── StatusBadge.tsx
│   └── ...
├── data/                # Données statiques
│   ├── fluid.tsx
│   └── pipes.ts
├── functions/           # Logique métier (calculs)
│   ├── azoteCalc.tsx
│   ├── despCalc.tsx
│   └── sectionCalc.ts
├── hooks/
│   └── formState.tsx
├── lib/
│   ├── format.ts
│   └── utils.ts
├── pages/
├── styles/
└── types/
```

### Points positifs

- Séparation pages / composants / hooks
- Alias `@/` configuré
- ErrorBoundary + skip-link accessibilité
- ThemeProvider (dark/light)
- Composants shadcn cohérents

---

## 2. Problèmes identifiés

### 2.1 Conventions de nommage

| Problème | Exemple | Recommandation |
|----------|---------|----------------|
| snake_case en JS/TS | `get_desp`, `calc_section` | camelCase : `getDesp`, `calcSection` |
| Mélange .ts / .tsx | `despCalc.tsx` sans JSX | `.ts` pour logique pure |
| Nom package obsolète | `chrome-extension-react-template` | `widget-app-froid` |

### 2.2 Types vs données mélangés

- `despType.tsx` contient **enums** + **données** (`dataType`, `dataNature`, `dataDanger`)
- `selectType.tsx` : interface + export default
- Types dans `.tsx` alors qu’ils n’ont pas de JSX

### 2.3 Organisation des calculs

- `functions/` regroupe tout : azote, desp, section
- Pas de regroupement par domaine métier
- `azoteCalc.tsx` exporte une fonction par défaut, les autres des named exports → incohérence

### 2.4 Duplication et responsabilités

- `getCategoryBadgeVariant` dans `Desp.tsx` alors qu’un `StatusBadge` existe
- Logique de mapping DESP → badge dupliquée
- `calculateResult` dans `CalculDiam.tsx` pourrait être extraite

### 2.5 Dossiers agents

- `.agent/` vide vs `.agents/` utilisé → confusion
- Plusieurs dossiers AI (`.agent`, `.agents`, `.cursor`, `.codex`, etc.) sans convention claire

---

## 3. Structure proposée

### 3.1 Vue d’ensemble

```
src/
├── main.tsx
├── App.tsx
│
├── features/                    # Par domaine métier (feature-based)
│   ├── desp/
│   │   ├── DespPage.tsx
│   │   ├── desp.utils.ts        # getDesp
│   │   ├── desp.types.ts
│   │   └── desp.constants.ts    # dataType, dataNature, dataDanger
│   │
│   ├── azote/
│   │   ├── AzotePage.tsx
│   │   └── azote.utils.ts       # getPFinal
│   │
│   ├── calcul-diam/
│   │   ├── CalculDiamPage.tsx
│   │   ├── calculDiam.utils.ts  # calculateResult, calcSection
│   │   └── calculDiam.types.ts
│   │
│   ├── capteur-signal/
│   │   └── CapteurSignalPage.tsx
│   │
│   ├── air-data/
│   │   └── AirDataPage.tsx
│   │
│   └── shared/                  # Données partagées entre features
│       ├── fluids.data.ts       # DATA_FLUIDS (ex fluid.tsx)
│       └── pipes.data.ts
│
├── components/                  # Composants réutilisables
│   ├── ui/                      # shadcn (inchangé)
│   ├── form/
│   │   ├── InputCustom.tsx
│   │   └── SelectCustom.tsx
│   ├── layout/
│   │   └── Header.tsx
│   ├── feedback/
│   │   ├── StatusBadge.tsx
│   │   ├── StatusMessage.tsx
│   │   └── DespBadge.tsx        # Variant spécifique DESP (Cat I, Art 4§3...)
│   └── providers/
│       ├── theme-provider.tsx
│       └── ErrorBoundary.tsx
│
├── hooks/
│   └── useFormState.ts          # Renommage plus explicite
│
├── lib/
│   ├── format.ts
│   └── utils.ts
│
├── types/                       # Types globaux uniquement
│   ├── select.ts
│   └── fluid.ts
│
├── routes/                      # Configuration routing (optionnel)
│   └── index.tsx
│
└── styles/
    └── globals.css
```

### 3.2 Décisions d’architecture

| Décision | Justification |
|----------|---------------|
| **Feature-based** | Évolution plus simple, features isolées, meilleure scalabilité |
| **utils par feature** | Logique métier proche de la feature qui l’utilise |
| **Composants par rôle** | `form/`, `layout/`, `feedback/`, `providers/` pour retrouver rapidement |
| **DespBadge dédié** | Évite les props booléennes, conforme à vercel-composition-patterns |
| **Types globaux** | Seulement `SelectData`, `Fluid`, etc. partagés entre plusieurs features |

---

## 4. Actions concrètes (priorisées)

### Priorité 1 — Quick wins

1. **Renommer les fonctions** : `get_desp` → `getDesp`, `calc_section` → `calcSection`, `get_p_final` → `getPFinal`
2. **Harmoniser les extensions** : `.ts` pour les fichiers sans JSX
3. **Mettre à jour `package.json`** : `name: "widget-app-froid"`
4. **Nettoyer `.agent/`** : supprimer si vide, ou documenter son rôle

### Priorité 2 — Types et données

5. **Séparer types et données dans desp** :
   - `desp.types.ts` : enums `ListNature`, `ListType`
   - `desp.constants.ts` : `dataType`, `dataNature`, `dataDanger`
6. **Renommer `selectType.tsx`** → `select.ts` (interface uniquement)
7. **Déplacer `fluid.tsx`** → `features/shared/fluids.data.ts`

### Priorité 3 — Feature-based (optionnel, migration progressive)

8. Créer `features/desp/` et y déplacer page + utils + types
9. Répéter pour azote, calcul-diam, etc.
10. Extraire `DespBadge` pour centraliser la logique DESP → badge

### Priorité 4 — Conventions agents

11. **Unifier les dossiers agents** : garder `.agents/` comme référence, documenter dans `README.md` ou `CONTRIBUTING.md`
12. **Supprimer ou fusionner** `.agent/` si redondant

---

## 5. Conventions à adopter

### Nommage

- **Fichiers** : kebab-case (`desp.utils.ts`, `calcul-diam.utils.ts`)
- **Fonctions** : camelCase (`getDesp`, `calcSection`)
- **Types/Interfaces** : PascalCase (`DespResult`, `FluidData`)
- **Constantes** : UPPER_SNAKE_CASE ou camelCase selon usage

### Imports

```ts
// Préférer les chemins absolus
import { getDesp } from "@/features/desp/desp.utils"
import { calcSection } from "@/features/calcul-diam/calculDiam.utils"
```

### Exports

- **Named exports** pour les utilitaires
- **Default export** pour les pages/composants React

---

## 6. Références

- **vercel-composition-patterns** : éviter les boolean props, privilégier composition
- **web-design-guidelines** : accessibilité, skip-link déjà en place
- **React 18** : pas de migration React 19 nécessaire pour l’instant

---

## 7. Plan de migration suggéré

1. **Phase 1** (1–2 h) : Priorité 1 (renommages, package.json, nettoyage)
2. **Phase 2** (2–3 h) : Priorité 2 (types, constantes, données)
3. **Phase 3** (optionnel, 1–2 j) : Priorité 3 (feature-based) en migrant une feature à la fois
4. **Phase 4** (30 min) : Priorité 4 (conventions agents)

---

*Document généré le 30/01/2025 — à adapter selon contraintes projet.*
