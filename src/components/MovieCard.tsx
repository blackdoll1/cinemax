import { Clock, Star, Calendar } from 'lucide-react';
import { Movie } from '../types';
import { Link } from 'react-router';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const canBook = movie.status === 'now-showing';

  const getStatusBadge = () => {
    if (movie.status === 'coming-soon') {
      return (
        <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg">
          Bientôt
        </div>
      );
    }
    if (movie.status === 'in-production') {
      return (
        <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg">
          En production
        </div>
      );
    }
    return null;
  };

  return (
    <Link
      to={canBook ? `/film/${movie.id}` : '#'}
      className={`group block ${!canBook ? 'cursor-default' : ''}`}
      onClick={(e) => {
        if (!canBook) e.preventDefault();
      }}
    >
      <div
        className={`bg-neutral-900 rounded-2xl overflow-hidden border border-amber-500/10 shadow-xl transition-all duration-300 ${
          canBook
            ? 'hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2'
            : 'opacity-80'
        }`}
      >
        <div className="relative overflow-hidden aspect-[2/3]">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className={`w-full h-full object-cover ${
              canBook ? 'group-hover:scale-110' : ''
            } transition-transform duration-500`}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {getStatusBadge()}

          {movie.rating > 0 && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-lg">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-sm">{movie.rating}</span>
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-amber-300 transition-colors">
            {movie.title}
          </h3>

          <p className="text-sm text-amber-500/80 mb-3 font-medium">{movie.genre}</p>

          <div className="flex items-center gap-4 text-neutral-400 text-sm">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>{movie.duration} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>{new Date(movie.releaseDate).getFullYear()}</span>
            </div>
          </div>

          {canBook && (
            <div className="mt-4 pt-4 border-t border-amber-500/10">
              <span className="text-amber-500 font-bold text-sm group-hover:text-amber-400 transition-colors inline-flex items-center gap-2">
                Réserver
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
