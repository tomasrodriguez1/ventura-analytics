'use client';

import { useDashboard } from '../../hooks/useDashboard';
import DashboardTabs from './DashboardTabs';
import OverviewTab from './OverviewTab';
import MaintenanceTab from './MaintenanceTab';
import InventoryTab from './InventoryTab';
import AnalyticsTab from './AnalyticsTab';

interface DashboardProps {
  playfair: {
    className?: string;
    style?: React.CSSProperties;
  };
}

export default function Dashboard({ playfair }: DashboardProps) {
  const { data, loading, error, activeTab, setActiveTab, lastUpdated, refresh } = useDashboard();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white text-xl">Cargando dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">❌ {error}</div>
          <button 
            onClick={refresh}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg mb-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className={`text-3xl font-bold text-gray-800 ${playfair.className}`}>
              🏭 Dashboard Minero - Ventura Analytics
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-gray-600 text-right">
                <div>
                  {new Date().toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                {lastUpdated && (
                  <div className="text-xs text-gray-500">
                    Última actualización: {lastUpdated.toLocaleTimeString('es-ES')}
                  </div>
                )}
              </div>
              <button
                onClick={refresh}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <span className={loading ? 'animate-spin' : ''}>🔄</span>
                {loading ? 'Actualizando...' : 'Actualizar Datos'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 mb-8">
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        {activeTab === 'overview' && <OverviewTab data={data} />}
        {activeTab === 'maintenance' && <MaintenanceTab data={data} />}
        {activeTab === 'inventory' && <InventoryTab data={data} />}
        {activeTab === 'analytics' && <AnalyticsTab data={data} />}
      </main>
    </div>
  );
}
