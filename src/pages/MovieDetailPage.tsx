import { useParams, useNavigate } from 'react-router';
import { movies, showtimes } from '../data/movies';
import { Clock, Star, Calendar, Users, Info } from 'lucide-react';
import type { Showtime } from '../types';
import { ImageWithFallback } from '../components/image/ImageWithFallback';

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const movie = movies.find(m => m.id === id);
  const movieShowtimes = showtimes.filter(s => s.movieId === id);
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Film non trouvé</h2>
          <button
            onClick={() => navigate('/')}
            className="text-purple-600 hover:text-purple-700"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }
  
  // Vérifier si le film est réservable
  const canBook = movie.status === 'now-showing';
  
  // Grouper les séances par date
  const showtimesByDate = movieShowtimes.reduce((acc, showtime) => {
    if (!acc[showtime.date]) {
      acc[showtime.date] = [];
    }
    acc[showtime.date].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
    return date.toLocaleDateString('fr-FR', options);
  };
  
  const handleSelectShowtime = (showtimeId: string) => {
    navigate(`/seances/${showtimeId}/sieges`);
  };
  
  const getStatusMessage = () => {
    if (movie.status === 'coming-soon') {
      return (
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-700 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">Prochainement</h3>
              <p className="text-sm text-blue-800">
                Ce film sortira le {new Date(movie.releaseDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}. 
                Les réservations ouvriront prochainement.
              </p>
            </div>
          </div>
        </div>
      );
    }
    if (movie.status === 'in-production') {
      return (
        <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-700 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900">En production</h3>
              <p className="text-sm text-orange-800">
                Ce film est actuellement en production. Sortie prévue le {new Date(movie.releaseDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}.
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-[300px_1fr] gap-8">
            <div className="w-full max-w-sm mx-auto md:mx-0">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-300">
                  {movie.rating > 0 && (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      <span className="text-lg">{movie.rating}/10</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{movie.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(movie.releaseDate).getFullYear()}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-wide text-gray-400 mb-2">Genre</h3>
                <p className="text-lg">{movie.genre}</p>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-wide text-gray-400 mb-2">Synopsis</h3>
                <p className="text-gray-200 leading-relaxed">{movie.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-400 mb-2">Réalisateur</h3>
                  <p>{movie.director}</p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-400 mb-2">Casting</h3>
                  <p className="text-gray-200">{movie.cast.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {!canBook ? (
          getStatusMessage()
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Séances disponibles</h2>
            
            <div className="space-y-8">
              {Object.entries(showtimesByDate).map(([date, times]) => (
                <div key={date} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
                    {formatDate(date)}
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {times.map(showtime => (
                      <button
                        key={showtime.id}
                        onClick={() => handleSelectShowtime(showtime.id.toString())}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          showtime.availableSeats > 10
                            ? 'border-green-500 hover:bg-green-50 hover:border-green-600'
                            : showtime.availableSeats > 0
                            ? 'border-orange-500 hover:bg-orange-50 hover:border-orange-600'
                            : 'border-gray-300 bg-gray-100 cursor-not-allowed'
                        }`}
                        disabled={showtime.availableSeats === 0}
                      >
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {showtime.time}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">{showtime.room}</div>
                          <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                            <Users className="w-3 h-3" />
                            <span>{showtime.availableSeats} places</span>
                          </div>
                          <div className="text-sm font-semibold text-purple-600 mt-2">
                            {showtime.price.toFixed(2)} €
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}