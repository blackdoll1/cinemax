import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { Movie } from '../types';

interface HeroCarouselProps {
  movies: Movie[];
}

export function HeroCarousel({ movies }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, movies.length]);

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-neutral-950"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Images avec transition */}
      <div className="relative h-full">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 translate-x-0'
                : index < currentIndex
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Image de fond */}
            <div className="absolute inset-0">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
            </div>

            {/* Contenu */}
            <div className="relative h-full container mx-auto px-6 flex items-center">
              <div className="max-w-2xl">
                <div className="inline-block px-4 py-2 bg-amber-500 rounded-xl mb-4">
                  <span className="text-white font-bold text-sm uppercase tracking-wider">
                    À l'affiche
                  </span>
                </div>

                <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                  {movie.title}
                </h2>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="text-white font-semibold text-lg">{movie.rating}/10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-500" />
                    <span className="text-white font-semibold">{movie.duration} min</span>
                  </div>
                  <div className="px-3 py-1 bg-neutral-800/80 rounded-lg">
                    <span className="text-amber-300 text-sm font-medium">{movie.genre}</span>
                  </div>
                </div>

                <p className="text-neutral-300 text-lg mb-8 line-clamp-3 max-w-xl">
                  {movie.description}
                </p>

                <button
                  onClick={() => navigate(`/film/${movie.id}`)}
                  className="group bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105"
                >
                  Réserver maintenant
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Boutons de navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-neutral-900/80 hover:bg-amber-500 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-neutral-900/80 hover:bg-amber-500 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-12 h-3 bg-amber-500'
                : 'w-3 h-3 bg-neutral-600 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>

      {/* Compteur */}
      <div className="absolute top-8 right-8 bg-neutral-900/80 backdrop-blur-sm px-4 py-2 rounded-xl z-10">
        <span className="text-amber-500 font-mono font-bold">
          {String(currentIndex + 1).padStart(2, '0')} / {String(movies.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
