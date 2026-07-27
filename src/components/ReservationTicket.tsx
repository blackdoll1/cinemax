import { Calendar, Clock, MapPin, User, Ticket as TicketIcon } from 'lucide-react';

interface ReservationTicketProps {
  reservationId: string;
  movieTitle: string;
  date: string;
  time: string;
  room: string;
  seats: string[];
  customerName?: string;
}

export function ReservationTicket({
  reservationId,
  movieTitle,
  date,
  time,
  room,
  seats,
  customerName
}: ReservationTicketProps) {
  return (
    <div className="relative bg-neutral-900 rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl max-w-md">
      {/* Effet de perforation en haut */}
      <div className="absolute top-0 left-0 right-0 h-8 flex justify-between px-4">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-neutral-950 rounded-full -mt-1"
            style={{
              animation: `float 3s ease-in-out ${i * 0.1}s infinite`
            }}
          ></div>
        ))}
      </div>

      {/* En-tête du ticket */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 px-8 pt-10 pb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
          }}></div>
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <TicketIcon className="w-8 h-8 text-white" />
            <div>
              <div className="text-white/80 text-xs font-medium">Billet de Cinéma</div>
              <div className="text-white text-2xl font-bold">CinéTicket</div>
            </div>
          </div>

          <div className="text-white/90 text-sm font-mono mt-4">
            #{reservationId}
          </div>
        </div>
      </div>

      {/* Ligne de découpe */}
      <div className="relative h-8 flex items-center">
        <div className="w-6 h-6 bg-neutral-950 rounded-full -ml-3"></div>
        <div className="flex-1 border-t-2 border-dashed border-amber-500/20"></div>
        <div className="w-6 h-6 bg-neutral-950 rounded-full -mr-3"></div>
      </div>

      {/* Détails du ticket */}
      <div className="px-8 py-6 space-y-6">
        <div>
          <div className="text-amber-500/60 text-xs font-semibold uppercase tracking-wider mb-2">
            Film
          </div>
          <div className="text-white text-2xl font-bold leading-tight">
            {movieTitle}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-500/60 text-xs font-semibold uppercase tracking-wider mb-2">
              <Calendar className="w-3 h-3" />
              Date
            </div>
            <div className="text-white font-medium">
              {new Date(date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-amber-500/60 text-xs font-semibold uppercase tracking-wider mb-2">
              <Clock className="w-3 h-3" />
              Heure
            </div>
            <div className="text-white font-medium">{time}</div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-amber-500/60 text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin className="w-3 h-3" />
              Salle
            </div>
            <div className="text-white font-medium">{room}</div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-amber-500/60 text-xs font-semibold uppercase tracking-wider mb-2">
              <TicketIcon className="w-3 h-3" />
              Sièges
            </div>
            <div className="text-white font-medium">{seats.join(', ')}</div>
          </div>
        </div>

        {customerName && (
          <div className="pt-4 border-t border-amber-500/10">
            <div className="flex items-center gap-2 text-amber-500/60 text-xs font-semibold uppercase tracking-wider mb-2">
              <User className="w-3 h-3" />
              Titulaire
            </div>
            <div className="text-white font-medium">{customerName}</div>
          </div>
        )}

        {/* Code-barres stylisé */}
        <div className="pt-6">
          <div className="flex gap-[2px] h-16 items-end">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-amber-500/80 rounded-t"
                style={{
                  height: `${30 + (Math.sin(i) * 20)}%`
                }}
              ></div>
            ))}
          </div>
          <div className="text-center mt-2 text-amber-500/60 text-xs font-mono">
            {reservationId.replace(/[A-Z]/g, (c) => String(c.charCodeAt(0))).padEnd(12, '0')}
          </div>
        </div>
      </div>

      {/* Effet de perforation en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex justify-between px-4">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-neutral-950 rounded-full -mb-1"
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}
