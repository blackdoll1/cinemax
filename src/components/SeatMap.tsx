import React from 'react';
import { useApp } from '../context/AppContext';
import { ROWS, getSeatType } from '../data/films';

// Colonnes 1–12 sous forme de strings
const COLS = Array.from({ length: 12 }, (_, i) => String(i + 1));

// Allée visuelle après ces indices de colonne (1-based)
const AISLE_AFTER = [4, 8];

export default function SeatMap() {
  const { state, toggleSeat } = useApp();
  const { takenSeats, selectedSeats } = state;

  function getSeatClass(seatId: string): string {
    const taken    = !!takenSeats[seatId];
    const selected = selectedSeats.includes(seatId);
    const vip      = getSeatType(seatId) === 'vip';

    if (taken)               return 'bg-[#1a1a1a] border-[#222] opacity-35 cursor-not-allowed';
    if (selected && vip)     return 'bg-yellow-800 border-yellow-500 cursor-pointer scale-105';
    if (selected)            return 'bg-red-800 border-red-500 cursor-pointer scale-105';
    if (vip)                 return 'bg-[#1a1200] border-[#5a4200] hover:bg-yellow-900/50 hover:border-yellow-600 cursor-pointer';
    return                          'bg-[#1E1E1E] border-[#2E2E2E] hover:bg-red-900/30 hover:border-red-700 cursor-pointer';
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      {ROWS.map((row) => (
        <div key={row} className="flex items-center gap-1.5">
          {/* Étiquette de rangée */}
          <span className="w-5 text-right text-[10px] text-[#555] select-none">{row}</span>

          {/* Sièges */}
          {COLS.map((col) => {
            const seatId = `${row}${col}`;
            const colNum = Number(col);

            return (
              <React.Fragment key={seatId}>
                <button
                  onClick={() => toggleSeat(seatId)}
                  disabled={!!takenSeats[seatId]}
                  title={`${getSeatType(seatId) === 'vip' ? 'VIP' : 'Standard'} — Rang ${row}, Siège ${col}`}
                  aria-label={`Siège ${seatId}`}
                  className={`w-7 h-6 rounded-t-md rounded-b-sm border transition-all duration-150 ${getSeatClass(seatId)}`}
                />
                {/* Allée visuelle */}
                {AISLE_AFTER.includes(colNum) && (
                  <div className="w-3" aria-hidden="true" />
                )}
              </React.Fragment>
            );
          })}

          {/* Étiquette droite */}
          <span className="w-5 text-left text-[10px] text-[#555] select-none">{row}</span>
        </div>
      ))}
    </div>
  );
}
