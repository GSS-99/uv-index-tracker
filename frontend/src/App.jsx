import React, { useState } from 'react';
import GlassCard from './components/ui/GlassCard';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <div className="min-h-screen p-4 md:p-8 bg-high flex flex-col items-center justify-center">
      <GlassCard>
        <div className="flex items-center justify-between pb-4 border-b border-light/15">
          <h1 className="text-2xl font-bold text-light tracking-wide">UV Index Tracker</h1>
        </div>

        <Dashboard />
      </GlassCard>
    </div>
  );
}

export default App;
