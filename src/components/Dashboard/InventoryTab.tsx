import { DashboardData } from '../../types/dashboard';

interface InventoryTabProps {
  data: DashboardData;
}

export default function InventoryTab({ data }: InventoryTabProps) {
  const getStockStatus = (repuesto: { estado: string }) => {
    if (repuesto.estado === 'sin_stock' || repuesto.estado === 'critico') {
      return 'bg-red-50 border-red-500';
    } else if (repuesto.estado === 'bajo') {
      return 'bg-yellow-50 border-yellow-500';
    }
    return 'bg-green-50 border-green-500';
  };

  const getPriorityBadgeClass = (estado: string) => {
    switch (estado) {
      case 'sin_stock':
      case 'critico':
        return 'bg-red-500 text-white';
      case 'bajo':
        return 'bg-yellow-500 text-white';
      case 'normal':
        return 'bg-blue-500 text-white';
      case 'alto':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Repuestos más utilizados para gráfico
  const topRepuestos = data.repuestos
    .filter(r => r.usado > 0)
    .sort((a, b) => b.usado - a.usado)
    .slice(0, 8);

  const maxUsage = Math.max(...topRepuestos.map(r => r.usado));
  const totalUsage = topRepuestos.reduce((sum, r) => sum + r.usado, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
        📦 Gestión de Inventario
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-[700px]">
        {/* Estado de Stock - Ocupa todo el espacio disponible */}
        <div className="lg:col-span-3 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Estado de Stock</h3>
          <div className="space-y-3 flex-1 overflow-y-auto min-h-[600px]">
            {data.repuestos.map((repuesto, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${getStockStatus(repuesto)}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{repuesto.descripcion}</h4>
                    <div className="flex flex-wrap gap-2 items-center mb-2">
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{repuesto.id}</span>
                      {repuesto.prioridad && (
                        <span className={`text-xs font-bold px-2 py-1 rounded ${getPriorityBadgeClass(repuesto.estado)}`}>
                          {repuesto.prioridad}
                        </span>
                      )}
                    </div>
                    {repuesto.proveedor && (
                      <small className="text-gray-500 text-xs block">
                        {repuesto.proveedor} • {repuesto.leadTime} días
                      </small>
                    )}
                  </div>
                  <div className="flex gap-4 items-center text-center">
                    <div>
                      <span className="text-lg font-bold text-gray-800 block">{repuesto.stock}</span>
                      <span className="text-xs text-gray-500 uppercase">actual</span>
                    </div>
                    <div>
                      <span className="text-lg font-bold text-gray-800 block">{repuesto.puntoReorden}</span>
                      <span className="text-xs text-gray-500 uppercase">punto reorden</span>
                    </div>
                    <div>
                      <span className="text-lg font-bold text-gray-800 block">{repuesto.usado}</span>
                      <span className="text-xs text-gray-500 uppercase">usado</span>
                    </div>
                    {repuesto.porcentajeStock && (
                      <div>
                        <span className="text-lg font-bold text-gray-800 block">{repuesto.porcentajeStock}%</span>
                        <span className="text-xs text-gray-500 uppercase">del mínimo</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Repuestos Más Utilizados - Gráfico mejorado */}
        <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Repuestos Más Utilizados</h3>
          
          {/* Gráfico de barras horizontal */}
          <div className="space-y-4 mb-6">
            {topRepuestos.map((repuesto, index) => {
              const colors = [
                'bg-red-500',
                'bg-blue-500', 
                'bg-yellow-500',
                'bg-green-500',
                'bg-purple-500',
                'bg-orange-500',
                'bg-pink-500',
                'bg-indigo-500'
              ];
              
              const percentage = maxUsage > 0 ? (repuesto.usado / maxUsage) * 100 : 0;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-start gap-2 flex-1">
                      <div className={`w-3 h-3 rounded-full ${colors[index]} mt-1 flex-shrink-0`}></div>
                      <span className="text-sm font-medium text-gray-700 leading-tight">
                        {repuesto.descripcion}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-800 flex-shrink-0">{repuesto.usado}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${colors[index]} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Estadísticas del gráfico */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total consumido:</span>
              <span className="font-bold text-gray-800">{totalUsage} unidades</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Repuesto más usado:</span>
              <span className="font-bold text-gray-800">{topRepuestos[0]?.usado || 0} veces</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Productos activos:</span>
              <span className="font-bold text-gray-800">{topRepuestos.length}</span>
            </div>
          </div>

          {/* Gráfico circular con SVG */}
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Distribución Visual</h4>
            
            {/* Gráfico circular SVG */}
            <div className="flex justify-center mb-4">
              <svg width="120" height="120" className="transform -rotate-90">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                {topRepuestos.slice(0, 5).map((repuesto, index) => {
                  const colors = ['#ef4444', '#3b82f6', '#eab308', '#10b981', '#8b5cf6'];
                  const percentage = totalUsage > 0 ? (repuesto.usado / totalUsage) * 100 : 0;
                  const circumference = 2 * Math.PI * 50;
                  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                  const previousPercentages = topRepuestos.slice(0, index).reduce((sum, r) => {
                    return sum + (totalUsage > 0 ? (r.usado / totalUsage) * 100 : 0);
                  }, 0);
                  const strokeDashoffset = -((previousPercentages / 100) * circumference);
                  
                  return (
                    <circle
                      key={index}
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke={colors[index]}
                      strokeWidth="8"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-700"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Leyenda del gráfico circular */}
            <div className="grid grid-cols-1 gap-1">
              {topRepuestos.slice(0, 5).map((repuesto, index) => {
                const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500'];
                const percentage = totalUsage > 0 ? ((repuesto.usado / totalUsage) * 100).toFixed(1) : '0';
                
                return (
                  <div key={index} className="flex items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className={`w-2 h-2 rounded-full ${colors[index]} flex-shrink-0`}></div>
                      <span className="text-gray-600 truncate text-xs leading-tight">
                        {repuesto.descripcion.length > 25 
                          ? repuesto.descripcion.substring(0, 25) + '...' 
                          : repuesto.descripcion}
                      </span>
                    </div>
                    <span className="font-medium text-gray-800 flex-shrink-0">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
