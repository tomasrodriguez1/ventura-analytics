import { ProximoMantenimiento } from '../../types/dashboard';

interface MantenimientosModalProps {
  mantenimientos: ProximoMantenimiento[];
}

export default function MantenimientosModal({ mantenimientos }: MantenimientosModalProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Mostrando {mantenimientos.length} mantenimientos pendientes
      </div>
      
      <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
        {mantenimientos.map((item, index) => {
          let statusClass = 'bg-green-50 border-green-500';
          let urgencyBadge = 'bg-green-100 text-green-800';
          
          if (item.dias <= 7) {
            statusClass = 'bg-red-50 border-red-500';
            urgencyBadge = 'bg-red-100 text-red-800';
          } else if (item.dias <= 14) {
            statusClass = 'bg-yellow-50 border-yellow-500';
            urgencyBadge = 'bg-yellow-100 text-yellow-800';
          }

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
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-800">{item.equipo}</h4>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${urgencyBadge}`}>
                    {item.dias <= 7 ? 'URGENTE' : item.dias <= 14 ? 'PRÓXIMO' : 'PROGRAMADO'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{item.actividad}</p>
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
              
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-800 block">{item.dias}</span>
                <span className="text-xs text-gray-500 uppercase">días</span>
              </div>
            </div>
          );
        })}
      </div>
      
      {mantenimientos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay mantenimientos pendientes
        </div>
      )}
    </div>
  );
}
