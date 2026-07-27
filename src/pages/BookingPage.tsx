import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import SeatMap from '../components/SeatMap';
import { fetchShowtimes } from '../api';
import { getSeatPrice, getSeatType } from '../data/films';
import { Showtime } from '../types';

const LEGEND = [
  { label: 'Disponible',      cls: 'bg-[#1E1E1E] border-[#2E2E2E]' },
  { label: 'Sélectionné',     cls: 'bg-red-800 border-red-500' },
  { label: 'Occupé',          cls: 'bg-[#1a1a1a] border-[#222] opacity-35' },
  { label: 'VIP disponible',  cls: 'bg-[#1a1200] border-[#5a4200]' },
  { label: 'VIP sélectionné', cls: 'bg-yellow-800 border-yellow-500' },
];

function fmtDuration(minutes: number): string {
  return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}`;
}

function getId(obj: any): string {
  return obj?._id || obj?.id || '';
}

export default function BookingPage() {
  const { state, goTo, selectShowtime, removeSeat } = useApp();
  const { selectedFilm, selectedShowtime, selectedSeats } = state;

  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFilm) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchShowtimes(getId(selectedFilm));
        setShowtimes(data);
      } catch (err) {
        setError('Impossible de charger les séances.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [selectedFilm]);

  if (!selectedFilm) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-[#888]">Aucun film sélectionné.</p>
        <button onClick={() => goTo('home')} className="text-red-400 hover:underline text-sm">
          ← Choisir un film
        </button>
      </div>
    );
  }

  const basePrice          = selectedShowtime?.price ?? 0;
  const total              = selectedSeats.reduce((sum, id) => sum + getSeatPrice(id, basePrice), 0);
  const selectedShowtimeId = getId(selectedShowtime);

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* En-tête */}
      <div className="flex items-center gap-4 mb-2">
        <button
          onClick={() => goTo('home')}
          className="px-3 py-1.5 bg-[#1E1E1E] border border-[#2E2E2E] text-[#888] rounded-lg text-sm hover:text-[#F0EAE0] transition-colors"
        >
          ← Retour
        </button>
        <h1 className="font-['Bebas_Neue'] text-3xl tracking-wide text-[#F0EAE0]">
          {selectedFilm.title}
        </h1>
        <span className="ml-auto text-xs text-[#888]">
          {selectedFilm.genre} · {fmtDuration(selectedFilm.duration)}
        </span>
      </div>
      <p className="text-xs text-[#555] mb-5">Réal. {selectedFilm.director}</p>

      {/* Séances */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-widest text-[#555] mb-2 font-medium">
          Choisir une séance
        </p>

        {loading && <p className="text-[#888] text-sm animate-pulse">Chargement des séances...</p>}
        {error   && <p className="text-red-400 text-sm">{error}</p>}
        {!loading && !error && showtimes.length === 0 && (
          <p className="text-[#555] text-sm">Aucune séance disponible.</p>
        )}

        {!loading && !error && showtimes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {showtimes.map(st => {
              const stId    = getId(st);
              const isActive = stId === selectedShowtimeId;
              return (
                <button
                  key={stId}
                  onClick={() => selectShowtime(st)}
                  className={`flex flex-col items-center px-4 py-2 rounded-lg border text-sm transition-all ${
                    isActive
                      ? 'bg-red-900 border-red-700 text-white'
                      : 'bg-[#1E1E1E] border-[#2E2E2E] text-[#F0EAE0] hover:border-red-800'
                  }`}
                >
                  <span className="font-medium">{st.time}</span>
                  <span className={`text-[10px] mt-0.5 ${isActive ? 'text-red-200' : 'text-[#888]'}`}>
                    {st.room} · {st.price.toFixed(2)} fcf · {st.availableSeats} places
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Plan de salle */}
      {selectedShowtime ? (
        <>
          <div className="text-center mb-5">
            <div className="h-1.5 mx-16 rounded bg-gradient-to-r from-transparent via-red-700 to-transparent mb-1.5" />
            <span className="text-[10px] tracking-[4px] text-[#555]">ÉCRAN</span>
          </div>

          <div className="mb-5 overflow-x-auto">
            <SeatMap />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-5">
            {LEGEND.map(({ label, cls }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-[#888]">
                <div className={`w-5 h-4 rounded-t rounded-b-sm border ${cls}`} />
                {label}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-[#141414] border border-[#2E2E2E] rounded-xl px-5 py-4">
            {selectedSeats.length === 0 ? (
              <div className="flex items-center justify-between">
                <p className="text-[#555] text-sm">Aucune place sélectionnée (max 6)</p>
                <button disabled className="px-6 py-2.5 bg-[#1E1E1E] text-[#555] text-sm rounded-lg cursor-not-allowed">
                  Confirmer →
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map(id => {
                    const vip   = getSeatType(id) === 'vip';
                    const price = getSeatPrice(id, basePrice);
                    return (
                      <span
                        key={id}
                        className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${
                          vip
                            ? 'border-yellow-800 bg-yellow-900/20 text-yellow-300'
                            : 'border-[#2E2E2E] bg-[#1E1E1E] text-[#ccc]'
                        }`}
                      >
                        {id}{vip && ' ★'} — {price.toFixed(2)} fcf
                        <button
                          onClick={() => removeSeat(id)}
                          className="ml-1 text-[#555] hover:text-red-400 transition-colors"
                          title={`Retirer ${id}`}
                        >×</button>
                      </span>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-red-400 font-medium">{selectedSeats.length}</span>
                    {' '}place{selectedSeats.length > 1 ? 's' : ''} —{' '}
                    <span className="text-red-400 font-medium">{total.toFixed(2)} fcf</span>
                  </div>
                  <button
                    onClick={() => goTo('summary')}
                    className="px-6 py-2.5 bg-red-900 hover:bg-red-700 text-white text-sm rounded-lg font-medium transition-colors"
                  >
                    Confirmer →
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-[#555] text-sm border border-dashed border-[#2E2E2E] rounded-xl">
          Sélectionnez d'abord une séance pour afficher le plan de salle.
        </div>
      )}
    </div>
  );
}