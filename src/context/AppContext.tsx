import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, Film, FilmStatus, Page, Showtime } from '../types';
import { generateTakenSeats } from '../data/films';

// ── État initial ───────────────────────────────────────────────────────────────
const initialState: AppState = {
  page:             'home',
  filterStatus:     'now-showing',
  filterGenre:      'Tous',
  selectedFilm:     null,
  selectedShowtime: null,
  takenSeats:       {},
  selectedSeats:    [],
  paid:             false,
};

// ── Reducer ────────────────────────────────────────────────────────────────────
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {

    case 'GO_TO':
      return { ...state, page: action.payload };

    case 'SET_FILTER_STATUS':
      return {
        ...state,
        filterStatus: action.payload,
        filterGenre:  'Tous',   // réinitialise le filtre genre à chaque changement de statut
      };

    case 'SET_FILTER_GENRE':
      return { ...state, filterGenre: action.payload };

    case 'SELECT_FILM':
      return {
        ...state,
        selectedFilm:     action.payload,
        selectedShowtime: null,
        takenSeats:       generateTakenSeats(action.payload.id),
        selectedSeats:    [],
        paid:             false,
        page:             'booking',
      };

    case 'SELECT_SHOWTIME':
      return {
        ...state,
        selectedShowtime: action.payload,
        selectedSeats:    [],                            // réinitialise les sièges à chaque changement de séance
        takenSeats:       generateTakenSeats(state.selectedFilm?.id ?? '0'),
      };

    case 'TOGGLE_SEAT': {
      const seatId = action.payload;
      if (state.takenSeats[seatId]) return state;       // siège occupé → rien
      const alreadySelected = state.selectedSeats.includes(seatId);
      if (!alreadySelected && state.selectedSeats.length >= 6) return state; // max 6
      const selectedSeats = alreadySelected
        ? state.selectedSeats.filter(s => s !== seatId)
        : [...state.selectedSeats, seatId];
      return { ...state, selectedSeats };
    }

    case 'REMOVE_SEAT':
      return {
        ...state,
        selectedSeats: state.selectedSeats.filter(s => s !== action.payload),
      };

    case 'CONFIRM_PAYMENT':
      return { ...state, paid: true };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────────────────────────
interface AppContextValue {
  state: AppState;
  goTo:            (page: Page) => void;
  setFilterStatus: (status: FilmStatus) => void;
  setFilterGenre:  (genre: string) => void;
  selectFilm:      (film: Film) => void;
  selectShowtime:  (showtime: Showtime) => void;
  toggleSeat:      (seatId: string) => void;
  removeSeat:      (seatId: string) => void;
  confirmPayment:  () => void;
  reset:           () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const goTo            = (page: Page)          => dispatch({ type: 'GO_TO',            payload: page });
  const setFilterStatus = (status: FilmStatus)  => dispatch({ type: 'SET_FILTER_STATUS', payload: status });
  const setFilterGenre  = (genre: string)       => dispatch({ type: 'SET_FILTER_GENRE',  payload: genre });
  const selectFilm      = (film: Film)          => dispatch({ type: 'SELECT_FILM',       payload: film });
  const selectShowtime  = (st: Showtime)        => dispatch({ type: 'SELECT_SHOWTIME',   payload: st });
  const toggleSeat      = (seatId: string)      => dispatch({ type: 'TOGGLE_SEAT',       payload: seatId });
  const removeSeat      = (seatId: string)      => dispatch({ type: 'REMOVE_SEAT',       payload: seatId });
  const confirmPayment  = ()                    => dispatch({ type: 'CONFIRM_PAYMENT' });
  const reset           = ()                    => dispatch({ type: 'RESET' });

  return (
    <AppContext.Provider value={{
      state, goTo, setFilterStatus, setFilterGenre,
      selectFilm, selectShowtime, toggleSeat, removeSeat, confirmPayment, reset,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
