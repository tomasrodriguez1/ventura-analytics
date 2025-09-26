import { ProximoMantenimiento, RepuestoNecesario } from '../../types/dashboard';

interface MantenimientoDetalleModalProps {
  mantenimiento: ProximoMantenimiento;
}

export default function MantenimientoDetalleModal({ mantenimiento }: MantenimientoDetalleModalProps) {
  const getStockStatus = (repuesto: RepuestoNecesario) => {
    const ratio = repuesto.stockDisponible / repuesto.cantidadNecesaria;
    if (ratio < 0.5) return { class: 'bg-red-50 border-red-500', status: 'INSUFICIENTE', color: 'text-red-700' };
    if (ratio < 1) return { class: 'bg-yellow-50 border-yellow-500', status: 'JUSTO', color: 'text-yellow-700' };
    return { class: 'bg-green-50 border-green-500', status: 'SUFICIENTE', color: 'text-green-700' };
  };

  const getUrgencyClass = () => {
    switch (mantenimiento.estado) {
      case 'atrasado':
        return 'bg-red-100 text-red-800';
      case 'vence_hoy':
        return 'bg-red-100 text-red-800';
      case 'critico':
        return 'bg-orange-100 text-orange-800';
      case 'proximo':
        return 'bg-yellow-100 text-yellow-800';
      case 'planificado':
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getEstadoLabel = () => {
    switch (mantenimiento.estado) {
      case 'atrasado':
        return 'ATRASADO';
      case 'vence_hoy':
        return 'VENCE HOY';
      case 'critico':
        return 'CRÍTICO';
      case 'proximo':
        return 'PRÓXIMO';
      case 'planificado':
      default:
        return 'PLANIFICADO';
    }
  };

  return (
    <div className="space-y-6">
      {/* Información del mantenimiento */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{mantenimiento.equipo}</h3>
            <p className="text-gray-600">{mantenimiento.cliente}</p>
            <p className="text-sm text-gray-500 mt-1">{mantenimiento.actividad}</p>
          </div>
          <div className="text-center">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${getUrgencyClass()}`}>
              {getEstadoLabel()}
            </span>
            <div className="mt-2">
              <span className="text-2xl font-bold text-gray-800 block">
                {mantenimiento.estado === 'atrasado' ? `+${Math.abs(mantenimiento.dias)}` : mantenimiento.dias}
              </span>
              <span className="text-xs text-gray-500 uppercase">
                {mantenimiento.estado === 'atrasado' ? 'días atrasado' : 'días restantes'}
              </span>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Fecha programada:</span> {new Date(mantenimiento.fecha).toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Repuestos necesarios */}
      {mantenimiento.repuestosDetalle && mantenimiento.repuestosDetalle.length > 0 ? (
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            🔧 Repuestos Necesarios
          </h4>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {mantenimiento.repuestosDetalle.map((repuesto, index) => {
              const status = getStockStatus(repuesto);
              const ratio = repuesto.stockDisponible / repuesto.cantidadNecesaria;
              
              return (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-l-4 ${status.class}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800 mb-1">{repuesto.descripcion}</h5>
                      <div className="flex flex-wrap gap-2 items-center mb-2">
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{repuesto.id}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${status.color} bg-current bg-opacity-10`}>
                          {status.status}
                        </span>
                      </div>
                      {repuesto.proveedor && (
                        <small className="text-gray-500 text-xs block">
                          Proveedor: {repuesto.proveedor} • Lead time: {repuesto.leadTime} días
                        </small>
                      )}
                    </div>
                    <div className="flex gap-4 items-center text-center">
                      <div>
                        <span className="text-lg font-bold text-gray-800 block">{repuesto.stockDisponible}</span>
                        <span className="text-xs text-gray-500 uppercase">disponible</span>
                      </div>
                      <div className="text-gray-400">/</div>
                      <div>
                        <span className="text-lg font-bold text-gray-800 block">{repuesto.cantidadNecesaria}</span>
                        <span className="text-xs text-gray-500 uppercase">necesario</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Barra de progreso del stock */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Stock disponible vs necesario</span>
                      <span>{(ratio * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          ratio < 0.5 ? 'bg-red-500' :
                          ratio < 1 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(100, ratio * 100)}%` }}
                      ></div>
                    </div>
                    {ratio < 1 && (
                      <p className="text-xs text-red-600 mt-1 font-medium">
                        ⚠️ Faltan {repuesto.cantidadNecesaria - repuesto.stockDisponible} unidades
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No se han especificado repuestos necesarios para este mantenimiento</p>
        </div>
      )}

      {/* Resumen de disponibilidad */}
      {mantenimiento.repuestosDetalle && mantenimiento.repuestosDetalle.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h5 className="font-semibold text-blue-800 mb-2">📊 Resumen de Disponibilidad</h5>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-2xl font-bold text-green-600 block">
                {mantenimiento.repuestosDetalle.filter(r => r.stockDisponible >= r.cantidadNecesaria).length}
              </span>
              <span className="text-xs text-green-700 uppercase">Suficientes</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-yellow-600 block">
                {mantenimiento.repuestosDetalle.filter(r => r.stockDisponible < r.cantidadNecesaria && r.stockDisponible >= r.cantidadNecesaria * 0.5).length}
              </span>
              <span className="text-xs text-yellow-700 uppercase">Justos</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-red-600 block">
                {mantenimiento.repuestosDetalle.filter(r => r.stockDisponible < r.cantidadNecesaria * 0.5).length}
              </span>
              <span className="text-xs text-red-700 uppercase">Insuficientes</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
