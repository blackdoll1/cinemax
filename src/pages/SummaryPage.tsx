import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getSeatPrice, getSeatType } from '../data/films';
import { createReservation } from '../api';

function fmtDuration(minutes: number): string {
  return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}`;
}

function getId(obj: any): string {
  return obj?._id || obj?.id || '';
}

// Génère un numéro de billet aléatoire
function generateTicketNumber(): string {
  return 'CMX-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function SummaryPage() {
  const { state, goTo, removeSeat, confirmPayment, reset } = useApp();
  const { selectedFilm, selectedShowtime, selectedSeats, paid, reservationId } = state;

  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [ticketNumber]              = useState(generateTicketNumber);

  const basePrice = selectedShowtime?.price ?? 0;
  const total     = selectedSeats.reduce((sum, id) => sum + getSeatPrice(id, basePrice), 0);

  // ── Ticket affiché après paiement ─────────────────────────────────────────
  if (paid && selectedFilm && selectedShowtime) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          {/* En-tête succès */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-900/40 border border-green-700 flex items-center justify-center text-3xl mx-auto mb-3">
              ✓
            </div>
            <h2 className="font-['Bebas_Neue'] text-3xl tracking-widest text-green-400">
              Paiement confirmé !
            </h2>
            <p className="text-[#888] text-sm mt-1">Votre billet est prêt</p>
          </div>

          {/* Ticket */}
          <div className="bg-[#141414] border border-[#2E2E2E] rounded-2xl overflow-hidden">

            {/* Bandeau haut du ticket */}
            <div className="bg-red-900 px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-['Bebas_Neue'] text-2xl tracking-widest text-white">CINÉMAX</p>
                <p className="text-red-200 text-xs">Billet de cinéma</p>
              </div>
              <div className="text-right">
                <p className="text-red-200 text-xs">N° billet</p>
                <p className="font-mono text-white font-bold text-sm">{ticketNumber}</p>
              </div>
            </div>

            {/* Titre du film */}
            <div className="px-6 py-4 border-b border-[#2E2E2E]">
              <p className="text-[#888] text-xs uppercase tracking-widest mb-1">Film</p>
              <p className="font-['Bebas_Neue'] text-2xl tracking-wide text-[#F0EAE0]">
                {selectedFilm.title}
              </p>
              <p className="text-[#888] text-xs mt-1">
                {selectedFilm.genre} · {fmtDuration(selectedFilm.duration)} · Réal. {selectedFilm.director}
              </p>
            </div>

            {/* Infos séance */}
            <div className="px-6 py-4 grid grid-cols-2 gap-4 border-b border-[#2E2E2E]">
              <div>
                <p className="text-[#888] text-xs uppercase tracking-widest mb-1">Date</p>
                <p className="text-[#F0EAE0] font-medium text-sm">{selectedShowtime.date}</p>
              </div>
              <div>
                <p className="text-[#888] text-xs uppercase tracking-widest mb-1">Heure</p>
                <p className="text-[#F0EAE0] font-medium text-sm">{selectedShowtime.time}</p>
              </div>
              <div>
                <p className="text-[#888] text-xs uppercase tracking-widest mb-1">Salle</p>
                <p className="text-[#F0EAE0] font-medium text-sm">{selectedShowtime.room}</p>
              </div>
              <div>
                <p className="text-[#888] text-xs uppercase tracking-widest mb-1">Places</p>
                <p className="text-[#F0EAE0] font-medium text-sm">{selectedSeats.length} siège{selectedSeats.length > 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* Séparateur pointillé style ticket */}
            <div className="relative px-6 py-2">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0A0A0A]" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0A0A0A]" />
              <div className="border-t border-dashed border-[#2E2E2E]" />
            </div>

            {/* Liste des sièges */}
            <div className="px-6 py-4 border-b border-[#2E2E2E]">
              <p className="text-[#888] text-xs uppercase tracking-widest mb-3">Sièges réservés</p>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map(id => {
                  const vip   = getSeatType(id) === 'vip';
                  const price = getSeatPrice(id, basePrice);
                  return (
                    <div
                      key={id}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${
                        vip
                          ? 'border-yellow-700 bg-yellow-900/20 text-yellow-300'
                          : 'border-[#2E2E2E] bg-[#1E1E1E] text-[#ccc]'
                      }`}
                    >
                      <span className="font-mono font-bold">{id}</span>
                      <span className={`text-xs px-1 py-0.5 rounded ${
                        vip ? 'bg-yellow-900/40 text-yellow-400' : 'bg-[#2A2A2A] text-[#666]'
                      }`}>
                        {vip ? 'VIP' : 'Std'}
                      </span>
                      <span className="text-xs text-[#888]">{price.toFixed(2)} fcf</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total */}
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[#888] text-xs uppercase tracking-widest">Total payé</p>
                {reservationId && (
                  <p className="text-[#555] text-xs font-mono mt-0.5">ID : {reservationId}</p>
                )}
              </div>
              <p className="font-['Bebas_Neue'] text-3xl tracking-wide text-red-400">
                {total.toFixed(2)} fcf
              </p>
            </div>

            {/* Bas du ticket — code barre simulé */}
            <div className="bg-[#0D0D0D] px-6 py-4 flex flex-col items-center gap-2">
              {/* Barres */}
              <div className="flex gap-px">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#F0EAE0]"
                    style={{
                      width:  i % 3 === 0 ? '3px' : '1.5px',
                      height: i % 5 === 0 ? '32px' : '24px',
                    }}
                  />
                ))}
              </div>
              <p className="font-mono text-[#555] text-xs tracking-widest">{ticketNumber}</p>
              <p className="text-[#555] text-xs text-center">
                Présentez ce billet à l'entrée de la salle
              </p>
            </div>
          </div>

          {/* Bouton retour */}
          <button
            onClick={() => { reset(); goTo('home'); }}
            className="w-full mt-4 py-3 border border-[#2E2E2E] text-[#888] hover:text-[#F0EAE0] hover:border-[#444] rounded-xl text-sm transition-colors"
          >
            ← Retour à l'accueil
          </button>

        </div>
      </div>
    );
  }

  // ── Aucune sélection ──────────────────────────────────────────────────────
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

  // ── Valider et envoyer à l'API ─────────────────────────────────────────────
  const handlePayment = async () => {
    if (!selectedShowtime) return;
    setLoading(true);
    setError(null);
    try {
      const reservation = await createReservation({
        filmId:     getId(selectedFilm),
        showtimeId: getId(selectedShowtime),
        seats: selectedSeats.map(seatId => ({
          seatId,
          type:  getSeatType(seatId),
          price: getSeatPrice(seatId, basePrice),
        })),
        totalPrice: total,
      });
      confirmPayment();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la réservation. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  // ── Récapitulatif avant paiement ──────────────────────────────────────────
  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="bg-[#141414] border border-[#2E2E2E] rounded-2xl p-6 mb-5">

        <h2 className="font-['Bebas_Neue'] text-xl tracking-wide text-red-400 mb-4">
          Votre réservation
        </h2>

        {/* Infos film */}
        {[
          { label: 'Film',        value: selectedFilm.title },
          { label: 'Genre',       value: selectedFilm.genre },
          { label: 'Durée',       value: fmtDuration(selectedFilm.duration) },
          { label: 'Réalisateur', value: selectedFilm.director },
          ...(selectedShowtime ? [
            { label: 'Séance', value: `${selectedShowtime.time} — ${selectedShowtime.date}` },
            { label: 'Salle',  value: selectedShowtime.room },
          ] : []),
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between py-2.5 border-b border-[#1E1E1E] text-sm">
            <span className="text-[#888]">{label}</span>
            <span className="font-medium text-[#F0EAE0] text-right max-w-[55%]">{value}</span>
          </div>
        ))}

        {/* Sièges avec +/- */}
        <p className="text-[10px] uppercase tracking-widest text-[#555] mt-4 mb-1 font-medium">
          Sièges ({selectedSeats.length}/6)
        </p>

        {selectedSeats.map(id => {
          const vip   = getSeatType(id) === 'vip';
          const price = getSeatPrice(id, basePrice);
          return (
            <div key={id} className="flex items-center justify-between py-2.5 border-b border-[#1E1E1E]">
              <span className="text-sm text-[#888] flex items-center gap-2">
                Siège {id}
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  vip ? 'bg-yellow-900/40 text-yellow-400' : 'bg-[#2A2A2A] text-[#666]'
                }`}>
                  {vip ? 'VIP' : 'Std'}
                </span>
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => removeSeat(id)}
                  className="w-7 h-7 rounded-md border border-[#2E2E2E] bg-[#1E1E1E] text-[#F0EAE0] flex items-center justify-center hover:bg-red-900/40 hover:border-red-800 transition-colors"
                >−</button>
                <span className="text-sm font-medium text-[#F0EAE0] min-w-[64px] text-center">
                  {price.toFixed(2)} fcf
                </span>
                <button
                  onClick={() => goTo('booking')}
                  disabled={selectedSeats.length >= 6}
                  className="w-7 h-7 rounded-md border border-[#2E2E2E] bg-[#1E1E1E] text-[#F0EAE0] flex items-center justify-center hover:bg-green-900/40 hover:border-green-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >+</button>
              </div>
            </div>
          );
        })}

        {selectedSeats.length < 6 && (
          <button
            onClick={() => goTo('booking')}
            className="w-full mt-3 py-2 border border-dashed border-[#2E2E2E] text-[#555] hover:text-[#888] hover:border-[#444] text-xs rounded-lg transition-colors"
          >
            + Ajouter un siège ({6 - selectedSeats.length} disponible{6 - selectedSeats.length > 1 ? 's' : ''})
          </button>
        )}

        {/* Total */}
        <div className="flex justify-between items-center mt-5 px-4 py-3.5 bg-red-900 rounded-xl">
          <span className="text-red-200 text-sm">Total</span>
          <span className="font-['Bebas_Neue'] text-2xl tracking-wide text-white">
            {total.toFixed(2)} fcf
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={loading || selectedSeats.length === 0}
        className="w-full py-4 bg-red-900 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-['Bebas_Neue'] text-xl tracking-widest rounded-xl transition-colors"
      >
        {loading ? 'Enregistrement...' : 'VALIDER ET PAYER'}
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