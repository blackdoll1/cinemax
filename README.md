# CINÉMAX — Application de billetterie

Application web de billetterie de cinéma construite avec **React 18**, **TypeScript** et **Tailwind CSS**.

## Lancer le projet

```bash
npm install
npm run dev
```

L'application tourne sur http://localhost:5173

## Structure du projet

```
src/
├── types/
│   └── index.ts          # Types TypeScript (Film, Seat, AppState, AppAction…)
├── data/
│   └── films.ts          # Données films + helpers (prix, type de siège, sièges occupés)
├── context/
│   └── AppContext.tsx     # useReducer + Context — dashboard global de l'état
├── components/
│   ├── Navbar.tsx         # Navigation entre les 3 pages
│   ├── FilmCard.tsx       # Carte d'un film (poster, note, bouton réserver)
│   └── SeatMap.tsx        # Plan de salle interactif (sièges Standard / VIP)
├── pages/
│   ├── HomePage.tsx       # Accueil — grille de films + filtres par genre
│   ├── BookingPage.tsx    # Réservation — SeatMap + récapitulatif de sélection
│   └── SummaryPage.tsx    # Récapitulatif — détail des sièges, total, validation
├── App.tsx                # Dashboard — router interne + AppProvider
├── main.tsx               # Point d'entrée React
└── index.css              # Import Tailwind + Google Fonts
```

## Architecture de l'état

Toute la logique est centralisée dans `AppContext.tsx` avec `useReducer`.

### Actions disponibles

| Action            | Effet                                              |
|-------------------|----------------------------------------------------|
| `GO_TO`           | Naviguer vers une page (`home`, `booking`, `summary`) |
| `SET_FILTER`      | Filtrer les films par genre                        |
| `SELECT_FILM`     | Sélectionner un film + générer les sièges occupés |
| `TOGGLE_SEAT`     | Sélectionner / désélectionner un siège (max 6)    |
| `CONFIRM_PAYMENT` | Valider la réservation                             |

### Exemple d'utilisation du hook

```tsx
import { useApp } from '../context/AppContext';

function MonComposant() {
  const { state, goTo, toggleSeat } = useApp();
  return <div>{state.selectedFilm?.title}</div>;
}
```

## Personnalisation

### Ajouter un film

Dans `src/data/films.ts`, ajouter un objet dans le tableau `FILMS` :

```ts
{ id: 7, title: 'Mon Film', genre: 'Action', duration: '2h00', rating: 4.2, year: 2026, price: 11, color: '#1a0d0d', accent: '#e74c3c' }
```

### Modifier les prix

- Prix de base : champ `price` dans chaque film
- Supplément VIP : constante `VIP_ROWS` dans `films.ts` (rangées A et B par défaut)

## Build production

```bash
npm run build
```

Les fichiers sont générés dans `dist/`.
"# cinemax_frondend" 
