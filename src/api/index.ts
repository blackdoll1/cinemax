// URL de base de l'API — en local puis sur Render en production
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ── Helper pour gérer les erreurs fetch ───────────────────────────────────────
async function apiFetch(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur serveur');
  }

  return data;
}

// ── FILMS ─────────────────────────────────────────────────────────────────────

// Récupérer tous les films (avec filtres optionnels)
export async function fetchFilms(status?: string, genre?: string) {
  const params = new URLSearchParams();
  if (status) params.set('status', status);
  if (genre && genre !== 'Tous') params.set('genre', genre);

  const query = params.toString() ? `?${params.toString()}` : '';
  const data = await apiFetch(`/api/films${query}`);
  return data.data; // retourne le tableau de films
}

// Récupérer un seul film par son ID
export async function fetchFilmById(id: string) {
  const data = await apiFetch(`/api/films/${id}`);
  return data.data;
}

// ── SÉANCES ───────────────────────────────────────────────────────────────────

// Récupérer les séances d'un film
export async function fetchShowtimes(filmId: string) {
  const data = await apiFetch(`/api/showtimes/film/${filmId}`);
  return data.data; // retourne le tableau de séances
}

// ── SIÈGES ────────────────────────────────────────────────────────────────────

// Récupérer les sièges occupés d'une séance
export async function fetchTakenSeats(showtimeId: string): Promise<Record<string, boolean>> {
  const data = await apiFetch(`/api/seats/${showtimeId}`);
  return data.data; // retourne { "A1": true, "H3": true, ... }
}

// ── RÉSERVATIONS ──────────────────────────────────────────────────────────────

// Créer une réservation
export async function createReservation(payload: {
  filmId: string;
  showtimeId: string;
  seats: { seatId: string; type: string; price: number }[];
  totalPrice: number;
}) {
  const data = await apiFetch('/api/reservations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.data; // retourne la réservation créée
}

// Récupérer une réservation par son ID
export async function fetchReservationById(id: string) {
  const data = await apiFetch(`/api/reservations/${id}`);
  return data.data;
}
