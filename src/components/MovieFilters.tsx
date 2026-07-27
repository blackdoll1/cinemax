import { Filter } from 'lucide-react';

interface MovieFiltersProps {
  activeStatus: 'now-showing' | 'coming-soon' | 'in-production';
  onStatusChange: (status: 'now-showing' | 'coming-soon' | 'in-production') => void;
  activeGenre: string;
  onGenreChange: (genre: string) => void;
  genres: string[];
}

export function MovieFilters({
  activeStatus,
  onStatusChange,
  activeGenre,
  onGenreChange,
  genres
}: MovieFiltersProps) {
  const statuses = [
    { id: 'now-showing' as const, label: 'À l\'affiche', count: 10 },
    { id: 'coming-soon' as const, label: 'Prochainement', count: 10 },
    { id: 'in-production' as const, label: 'En production', count: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Onglets de statut */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {statuses.map(status => (
          <button
            key={status.id}
            onClick={() => onStatusChange(status.id)}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
              activeStatus === status.id
                ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/30 scale-105'
                : 'bg-neutral-900 text-neutral-400 border border-amber-500/20 hover:border-amber-500/40 hover:text-amber-300'
            }`}
          >
            {status.label}
            <span
              className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                activeStatus === status.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-neutral-800 text-neutral-500'
              }`}
            >
              {status.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filtres par genre */}
      <div className="bg-neutral-900 border border-amber-500/10 rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-500/10 p-2 rounded-lg">
            <Filter className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="font-bold text-white text-lg">Filtrer par genre</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onGenreChange('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeGenre === 'all'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-neutral-800 text-neutral-400 border border-amber-500/20 hover:border-amber-500/40 hover:text-amber-300'
            }`}
          >
            Tous les genres
          </button>
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => onGenreChange(genre)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeGenre === genre
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                  : 'bg-neutral-800 text-neutral-400 border border-amber-500/20 hover:border-amber-500/40 hover:text-amber-300'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
