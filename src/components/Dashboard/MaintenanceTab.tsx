import { DashboardData } from '../../types/dashboard';

interface MaintenanceTabProps {
  data: DashboardData;
}

export default function MaintenanceTab({ data }: MaintenanceTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
        🔧 Gestión de Mantenimiento
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipos por Cliente */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Equipos por Cliente</h3>
          <div className="space-y-3">
            {data.equipos.map((equipo, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-lg">{equipo.cliente}</h4>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{equipo.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-blue-600 font-bold text-2xl">{equipo.totalEquipos}</span>
                    <div className="text-xs text-gray-500">equipos</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center">
                    <span className="text-red-600 font-semibold text-lg">{equipo.equiposCriticos}</span>
                    <div className="text-xs text-gray-500">críticos</div>
                  </div>
                  <div className="text-center">
                    <span className="text-green-600 font-semibold text-lg">{equipo.promedioHorasUso}h</span>
                    <div className="text-xs text-gray-500">promedio/día</div>
                  </div>
                </div>
                
                <div className="border-t pt-2">
                  <span className="text-xs font-medium text-gray-700">Modelos principales:</span>
                  <p className="text-xs text-gray-600 mt-1 leading-tight">
                    {equipo.modelosPrincipales.length > 60 
                      ? equipo.modelosPrincipales.substring(0, 60) + '...' 
                      : equipo.modelosPrincipales}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendario de Mantenimiento */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Calendario de Mantenimiento</h3>
          <div className="space-y-3">
            {data.proximosMantenimientos.map((item, index) => {
              let statusClass = 'bg-green-50 border-green-500';
              if (item.dias <= 7) statusClass = 'bg-red-50 border-red-500';
              else if (item.dias <= 14) statusClass = 'bg-yellow-50 border-yellow-500';

              return (
                <div key={index} className={`flex items-center gap-4 p-4 rounded-lg border-l-4 ${statusClass}`}>
                  <div className="text-center min-w-[60px]">
                    <span className="text-2xl font-bold text-gray-800 block">
                      {new Date(item.fecha).getDate()}
                    </span>
                    <span className="text-xs text-gray-600 uppercase">
                      {new Date(item.fecha).toLocaleDateString('es-ES', { month: 'short' })}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.equipo}</h4>
                    <p className="text-gray-600 text-sm">{item.actividad}</p>
                    <span className="text-xs text-gray-500">{item.cliente}</span>
                    
                    {/* Repuestos necesarios */}
                    {item.repuestos && item.repuestos.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs font-medium text-blue-700">Repuestos necesarios:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.repuestos.map((repuesto, repIndex) => (
                            <span 
                              key={repIndex}
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                            >
                              {repuesto}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
