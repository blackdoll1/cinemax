import { Film } from 'lucide-react';

export function CinemaLoader() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="text-center">
        {/* Logo animé */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-20 h-20 mx-auto rounded-2xl opacity-20"></div>
          </div>
          <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-2xl shadow-2xl shadow-amber-500/30 mx-auto w-20 h-20 flex items-center justify-center animate-pulse">
            <Film className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Texte */}
        <h2 className="text-2xl font-bold text-white mb-2">Chargement</h2>
        <p className="text-amber-200/60 text-sm mb-8">Préparation de votre expérience cinéma...</p>

        {/* Barre de progression */}
        <div className="w-64 mx-auto bg-neutral-800 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full animate-loading-bar"></div>
        </div>

        {/* Points animés */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 0.5;
          }
        }

        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
