import React from 'react';
import { useApp } from '../context/AppContext';
import { FILMS, getAllGenres } from '../data/films';
import { FilmStatus } from '../types';
import FilmCard from '../components/FilmCard';

const STATUS_OPTS: { key: FilmStatus; label: string }[] = [
  { key: 'now-showing',   label: "À l'affiche" },
  { key: 'coming-soon',   label: 'Bientôt'      },
  { key: 'in-production', label: 'En production' },
];

export default function HomePage() {
  const { state, setFilterStatus, setFilterGenre } = useApp();
  const { filterStatus, filterGenre } = state;

  // Genres disponibles pour le statut actif uniquement
  const genres = getAllGenres(filterStatus);

  // Films filtrés : d'abord par statut, ensuite par genre si ≠ "Tous"
  const filtered = FILMS
    .filter(f => f.status === filterStatus)
    .filter(f =>
      filterGenre === 'Tous'
        ? true
        : f.genre.split(', ').map(g => g.trim()).includes(filterGenre)
    );

  return (
    <div className="p-6">

      {/* ── Filtre Statut ───────────────────────────────────────────────────── */}
      <div className="mb-4">
        <p className="text-[10px] uppercase tracking-widest text-[#555] mb-2 font-medium">Statut</p>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-4 py-1.5 rounded-full border text-sm transition-all font-medium ${
                filterStatus === key
                  ? key === 'now-showing'
                    ? 'border-green-700 text-green-400 bg-green-900/20'
                    : key === 'coming-soon'
                    ? 'border-blue-700 text-blue-400 bg-blue-900/20'
                    : 'border-amber-700 text-amber-400 bg-amber-900/20'
                  : 'border-[#2E2E2E] text-[#888] hover:border-[#444] hover:text-[#ccc]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Filtre Genre ────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-widest text-[#555] mb-2 font-medium">Genre</p>
        <div className="flex flex-wrap gap-2">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setFilterGenre(genre)}
              className={`px-3 py-1 rounded-full border text-xs transition-all ${
                filterGenre === genre
                  ? 'border-red-700 text-red-400 bg-red-900/20'
                  : 'border-[#2E2E2E] text-[#888] hover:border-[#444] hover:text-[#ccc]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grille ─────────────────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map(film => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      ) : (
        <p className="text-center text-[#555] mt-16 text-sm">
          Aucun film dans cette catégorie.
        </p>
      )}
    </div>
  );
}
