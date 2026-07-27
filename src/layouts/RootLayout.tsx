import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { useState, useEffect } from 'react';

export function RootLayout() {
  const [cartItemCount, setCartItemCount] = useState(0);
  
  useEffect(() => {
    const checkCart = () => {
      const saved = localStorage.getItem('currentReservation');
      setCartItemCount(saved ? 1 : 0);
    };
    
    checkCart();
    
    // Écouter les changements du localStorage
    window.addEventListener('storage', checkCart);
    
    // Vérifier périodiquement (pour les changements dans la même fenêtre)
    const interval = setInterval(checkCart, 500);
    
    return () => {
      window.removeEventListener('storage', checkCart);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <Header cartItemCount={cartItemCount} />
      <Outlet />
    </div>
  );
}
