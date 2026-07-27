import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, DollarSign, Film, Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { movies } from '../data/movies';
import { TrendChart } from '../components/TrendChart';
import { ExportMenu } from '../components/ExportMenu';
import { NotificationBell } from '../components/NotificationBell';
import { PopularMoviesWidget } from '../components/PopularMoviesWidget';

interface DashboardReservation {
  id: string;
  customerName: string;
  email: string;
  movieTitle: string;
  date: string;
  time: string;
  room: string;
  seats: string[];
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  bookedAt: string;
}

const COLORS = ['#F59E0B', '#D97706', '#B45309', '#92400E', '#78350F'];

export function DashboardPage() {
  const [reservations, setReservations] = useState<DashboardReservation[]>([]);
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('week');

  // Données de tendance pour le graphique
  const trendData = [
    { date: '11 Avr', value: 120 },
    { date: '12 Avr', value: 240 },
    { date: '13 Avr', value: 180 },
    { date: '14 Avr', value: 360 },
    { date: '15 Avr', value: 280 },
    { date: '16 Avr', value: 420 },
    { date: '17 Avr', value: 380 },
  ];

  useEffect(() => {
    // Générer des données de réservation de démonstration
    const mockReservations: DashboardReservation[] = [
      {
        id: 'RES001',
        customerName: 'Sophie Martin',
        email: 'sophie.martin@email.com',
        movieTitle: 'Cyber Warriors',
        date: '2026-04-18',
        time: '20:00',
        room: 'Salle 1',
        seats: ['F12', 'F13'],
        totalPrice: 24,
        status: 'confirmed',
        bookedAt: '2026-04-17T14:30:00'
      },
      {
        id: 'RES002',
        customerName: 'Thomas Dubois',
        email: 'thomas.dubois@email.com',
        movieTitle: 'Galaxie Perdue',
        date: '2026-04-19',
        time: '18:30',
        room: 'Salle 2',
        seats: ['H8', 'H9', 'H10'],
        totalPrice: 36,
        status: 'confirmed',
        bookedAt: '2026-04-17T10:15:00'
      },
      {
        id: 'RES003',
        customerName: 'Marie Laurent',
        email: 'marie.laurent@email.com',
        movieTitle: 'Amour à Paris',
        date: '2026-04-20',
        time: '21:00',
        room: 'Salle 3',
        seats: ['D15', 'D16'],
        totalPrice: 28,
        status: 'pending',
        bookedAt: '2026-04-17T16:45:00'
      },
      {
        id: 'RES004',
        customerName: 'Pierre Bernard',
        email: 'pierre.bernard@email.com',
        movieTitle: 'La Maison des Ombres',
        date: '2026-04-18',
        time: '22:30',
        room: 'Salle 1',
        seats: ['G5'],
        totalPrice: 12,
        status: 'confirmed',
        bookedAt: '2026-04-16T19:20:00'
      },
      {
        id: 'RES005',
        customerName: 'Julie Petit',
        email: 'julie.petit@email.com',
        movieTitle: 'Cyber Warriors',
        date: '2026-04-21',
        time: '19:00',
        room: 'Salle 1',
        seats: ['A1', 'A2', 'A3', 'A4'],
        totalPrice: 56,
        status: 'confirmed',
        bookedAt: '2026-04-17T08:00:00'
      },
    ];
    setReservations(mockReservations);
  }, []);

  // Calcul des statistiques
  const stats = {
    totalRevenue: reservations.reduce((sum, r) => r.status === 'confirmed' ? sum + r.totalPrice : sum, 0),
    totalReservations: reservations.filter(r => r.status === 'confirmed').length,
    totalCustomers: new Set(reservations.map(r => r.email)).size,
    averageTicketPrice: reservations.length > 0
      ? Math.round(reservations.reduce((sum, r) => sum + r.totalPrice, 0) / reservations.reduce((sum, r) => sum + r.seats.length, 0))
      : 0
  };

  // Données pour les graphiques
  const movieRevenueData = movies
    .filter(m => m.status === 'now-showing')
    .slice(0, 5)
    .map(movie => {
      const movieRevenue = reservations
        .filter(r => r.movieTitle === movie.title && r.status === 'confirmed')
        .reduce((sum, r) => sum + r.totalPrice, 0);
      return {
        name: movie.title,
        revenue: movieRevenue,
        tickets: reservations
          .filter(r => r.movieTitle === movie.title && r.status === 'confirmed')
          .reduce((sum, r) => sum + r.seats.length, 0)
      };
    });

  // Données pour le widget des films populaires
  const popularMoviesData = movies
    .filter(m => m.status === 'now-showing')
    .map(movie => {
      const movieRevenue = reservations
        .filter(r => r.movieTitle === movie.title && r.status === 'confirmed')
        .reduce((sum, r) => sum + r.totalPrice, 0);
      const tickets = reservations
        .filter(r => r.movieTitle === movie.title && r.status === 'confirmed')
        .reduce((sum, r) => sum + r.seats.length, 0);
      return {
        title: movie.title,
        revenue: movieRevenue,
        tickets: tickets,
        rating: movie.rating,
        trend: Math.floor(Math.random() * 30) + 5 // Simulation de tendance
      };
    })
    .sort((a, b) => b.revenue - a.revenue);

  const statusData = [
    { name: 'Confirmées', value: reservations.filter(r => r.status === 'confirmed').length },
    { name: 'En attente', value: reservations.filter(r => r.status === 'pending').length },
    { name: 'Annulées', value: reservations.filter(r => r.status === 'cancelled').length },
  ].filter(item => item.value > 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmée';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header avec effet de spotlight */}
      <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-amber-950/20 to-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent"></div>
        <div className="relative container mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-amber-600"></div>
              <div>
                <h1 className="text-5xl font-bold text-white tracking-tight">
                  Dashboard
                </h1>
                <p className="text-amber-200/80 text-lg mt-1">
                  Gestion et statistiques des réservations
                </p>
              </div>
            </div>
            <NotificationBell />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 -mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-white/60" />
            </div>
            <div className="text-white/80 text-sm font-medium mb-1">Revenus Total</div>
            <div className="text-3xl font-bold text-white">{stats.totalRevenue}€</div>
          </div>

          <div className="group bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-6 border border-amber-500/20 shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-amber-500/10 backdrop-blur-sm p-3 rounded-xl">
                <Ticket className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <div className="text-amber-200/60 text-sm font-medium mb-1">Réservations</div>
            <div className="text-3xl font-bold text-white">{stats.totalReservations}</div>
          </div>

          <div className="group bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-6 border border-amber-500/20 shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-amber-500/10 backdrop-blur-sm p-3 rounded-xl">
                <Users className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <div className="text-amber-200/60 text-sm font-medium mb-1">Clients</div>
            <div className="text-3xl font-bold text-white">{stats.totalCustomers}</div>
          </div>

          <div className="group bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-6 border border-amber-500/20 shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-amber-500/10 backdrop-blur-sm p-3 rounded-xl">
                <Film className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <div className="text-amber-200/60 text-sm font-medium mb-1">Prix Moyen Billet</div>
            <div className="text-3xl font-bold text-white">{stats.averageTicketPrice}€</div>
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="container mx-auto px-6 mb-12">
        <TrendChart
          data={trendData}
          title="Évolution des Revenus (7 derniers jours)"
          type="area"
        />
      </div>

      {/* Charts Section */}
      <div className="container mx-auto px-6 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-neutral-900 border border-amber-500/10 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-1 h-6 bg-amber-500"></div>
              Revenus par Film
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={movieRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                <XAxis
                  dataKey="name"
                  stroke="#a1a1aa"
                  tick={{ fill: '#a1a1aa', fontSize: 12 }}
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#171717',
                    border: '1px solid #F59E0B',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="revenue" fill="#F59E0B" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Popular Movies Widget */}
          <PopularMoviesWidget movies={popularMoviesData} />
        </div>
      </div>

      {/* Pie Chart Row */}
      <div className="container mx-auto px-6 mb-12">
        <div className="bg-neutral-900 border border-amber-500/10 rounded-2xl p-8 shadow-xl max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-1 h-6 bg-amber-500"></div>
            Statut des Réservations
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#171717',
                  border: '1px solid #F59E0B',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="container mx-auto px-6 pb-12">
        <div className="bg-neutral-900 border border-amber-500/10 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 border-b border-amber-500/10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-1 h-6 bg-amber-500"></div>
                Réservations Récentes
              </h2>
              <ExportMenu data={reservations} filename="reservations" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-amber-500/10 bg-neutral-800/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-200/80 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-200/80 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-200/80 uppercase tracking-wider">Film</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-200/80 uppercase tracking-wider">Séance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-200/80 uppercase tracking-wider">Sièges</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-200/80 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-amber-200/80 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/5">
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-amber-500/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-amber-500">
                      {reservation.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{reservation.customerName}</div>
                      <div className="text-xs text-neutral-400">{reservation.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white font-medium">
                      {reservation.movieTitle}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        {new Date(reservation.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                        <Clock className="w-3 h-3" />
                        {reservation.time}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                        <MapPin className="w-3 h-3" />
                        {reservation.room}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-300">
                      <div className="flex flex-wrap gap-1">
                        {reservation.seats.map(seat => (
                          <span key={seat} className="inline-block px-2 py-1 bg-amber-500/10 text-amber-300 rounded text-xs font-mono">
                            {seat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                      {reservation.totalPrice}€
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(reservation.status)}`}>
                        {getStatusLabel(reservation.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
