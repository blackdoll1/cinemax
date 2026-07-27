import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ReservationTicket } from '../components/ReservationTicket';
import { ArrowLeft, Download, Share2, Mail } from 'lucide-react';

interface ReservationDetail {
  id: string;
  customerName: string;
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

export function ReservationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<ReservationDetail | null>(null);

  useEffect(() => {
    // Simuler le chargement d'une réservation
    // En production, ceci viendrait d'une API
    const mockReservation: ReservationDetail = {
      id: id || 'USR001',
      customerName: 'Sophie Martin',
      movieTitle: 'Cyber Warriors',
      moviePoster: 'https://images.unsplash.com/photo-1765510296004-614b6cc204da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzYyNjI5NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: '2026-04-22',
      time: '20:00',
      room: 'Salle 1',
      seats: ['F12', 'F13'],
      totalPrice: 24,
      status: 'upcoming',
      bookedAt: '2026-04-17T14:30:00'
    };
    setReservation(mockReservation);
  }, [id]);

  if (!reservation) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-neutral-900 via-amber-950/20 to-neutral-900 border-b border-amber-500/10">
        <div className="container mx-auto px-6 py-8">
          <button
            onClick={() => navigate('/mes-reservations')}
            className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Retour à mes réservations</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-amber-600"></div>
            <div>
              <h1 className="text-3xl font-bold text-white">Détails de la réservation</h1>
              <p className="text-amber-200/60 text-sm font-mono">#{reservation.id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Ticket */}
          <div className="flex justify-center lg:sticky lg:top-8">
            <ReservationTicket
              reservationId={reservation.id}
              movieTitle={reservation.movieTitle}
              date={reservation.date}
              time={reservation.time}
              room={reservation.room}
              seats={reservation.seats}
              customerName={reservation.customerName}
            />
          </div>

          {/* Actions et informations */}
          <div className="space-y-6">
            {/* Poster du film */}
            <div className="bg-neutral-900 border border-amber-500/10 rounded-2xl overflow-hidden">
              <img
                src={reservation.moviePoster}
                alt={reservation.movieTitle}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {reservation.movieTitle}
                </h2>
                <div className="text-amber-500/60 text-sm">
                  Réservé le {new Date(reservation.bookedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-neutral-900 border border-amber-500/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-1 h-5 bg-amber-500"></div>
                Actions rapides
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-white px-6 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 font-medium">
                  <Download className="w-5 h-5" />
                  Télécharger
                </button>

                <button className="flex items-center justify-center gap-3 bg-neutral-800 hover:bg-neutral-700 border border-amber-500/20 text-amber-300 px-6 py-4 rounded-xl transition-all duration-300 hover:border-amber-500/40 font-medium">
                  <Share2 className="w-5 h-5" />
                  Partager
                </button>

                <button className="flex items-center justify-center gap-3 bg-neutral-800 hover:bg-neutral-700 border border-amber-500/20 text-amber-300 px-6 py-4 rounded-xl transition-all duration-300 hover:border-amber-500/40 font-medium sm:col-span-2">
                  <Mail className="w-5 h-5" />
                  Envoyer par email
                </button>
              </div>
            </div>

            {/* Informations importantes */}
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                <div className="w-1 h-5 bg-amber-500"></div>
                Informations importantes
              </h3>

              <ul className="space-y-2 text-amber-200/80 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></div>
                  <span>Présentez ce billet à l'entrée de la salle</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></div>
                  <span>Arrivez 15 minutes avant le début de la séance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></div>
                  <span>Les portes ferment 5 minutes après le début du film</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></div>
                  <span>Nombre de billets : {reservation.seats.length}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></div>
                  <span>Montant payé : {reservation.totalPrice}€</span>
                </li>
              </ul>
            </div>

            {reservation.status === 'upcoming' && (
              <div className="bg-neutral-900 border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  Annuler la réservation
                </h3>
                <p className="text-neutral-400 text-sm mb-4">
                  Vous pouvez annuler votre réservation jusqu'à 2 heures avant le début de la séance.
                </p>
                <button className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-6 py-3 rounded-xl transition-all duration-300 font-medium">
                  Annuler cette réservation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
