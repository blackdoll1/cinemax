import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import SummaryPage from './pages/SummaryPage';

function Dashboard() {
  const { state } = useApp();

  const pages: Record<string, React.ReactElement> = {
    home:    <HomePage />,
    booking: <BookingPage />,
    summary: <SummaryPage />,
  };

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] text-[#F0EAE0]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Navbar />
      <main>{pages[state.page]}</main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}
