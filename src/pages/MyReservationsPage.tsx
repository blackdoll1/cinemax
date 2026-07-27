import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Clock, MapPin, Ticket, Film, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

interface UserReservation {
  id: string;
  movieTitle: string;
  moviePoster: string;
  date: string;
  time: string;
  room: string;
  seats: string[];
  totalPrice: number;
  status: 'upcoming' | 'past' | 'cancelled';
  bookedAt: string;
}

export function MyReservationsPage() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<UserReservation[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    // Charger les réservations de démonstration
    const mockReservations: UserReservation[] = [
      {
        id: 'USR001',
        movieTitle: 'Cyber Warriors',
        moviePoster: 'https://images.unsplash.com/photo-1765510296004-614b6cc204da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzYyNjI5NDR8MA&ixlib=rb-4.1.0&q=80&w=400',
        date: '2026-04-22',
        time: '20:00',
        room: 'Salle 1',
        seats: ['F12', 'F13'],
        totalPrice: 24,
        status: 'upcoming',
        bookedAt: '2026-04-17T14:30:00'
      },
      {
        id: 'USR002',
        movieTitle: 'Galaxie Perdue',
        moviePoster: 'https://images.unsplash.com/photo-1761948245185-fc300ad20316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMG1vdmllJTIwcG9zdGVyfGVufDF8fHx8MTc3NjI5MTU0MHww&ixlib=rb-4.1.0&q=80&w=400',
        date: '2026-04-25',
        time: '18:30',
        room: 'Salle 2',
        seats: ['H8', 'H9'],
        totalPrice: 24,
        status: 'upcoming',
        bookedAt: '2026-04-16T10:15:00'
      },
      {
        id: 'USR003',
        movieTitle: 'Amour à Paris',
        moviePoster: 'https://images.unsplash.com/photo-1573492306465-c19c59eacdd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvbWVkeSUyMG1vdmllJTIwcG9zdGVyfGVufDF8fHx8MTc3NjMzMzQwM3ww&ixlib=rb-4.1.0&q=80&w=400',
        date: '2026-04-10',
        time: '21:00',
        room: 'Salle 3',
        seats: ['D15', 'D16'],
        totalPrice: 28,
        status: 'past',
        bookedAt: '2026-04-08T16:45:00'
      },
      {
        id: 'USR004',
        movieTitle: 'La Maison des Ombres',
        moviePoster: 'https://images.unsplash.com/photo-1574267432644-f74f8ec96521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzYzMzM0MjR8MA&ixlib=rb-4.1.0&q=80&w=400',
        date: '2026-03-28',
        time: '22:30',
        room: 'Salle 1',
        seats: ['G5'],
        totalPrice: 14,
        status: 'past',
        bookedAt: '2026-03-25T19:20:00'
      },
    ];
    setReservations(mockReservations);
  }, []);

  const filteredReservations = reservations.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const upcomingCount = reservations.filter(r => r.status === 'upcoming').length;
  const pastCount = reservations.filter(r => r.status === 'past').length;

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header artistique */}
      <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-amber-950/20 to-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(251, 191, 36, 0.03) 2px, rgba(251, 191, 36, 0.03) 4px)`
        }}></div>

        <div className="relative container mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-1 h-16 bg-gradient-to-b from-amber-500 to-amber-600"></div>
            <div>
              <h1 className="text-5xl font-bold text-white tracking-tight mb-2">
                Mes Réservations
              </h1>
              <p className="text-amber-200/80 text-lg">
                Retrouvez toutes vos séances passées et à venir
              </p>
            </div>
          </div>

          {/* Stats rapides */}
          <div className="ml-8 mt-8 flex gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500/10 backdrop-blur-sm p-3 rounded-xl border border-amber-500/20">
                <CheckCircle className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{upcomingCount}</div>
                <div className="text-sm text-amber-200/60">À venir</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-neutral-800/50 backdrop-blur-sm p-3 rounded-xl border border-neutral-700">
                <Film className="w-6 h-6 text-neutral-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{pastCount}</div>
                <div className="text-sm text-amber-200/60">Vues</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              filter === 'all'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-neutral-900 text-neutral-400 border border-amber-500/20 hover:border-amber-500/40 hover:text-amber-300'
            }`}
          >
            Toutes ({reservations.length})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              filter === 'upcoming'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-neutral-900 text-neutral-400 border border-amber-500/20 hover:border-amber-500/40 hover:text-amber-300'
            }`}
          >
            À venir ({upcomingCount})
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              filter === 'past'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-neutral-900 text-neutral-400 border border-amber-500/20 hover:border-amber-500/40 hover:text-amber-300'
            }`}
          >
            Passées ({pastCount})
          </button>
        </div>
      </div>

      {/* Liste des réservations */}
      <div className="container mx-auto px-6 pb-12">
        {filteredReservations.length === 0 ? (
          <div className="bg-neutral-900 border border-amber-500/10 rounded-2xl p-16 text-center">
            <Ticket className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Aucune réservation
            </h3>
            <p className="text-neutral-400 mb-6">
              Vous n'avez pas encore de réservation dans cette catégorie
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-amber-500 text-white px-8 py-3 rounded-xl hover:bg-amber-600 transition-colors font-medium"
            >
              Découvrir les films
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredReservations.map((reservation, index) => (
              <div
                key={reservation.id}
                className="group bg-neutral-900 border border-amber-500/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image du film */}
                  <div className="md:w-48 h-48 md:h-auto relative overflow-hidden">
                    <img
                      src={reservation.moviePoster}
                      alt={reservation.movieTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900/50"></div>
                    {reservation.status === 'upcoming' && (
                      <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-lg text-xs font-bold">
                        À VENIR
                      </div>
                    )}
                    {reservation.status === 'past' && (
                      <div className="absolute top-4 left-4 bg-neutral-700 text-neutral-300 px-3 py-1 rounded-lg text-xs font-medium">
                        VUE
                      </div>
                    )}
                  </div>

                  {/* Détails */}
                  <div className="flex-1 p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                          {reservation.movieTitle}
                        </h3>
                        <div className="text-xs font-mono text-amber-500/60">
                          Réservation #{reservation.id}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">{reservation.totalPrice}€</div>
                        <div className="text-xs text-neutral-400">{reservation.seats.length} billet{reservation.seats.length > 1 ? 's' : ''}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-3 bg-neutral-800/50 rounded-xl p-3">
                        <div className="bg-amber-500/10 p-2 rounded-lg">
                          <Calendar className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-400">Date</div>
                          <div className="text-sm font-medium text-white">
                            {new Date(reservation.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-neutral-800/50 rounded-xl p-3">
                        <div className="bg-amber-500/10 p-2 rounded-lg">
                          <Clock className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-400">Heure</div>
                          <div className="text-sm font-medium text-white">{reservation.time}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-neutral-800/50 rounded-xl p-3">
                        <div className="bg-amber-500/10 p-2 rounded-lg">
                          <MapPin className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-400">Salle</div>
                          <div className="text-sm font-medium text-white">{reservation.room}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-neutral-800/50 rounded-xl p-3">
                        <div className="bg-amber-500/10 p-2 rounded-lg">
                          <Ticket className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-400">Sièges</div>
                          <div className="text-sm font-medium text-white">
                            {reservation.seats.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-amber-500/10">
                      <div className="text-xs text-neutral-400">
                        Réservé le {new Date(reservation.bookedAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      {reservation.status === 'upcoming' && (
                        <button
                          onClick={() => navigate(`/reservation/${reservation.id}`)}
                          className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors font-medium text-sm group/btn"
                        >
                          Voir les détails
                          <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
