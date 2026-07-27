import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { movies, showtimes, generateSeats } from '../data/movies';
import type { Seat } from '../types';
import { ArrowLeft, Check } from 'lucide-react';

export function SeatSelectionPage() {
  const { showtimeId } = useParams<{ showtimeId: string }>();
  const navigate = useNavigate();
  
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  
  const showtime = showtimes.find(s => s.id === showtimeId);
  const movie = showtime ? movies.find(m => m.id === showtime.movieId) : null;
  
  useEffect(() => {
    if (showtimeId) {
      setSeats(generateSeats(showtimeId));
    }
  }, [showtimeId]);
  
  if (!showtime || !movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Séance non trouvée</h2>
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
  
  const toggleSeat = (seat: Seat) => {
    if (!seat.isAvailable) return;
    
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };
  
  const handleConfirm = () => {
    if (selectedSeats.length === 0) return;
    
    const reservation = {
      movieId: movie.id,
      movieTitle: movie.title,
      showtimeId: showtime.id,
      date: showtime.date,
      time: showtime.time,
      room: showtime.room,
      seats: selectedSeats,
      totalPrice: selectedSeats.reduce((total, seat) => {
        return total + (seat.type === 'vip' ? showtime.price * 1.5 : showtime.price);
      }, 0)
    };
    
    // Sauvegarder dans localStorage
    localStorage.setItem('currentReservation', JSON.stringify(reservation));
    navigate('/panier');
  };
  
  const rows = Array.from(new Set(seats.map(s => s.row))).sort();
  
  const standardPrice = showtime.price;
  const vipPrice = showtime.price * 1.5;
  
  const totalPrice = selectedSeats.reduce((total, seat) => {
    return total + (seat.type === 'vip' ? vipPrice : standardPrice);
  }, 0);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-8">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(`/film/${movie.id}`)}
            className="flex items-center gap-2 text-purple-200 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <div className="flex flex-wrap gap-4 text-purple-200">
            <span>{showtime.date}</span>
            <span>•</span>
            <span>{showtime.time}</span>
            <span>•</span>
            <span>{showtime.room}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Écran */}
        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-b from-gray-300 to-gray-400 h-2 rounded-t-full mb-2"></div>
            <div className="text-center text-gray-600 text-sm">ÉCRAN</div>
          </div>
        </div>
        
        {/* Sièges */}
        <div className="max-w-4xl mx-auto space-y-3 mb-8">
          {rows.map(row => {
            const rowSeats = seats.filter(s => s.row === row);
            const isVipRow = rowSeats[0]?.type === 'vip';
            
            return (
              <div key={row} className="flex items-center gap-2 justify-center">
                <div className={`w-8 text-center font-semibold ${isVipRow ? 'text-yellow-600' : 'text-gray-600'}`}>
                  {row}
                </div>
                <div className="flex gap-2">
                  {rowSeats.map(seat => {
                    const isSelected = selectedSeats.some(s => s.id === seat.id);
                    
                    return (
                      <button
                        key={seat.id}
                        onClick={() => toggleSeat(seat)}
                        disabled={!seat.isAvailable}
                        className={`
                          w-10 h-10 rounded-t-lg text-xs font-semibold transition-all
                          ${!seat.isAvailable 
                            ? 'bg-gray-300 text-gray-400 cursor-not-allowed' 
                            : isSelected
                            ? seat.type === 'vip'
                              ? 'bg-yellow-500 text-white shadow-lg scale-110'
                              : 'bg-purple-600 text-white shadow-lg scale-110'
                            : seat.type === 'vip'
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-2 border-yellow-400'
                            : 'bg-green-100 text-green-800 hover:bg-green-200 border-2 border-green-400'
                          }
                        `}
                      >
                        {isSelected ? <Check className="w-4 h-4 mx-auto" /> : seat.number}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Légende */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 border-2 border-green-400 rounded-t-lg"></div>
            <span className="text-sm text-gray-700">Standard ({standardPrice.toFixed(2)} €)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-100 border-2 border-yellow-400 rounded-t-lg"></div>
            <span className="text-sm text-gray-700">VIP ({vipPrice.toFixed(2)} €)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-t-lg"></div>
            <span className="text-sm text-gray-700">Sélectionné</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-t-lg"></div>
            <span className="text-sm text-gray-700">Occupé</span>
          </div>
        </div>
      </div>
      
      {/* Barre de confirmation fixe */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-purple-600 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm text-gray-600">
                  {selectedSeats.length} siège{selectedSeats.length > 1 ? 's' : ''} sélectionné{selectedSeats.length > 1 ? 's' : ''}
                </div>
                <div className="text-xs text-gray-500">
                  {selectedSeats.map(s => s.id).join(', ')}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-600">Total</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {totalPrice.toFixed(2)} €
                  </div>
                </div>
                
                <button
                  onClick={handleConfirm}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
