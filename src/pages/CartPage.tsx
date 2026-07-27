import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { Reservation } from '../types';
import { ShoppingCart, Trash2, CreditCard, CheckCircle } from 'lucide-react';

export function CartPage() {
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem('currentReservation');
    if (saved) {
      setReservation(JSON.parse(saved));
    }
  }, []);
  
  const handleRemove = () => {
    localStorage.removeItem('currentReservation');
    setReservation(null);
    navigate('/');
  };
  
  const handleConfirmPayment = () => {
    setIsConfirmed(true);
    // Simuler un délai de traitement
    setTimeout(() => {
      localStorage.removeItem('currentReservation');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };
  
  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-12 max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Réservation confirmée !</h2>
          <p className="text-gray-600 mb-6">
            Vos billets ont été réservés avec succès. Vous allez recevoir un email de confirmation.
          </p>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-800">
              Présentez votre confirmation à l'entrée de la salle
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!reservation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Mon Panier</h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Votre panier est vide</h2>
            <p className="text-gray-600 mb-6">Découvrez nos films à l'affiche et réservez vos places</p>
            <button
              onClick={() => navigate('/')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Voir les films
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    };
    return date.toLocaleDateString('fr-FR', options);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Mon Panier</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Détails de la réservation */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {reservation.movieTitle}
                  </h2>
                  <div className="space-y-1 text-gray-600">
                    <p className="capitalize">{formatDate(reservation.date)}</p>
                    <p>{reservation.time} - {reservation.room}</p>
                  </div>
                </div>
                <button
                  onClick={handleRemove}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Sièges sélectionnés</h3>
                <div className="flex flex-wrap gap-2">
                  {reservation.seats.map(seat => (
                    <div
                      key={seat.id}
                      className={`px-3 py-2 rounded-md text-sm font-semibold ${
                        seat.type === 'vip'
                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                          : 'bg-purple-100 text-purple-800 border border-purple-300'
                      }`}
                    >
                      {seat.id} {seat.type === 'vip' && '⭐'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Informations importantes */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h3 className="font-semibold text-blue-900 mb-2">Informations importantes</h3>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Arrivez 15 minutes avant le début de la séance</li>
                <li>Présentez votre confirmation par email ou SMS</li>
                <li>Les billets ne sont ni échangeables ni remboursables</li>
              </ul>
            </div>
          </div>
          
          {/* Récapitulatif et paiement */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Récapitulatif</h3>
              
              <div className="space-y-3 mb-6">
                {reservation.seats.map(seat => {
                  const basePrice = reservation.totalPrice / reservation.seats.length;
                  const seatPrice = seat.type === 'vip' ? basePrice : basePrice;
                  
                  return (
                    <div key={seat.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Siège {seat.id} {seat.type === 'vip' ? '(VIP)' : ''}
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {seatPrice.toFixed(2)} €
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-purple-600">
                    {reservation.totalPrice.toFixed(2)} €
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleConfirmPayment}
                className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Procéder au paiement
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Paiement sécurisé par carte bancaire
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
