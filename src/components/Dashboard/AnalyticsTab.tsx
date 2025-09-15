import { DashboardData } from '../../types/dashboard';

interface AnalyticsTabProps {
  data: DashboardData;
}

export default function AnalyticsTab({ data }: AnalyticsTabProps) {
  // Datos para gráficos simples sin Chart.js - adaptado para equipos por cliente
  const equipmentData = data.equipos.map(e => ({
    name: e.cliente.split(' ')[0], // Usar nombre del cliente
    value: e.promedioHorasUso,
    critical: e.equiposCriticos > 0,
    totalEquipos: e.totalEquipos
  }));

  const maxHours = Math.max(...equipmentData.map(e => e.value));

  const topParts = data.repuestos
    .filter(r => r.usado > 0)
    .sort((a, b) => b.usado - a.usado)
    .slice(0, 6);

  const totalUsage = topParts.reduce((sum, p) => sum + p.usado, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
        📈 Análisis y Reportes
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Uso de Equipos por Día */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Uso de Equipos por Día</h3>
          <div className="space-y-3">
            {equipmentData.map((equipo, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-20 text-sm font-medium text-gray-700 truncate">
                  {equipo.name}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div 
                    className={`h-6 rounded-full ${
                      equipo.critical ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${(equipo.value / maxHours) * 100}%` }}
                  ></div>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                    {equipo.value}h
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Crítico</span>
              </div>
            </div>
          </div>
        </div>

        {/* Repuestos Más Consumidos - Gráfico Circular */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Repuestos Más Consumidos</h3>
          
          {/* Gráfico de barras verticales */}
          <div className="h-64 flex items-end justify-center gap-3 mb-6 bg-gray-50 rounded-lg p-4">
            {topParts.slice(0, 6).map((repuesto, index) => {
              const colors = [
                'bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'
              ];
              const maxUsed = Math.max(...topParts.map(r => r.usado));
              const height = maxUsed > 0 ? (repuesto.usado / maxUsed) * 200 : 0;
              
              return (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="text-xs font-bold text-gray-700">{repuesto.usado}</div>
                  <div 
                    className={`w-8 ${colors[index]} rounded-t-lg transition-all duration-700 hover:opacity-80`}
                    style={{ height: `${height}px`, minHeight: '20px' }}
                  ></div>
                  <div className="text-xs text-gray-600 text-center w-12 leading-tight">
                    {repuesto.descripcion.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Estadísticas centrales */}
          <div className="text-center mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{totalUsage}</div>
            <div className="text-sm text-gray-600">Total Consumido</div>
          </div>

          {/* Leyenda mejorada */}
          <div className="space-y-3">
            {topParts.slice(0, 6).map((repuesto, index) => {
              const colors = [
                'bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'
              ];
              const percentage = totalUsage > 0 ? (repuesto.usado / totalUsage) * 100 : 0;
              
              return (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${colors[index]}`}></div>
                    <div>
                      <div className="text-sm font-medium text-gray-800 truncate max-w-[120px]">
                        {repuesto.descripcion.split(' ').slice(0, 2).join(' ')}
                      </div>
                      <div className="text-xs text-gray-500">{percentage.toFixed(1)}% del total</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">{repuesto.usado}</div>
                    <div className="text-xs text-gray-500">veces</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Estadísticas adicionales */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{topParts.length}</div>
                <div className="text-xs text-gray-600">Productos Activos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{Math.round(totalUsage / topParts.length)}</div>
                <div className="text-xs text-gray-600">Promedio Uso</div>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas Clave */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Métricas Clave</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Tiempo promedio entre mantenimientos</span>
              <span className="font-bold text-blue-600">28 días</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Eficiencia operacional</span>
              <span className="font-bold text-blue-600">87%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Costo promedio mantenimiento</span>
              <span className="font-bold text-blue-600">$2,450</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Disponibilidad de equipos</span>
              <span className="font-bold text-blue-600">94%</span>
            </div>
          </div>
        </div>

        {/* Tendencias */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Tendencias</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <span className="text-xl">📈</span>
              <span className="text-gray-700">Reducción 15% en tiempo de mantenimiento</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <span className="text-xl">📉</span>
              <span className="text-gray-700">Aumento 8% en consumo de repuestos</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <span className="text-xl">📈</span>
              <span className="text-gray-700">Mejora 12% en disponibilidad de equipos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
