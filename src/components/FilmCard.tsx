import React from 'react';
import { Film } from '../types';
import { useApp } from '../context/AppContext';

interface FilmCardProps {
  film: Film;
}

const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  'now-showing':  { label: "À l'affiche", cls: 'bg-green-900/70 text-green-300' },
  'coming-soon':  { label: 'Bientôt',     cls: 'bg-blue-900/70 text-blue-300'  },
  'in-production':{ label: 'En prod.',    cls: 'bg-amber-900/70 text-amber-300' },
};

function fmtDuration(minutes: number): string {
  return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}`;
}

export default function FilmCard({ film }: FilmCardProps) {
  const { selectFilm } = useApp();
  const isBookable = film.status === 'now-showing';
  const badge = STATUS_BADGE[film.status];

  // Genres : on affiche jusqu'à 2 pills
  const genres = film.genre.split(', ').slice(0, 2);

  return (
    <div className="bg-[#141414] rounded-xl overflow-hidden border border-[#2E2E2E] hover:border-red-800 hover:-translate-y-1 transition-all duration-200 flex flex-col">

      {/* ── Poster ─────────────────────────────────────────────────────────── */}
      <div className="relative h-56 overflow-hidden bg-[#1a1a1a]">
        <img
          src={film.posterUrl}
          alt={film.title}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Dégradé du bas pour lisibilité du titre */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

        {/* Badge statut */}
        <span className={`absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded font-medium ${badge.cls}`}>
          {badge.label}
        </span>

        {/* Pills genres */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {genres.map(g => (
            <span key={g} className="text-[9px] px-1.5 py-0.5 rounded bg-red-900/80 text-red-200 font-medium">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* ── Infos ──────────────────────────────────────────────────────────── */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="font-['Bebas_Neue'] text-lg tracking-wide leading-tight text-[#F0EAE0]">
          {film.title}
        </h3>

        <div className="flex justify-between text-xs text-[#888]">
          <span>{fmtDuration(film.duration)}</span>
          {film.rating > 0
            ? <span className="text-red-400 font-medium">★ {film.rating.toFixed(1)}</span>
            : <span className="text-[#555]">{film.releaseDate.slice(0, 7)}</span>
          }
        </div>

        <button
          onClick={() => isBookable && selectFilm(film)}
          disabled={!isBookable}
          className={`w-full mt-auto py-2 text-sm rounded-lg font-medium transition-colors ${
            isBookable
              ? 'bg-red-900 hover:bg-red-700 text-white cursor-pointer'
              : 'bg-[#1E1E1E] text-[#555] cursor-not-allowed border border-[#2E2E2E]'
          }`}
        >
          {isBookable ? 'Réserver' : 'Indisponible'}
        </button>
      </div>
    </div>
  );
}
