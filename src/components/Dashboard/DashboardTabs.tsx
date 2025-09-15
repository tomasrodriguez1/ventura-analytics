import { TabType } from '../../types/dashboard';

interface DashboardTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function DashboardTabs({ activeTab, setActiveTab }: DashboardTabsProps) {
  const tabs = [
    { id: 'overview', label: 'Resumen', icon: '📊' },
    { id: 'maintenance', label: 'Mantenimiento', icon: '🔧' },
    { id: 'inventory', label: 'Inventario', icon: '📦' },
    { id: 'analytics', label: 'Análisis', icon: '📈' }
  ] as const;

  return (
    <nav className="flex justify-center gap-4 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2
            ${activeTab === tab.id 
              ? 'bg-white text-gray-800 shadow-lg' 
              : 'bg-white/20 text-white hover:bg-white/30'
            }
          `}
          onClick={() => setActiveTab(tab.id as TabType)}
        >
          <span className="text-lg">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
