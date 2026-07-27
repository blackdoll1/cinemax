// ── Statut ────────────────────────────────────────────────────────────────────
export type FilmStatus = 'now-showing' | 'coming-soon' | 'in-production';

// ── Film ──────────────────────────────────────────────────────────────────────
export interface Film {
  _id?: string;       // ID MongoDB (depuis l'API)
  id?: string;        // ID statique (compatibilité)
  title: string;
  description: string;
  genre: string;
  duration: number;
  rating: number;
  posterUrl: string;
  releaseDate: string;
  director: string;
  cast: string[];
  status: FilmStatus;
  price?: number;
}

// ── Séance ────────────────────────────────────────────────────────────────────
export interface Showtime {
  _id?: string;       // ID MongoDB
  id?: string;
  filmId: string;
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
  type: SeatType;
  isAvailable: boolean;
  status?: SeatStatus;
}

// ── Navigation ────────────────────────────────────────────────────────────────
export type Page = 'home' | 'booking' | 'summary';

// ── État global ───────────────────────────────────────────────────────────────
export interface AppState {
  page:             Page;
  filterStatus:     FilmStatus;
  filterGenre:      string;
  selectedFilm:     Film | null;
  selectedShowtime: Showtime | null;
  takenSeats:       Record<string, boolean>;
  selectedSeats:    string[];
  paid:             boolean;
  reservationId:    string | null;  // ID de la réservation en DB
}

// ── Actions ───────────────────────────────────────────────────────────────────
export type AppAction =
  | { type: 'GO_TO';             payload: Page }
  | { type: 'SET_FILTER_STATUS'; payload: FilmStatus }
  | { type: 'SET_FILTER_GENRE';  payload: string }
  | { type: 'SELECT_FILM';       payload: Film }
  | { type: 'SELECT_SHOWTIME';   payload: Showtime }
  | { type: 'SET_TAKEN_SEATS';   payload: Record<string, boolean> }
  | { type: 'TOGGLE_SEAT';       payload: string }
  | { type: 'REMOVE_SEAT';       payload: string }
  | { type: 'CONFIRM_PAYMENT';   payload?: string }
  | { type: 'RESET' };
