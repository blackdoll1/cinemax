// ── Statut ────────────────────────────────────────────────────────────────────
export type FilmStatus = 'now-showing' | 'coming-soon' | 'in-production';

// ── Film ──────────────────────────────────────────────────────────────────────
export interface Film {
  id: string;
  title: string;
  description: string;
  genre: string;        // ex: "Action, Science-Fiction"
  duration: number;     // en minutes
  rating: number;       // 0 si non noté (in-production)
  posterUrl: string;
  releaseDate: string;  // "YYYY-MM-DD"
  director: string;
  cast: string[];
  status: FilmStatus;
  // champs optionnels conservés pour compatibilité
  year?: number;
  price?: number;
  color?: string;
  accent?: string;
}

// ── Séance ────────────────────────────────────────────────────────────────────
export interface Showtime {
  id: string;
  movieId: string;
  date: string;
  time: string;
  room: string;
  price: number;
  availableSeats: number;
}

// ── Siège ─────────────────────────────────────────────────────────────────────
export type SeatType   = 'standard' | 'vip';
export type SeatStatus = 'available' | 'taken' | 'selected';

export interface Seat {
  id: string;
  row: string;
  number: number;
  col?: number;
  type: SeatType;
  isAvailable: boolean;
  status?: SeatStatus;
}

// ── Navigation ────────────────────────────────────────────────────────────────
export type Page = 'home' | 'booking' | 'summary';

// ── État global ───────────────────────────────────────────────────────────────
export interface AppState {
  page: Page;
  filterStatus: FilmStatus;   // filtre par statut (À l'affiche / Bientôt / En prod.)
  filterGenre: string;        // filtre par genre ("Tous" = pas de filtre)
  selectedFilm: Film | null;
  selectedShowtime: Showtime | null;
  takenSeats: Record<string, boolean>;
  selectedSeats: string[];    // liste d'IDs de sièges sélectionnés (max 6)
  paid: boolean;
}

// ── Actions ───────────────────────────────────────────────────────────────────
export type AppAction =
  | { type: 'GO_TO';            payload: Page }
  | { type: 'SET_FILTER_STATUS'; payload: FilmStatus }
  | { type: 'SET_FILTER_GENRE';  payload: string }
  | { type: 'SELECT_FILM';      payload: Film }
  | { type: 'SELECT_SHOWTIME';  payload: Showtime }
  | { type: 'TOGGLE_SEAT';      payload: string }
  | { type: 'REMOVE_SEAT';      payload: string }
  | { type: 'CONFIRM_PAYMENT' }
  | { type: 'RESET' };
