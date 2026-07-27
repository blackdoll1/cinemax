import { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Nouvelle réservation',
      message: 'Sophie Martin a réservé 2 places pour Cyber Warriors',
      time: 'Il y a 5 min',
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'Séance bientôt complète',
      message: 'La séance de 20h00 pour Galaxie Perdue n\'a plus que 3 places',
      time: 'Il y a 15 min',
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'Annulation de réservation',
      message: 'Une réservation pour La Maison des Ombres a été annulée',
      time: 'Il y a 1 heure',
      read: true
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
      default:
        return <Info className="w-5 h-5 text-neutral-400" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 group-hover:bg-green-500/20';
      case 'warning':
        return 'bg-amber-500/10 group-hover:bg-amber-500/20';
      case 'info':
        return 'bg-blue-500/10 group-hover:bg-blue-500/20';
      default:
        return 'bg-neutral-700 group-hover:bg-neutral-600';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-neutral-800 rounded-xl transition-colors"
      >
        <Bell className="w-6 h-6 text-neutral-400 hover:text-amber-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg shadow-amber-500/50 animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute right-0 mt-2 w-96 bg-neutral-900 border border-amber-500/20 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[600px] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-amber-500/10 bg-neutral-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Notifications</h3>
                  <p className="text-xs text-neutral-400">
                    {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-amber-400 hover:text-amber-300 font-medium"
                  >
                    Tout marquer comme lu
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
                  <p className="text-neutral-400 text-sm">Aucune notification</p>
                </div>
              ) : (
                <div className="divide-y divide-amber-500/5">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-amber-500/5 transition-colors group cursor-pointer ${
                        !notification.read ? 'bg-amber-500/5' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className={`p-2 rounded-lg h-fit ${getBackgroundColor(notification.type)} transition-colors`}>
                          {getIcon(notification.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-white">
                              {notification.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-neutral-800 rounded"
                            >
                              <X className="w-4 h-4 text-neutral-400" />
                            </button>
                          </div>
                          <p className="text-xs text-neutral-400 mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-amber-500/60">
                              {notification.time}
                            </span>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
