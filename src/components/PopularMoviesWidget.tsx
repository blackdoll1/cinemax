import { Film, TrendingUp, Star, Ticket } from 'lucide-react';

interface MovieStat {
  title: string;
  revenue: number;
  tickets: number;
  rating: number;
  trend: number;
}

interface PopularMoviesWidgetProps {
  movies: MovieStat[];
}

export function PopularMoviesWidget({ movies }: PopularMoviesWidgetProps) {
  const topMovies = movies.slice(0, 5);

  return (
    <div className="bg-neutral-900 border border-amber-500/10 rounded-2xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="w-1 h-6 bg-amber-500"></div>
        Top Films
      </h2>

      <div className="space-y-4">
        {topMovies.map((movie, index) => (
          <div
            key={movie.title}
            className="group relative bg-neutral-800/50 hover:bg-neutral-800 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 overflow-hidden"
          >
            {/* Indicateur de rang */}
            <div className="absolute -left-2 -top-2 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-br-2xl flex items-end justify-end p-1">
              <span className="text-white font-bold text-sm">#{index + 1}</span>
            </div>

            <div className="flex items-start gap-4 ml-8">
              <div className="bg-amber-500/10 p-3 rounded-xl group-hover:bg-amber-500/20 transition-colors">
                <Film className="w-6 h-6 text-amber-500" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-lg mb-2 truncate group-hover:text-amber-300 transition-colors">
                  {movie.title}
                </h3>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500/60 text-xs mb-1">
                      <TrendingUp className="w-3 h-3" />
                      Revenus
                    </div>
                    <div className="text-white font-bold">{movie.revenue}€</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-amber-500/60 text-xs mb-1">
                      <Ticket className="w-3 h-3" />
                      Billets
                    </div>
                    <div className="text-white font-bold">{movie.tickets}</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-amber-500/60 text-xs mb-1">
                      <Star className="w-3 h-3" />
                      Note
                    </div>
                    <div className="text-white font-bold">{movie.rating}/10</div>
                  </div>
                </div>

                {/* Barre de progression basée sur les revenus */}
                <div className="mt-3">
                  <div className="w-full bg-neutral-700 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-1000"
                      style={{
                        width: `${Math.min((movie.revenue / Math.max(...topMovies.map(m => m.revenue))) * 100, 100)}%`,
                        animation: `growWidth 1s ease-out ${index * 0.1}s both`
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Badge de tendance */}
              {movie.trend > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 rounded-lg">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs font-semibold text-green-400">
                    +{movie.trend}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes growWidth {
          from {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
