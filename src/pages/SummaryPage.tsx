import React from 'react';
import { useApp } from '../context/AppContext';
import { getSeatPrice, getSeatType } from '../data/films';

function fmtDuration(minutes: number): string {
  return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}`;
}

export default function SummaryPage() {
  const { state, goTo, removeSeat, confirmPayment, reset } = useApp();
  const { selectedFilm, selectedShowtime, selectedSeats, paid } = state;

  // ── Paiement confirmé ───────────────────────────────────────────────────────
  if (paid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-5 p-6">
        <div className="w-16 h-16 rounded-full bg-red-900 flex items-center justify-center text-3xl text-white">
          ✓
        </div>
        <h2 className="font-['Bebas_Neue'] text-3xl tracking-widest text-red-400">
          Réservation confirmée !
        </h2>
        <p className="text-[#888] text-sm text-center">
          Vos billets ont été envoyés par e-mail.<br />Bonne séance !
        </p>
        <button
          onClick={() => { reset(); goTo('home'); }}
          className="mt-2 px-6 py-2.5 border border-[#2E2E2E] text-[#888] hover:text-[#F0EAE0] hover:border-[#444] rounded-lg text-sm transition-colors"
        >
          ← Retour à l'accueil
        </button>
      </div>
    );
  }

  // ── Aucune sélection ────────────────────────────────────────────────────────
  if (!selectedFilm || selectedSeats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-3 p-6">
        <p className="text-[#888] text-sm">Aucune réservation en cours.</p>
        <button onClick={() => goTo('home')} className="text-red-400 hover:underline text-sm">
          ← Choisir un film
        </button>
      </div>
    );
  }

  const basePrice = selectedShowtime?.price ?? (selectedFilm.price ?? 12);
  const total     = selectedSeats.reduce((sum, id) => sum + getSeatPrice(id, basePrice), 0);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="bg-[#141414] border border-[#2E2E2E] rounded-2xl p-6 mb-5">

        <h2 className="font-['Bebas_Neue'] text-xl tracking-wide text-red-400 mb-4">
          Votre réservation
        </h2>

        {/* ── Infos film ────────────────────────────────────────────────────── */}
        {[
          { label: 'Film',       value: selectedFilm.title },
          { label: 'Genre',      value: selectedFilm.genre },
          { label: 'Durée',      value: fmtDuration(selectedFilm.duration) },
          { label: 'Réalisateur',value: selectedFilm.director },
          ...(selectedShowtime
            ? [
                { label: 'Séance', value: `${selectedShowtime.time} — ${selectedShowtime.date}` },
                { label: 'Salle',  value: selectedShowtime.room },
              ]
            : []),
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between py-2.5 border-b border-[#1E1E1E] text-sm">
            <span className="text-[#888]">{label}</span>
            <span className="font-medium text-[#F0EAE0] text-right max-w-[55%]">{value}</span>
          </div>
        ))}

        {/* ── Sièges avec contrôles +/- ─────────────────────────────────────── */}
        <p className="text-[10px] uppercase tracking-widest text-[#555] mt-4 mb-1 font-medium">
          Sièges ({selectedSeats.length}/6)
        </p>

        {selectedSeats.map(id => {
          const vip   = getSeatType(id) === 'vip';
          const price = getSeatPrice(id, basePrice);

          return (
            <div key={id} className="flex items-center justify-between py-2.5 border-b border-[#1E1E1E]">
              {/* Étiquette siège */}
              <span className="text-sm text-[#888] flex items-center gap-2">
                Siège {id}
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  vip
                    ? 'bg-yellow-900/40 text-yellow-400'
                    : 'bg-[#2A2A2A] text-[#666]'
                }`}>
                  {vip ? 'VIP' : 'Std'}
                </span>
              </span>

              {/* Contrôles − valeur + */}
              <div className="flex items-center gap-3">
                {/* − retire ce siège */}
                <button
                  onClick={() => removeSeat(id)}
                  className="w-7 h-7 rounded-md border border-[#2E2E2E] bg-[#1E1E1E] text-[#F0EAE0] text-lg leading-none flex items-center justify-center hover:bg-red-900/40 hover:border-red-800 transition-colors"
                  title={`Retirer le siège ${id}`}
                >
                  −
                </button>

                {/* Prix du siège */}
                <span className="text-sm font-medium text-[#F0EAE0] min-w-[56px] text-center">
                  {price} fcf
                </span>

                {/* + redirige vers le plan de salle pour choisir un siège de plus */}
                <button
                  onClick={() => goTo('booking')}
                  disabled={selectedSeats.length >= 6}
                  title="Ajouter un siège supplémentaire"
                  className="w-7 h-7 rounded-md border border-[#2E2E2E] bg-[#1E1E1E] text-[#F0EAE0] text-lg leading-none flex items-center justify-center hover:bg-green-900/40 hover:border-green-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}

        {/* Ligne "Ajouter un siège" si slots disponibles */}
        {selectedSeats.length < 6 && (
          <button
            onClick={() => goTo('booking')}
            className="w-full mt-3 py-2 border border-dashed border-[#2E2E2E] text-[#555] hover:text-[#888] hover:border-[#444] text-xs rounded-lg transition-colors"
          >
            + Ajouter un siège ({6 - selectedSeats.length} disponible{6 - selectedSeats.length > 1 ? 's' : ''})
          </button>
        )}

        {/* ── Total ─────────────────────────────────────────────────────────── */}
        <div className="flex justify-between items-center mt-5 px-4 py-3.5 bg-red-900 rounded-xl">
          <span className="text-red-200 text-sm">Total</span>
          <span className="font-['Bebas_Neue'] text-2xl tracking-wide text-white">
            {total.toFixed(2)} fcf
          </span>
        </div>
      </div>

      {/* ── Actions ─────────────────────────────────────────────────────────── */}
      <button
        onClick={confirmPayment}
        className="w-full py-4 bg-red-900 hover:bg-red-700 text-white font-['Bebas_Neue'] text-xl tracking-widest rounded-xl transition-colors"
      >
        VALIDER ET PAYER
      </button>
      <button
        onClick={() => goTo('booking')}
        className="w-full mt-3 py-3 border border-[#2E2E2E] text-[#888] hover:text-[#F0EAE0] hover:border-[#444] text-sm rounded-xl transition-colors"
      >
        ← Modifier mes places
      </button>
    </div>
  );
}
