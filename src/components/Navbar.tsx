import React from 'react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';

const TABS: { label: string; page: Page }[] = [
  { label: 'Films',         page: 'home'    },
  { label: 'Réservation',   page: 'booking' },
  { label: 'Récapitulatif', page: 'summary' },
];

export default function Navbar() {
  const { state, goTo } = useApp();

  return (
    <nav className="bg-[#141414] border-b border-[#2E2E2E] px-6 flex items-center h-14 gap-8">
      <button
        onClick={() => goTo('home')}
        className="font-['Bebas_Neue'] text-2xl tracking-widest text-red-500 hover:text-red-400 transition-colors"
      >
        CINÉMAX
      </button>

      <div className="flex gap-1 ml-auto">
        {TABS.map(({ label, page }) => (
          <button
            key={page}
            onClick={() => goTo(page)}
            className={`px-4 py-1.5 rounded-md text-sm transition-colors font-medium ${
              state.page === page
                ? 'bg-[#2A2A2A] text-red-400'
                : 'text-[#888] hover:text-[#F0EAE0] hover:bg-[#1E1E1E]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
