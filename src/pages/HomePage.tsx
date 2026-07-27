import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { fetchFilms } from '../api';
import { Film, FilmStatus } from '../types';
import FilmCard from '../components/FilmCard';

const STATUS_OPTS: { key: FilmStatus; label: string }[] = [
  { key: 'now-showing',   label: "À l'affiche" },
  { key: 'coming-soon',   label: 'Bientôt'      },
  { key: 'in-production', label: 'En production' },
];

export default function HomePage() {
  const { state, setFilterStatus, setFilterGenre } = useApp();
  const { filterStatus, filterGenre } = state;

  const [films, setFilms]     = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  // Charger les films depuis l'API à chaque changement de filtre
  useEffect(() => {
    const loadFilms = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFilms(filterStatus, filterGenre);
        setFilms(data);
      } catch (err) {
        setError('Impossible de charger les films. Vérifiez que le backend tourne.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFilms();
  }, [filterStatus, filterGenre]);

  // Extraire les genres uniques depuis les films chargés
  const genres = ['Tous', ...Array.from(
    new Set(films.flatMap(f => f.genre.split(', ').map(g => g.trim())))
  ).sort()];

  return (
    <div className="p-6">

      {/* ── Filtre Statut ──────────────────────────────────────────────────── */}
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

      {/* ── Filtre Genre ───────────────────────────────────────────────────── */}
      {!loading && films.length > 0 && (
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
      )}

      {/* ── États de chargement ────────────────────────────────────────────── */}
      {loading && (
        <div className="flex items-center justify-center h-48">
          <div className="text-[#888] text-sm animate-pulse">Chargement des films...</div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-48">
          <div className="text-red-400 text-sm text-center">{error}</div>
        </div>
      )}

      {/* ── Grille de films ────────────────────────────────────────────────── */}
      {!loading && !error && films.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {films.map(film => (
            <FilmCard key={film._id || film.id} film={film} />
          ))}
        </div>
      )}

      {!loading && !error && films.length === 0 && (
        <p className="text-center text-[#555] mt-16 text-sm">
          Aucun film dans cette catégorie.
        </p>
      )}
    </div>
  );
}
