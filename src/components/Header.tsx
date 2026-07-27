import { Film, ShoppingCart, LayoutDashboard, Ticket } from 'lucide-react';
import { Link, useLocation } from 'react-router';

interface HeaderProps {
  cartItemCount?: number;
}

export function Header({ cartItemCount = 0 }: HeaderProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-neutral-950 border-b border-amber-500/10 text-white shadow-2xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-xl group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
              <Film className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                CinéTicket
              </h1>
              <p className="text-xs text-amber-200/60">Réservez vos places</p>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive('/')
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                  : 'text-neutral-400 hover:text-amber-300 hover:bg-neutral-900'
              }`}
            >
              <Film className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Films</span>
            </Link>

            <Link
              to="/mes-reservations"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive('/mes-reservations')
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                  : 'text-neutral-400 hover:text-amber-300 hover:bg-neutral-900'
              }`}
            >
              <Ticket className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Mes Réservations</span>
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive('/dashboard')
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                  : 'text-neutral-400 hover:text-amber-300 hover:bg-neutral-900'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Dashboard</span>
            </Link>

            <Link
              to="/panier"
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive('/panier')
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                  : 'text-neutral-400 hover:text-amber-300 hover:bg-neutral-900'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Panier</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg shadow-amber-500/50">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
