import { Repuesto } from '../../types/dashboard';

interface RepuestosModalProps {
  repuestos: Repuesto[];
}

export default function RepuestosModal({ repuestos }: RepuestosModalProps) {
  const filteredRepuestos = repuestos.filter(r => r.stock <= r.puntoReorden);

  const getStockStatus = (repuesto: Repuesto) => {
    const percentage = (repuesto.stock / repuesto.puntoReorden) * 100;
    if (percentage <= 25) return { class: 'bg-red-50 border-red-500', status: 'CRÍTICO', color: 'text-red-700' };
    if (percentage <= 50) return { class: 'bg-yellow-50 border-yellow-500', status: 'BAJO', color: 'text-yellow-700' };
    return { class: 'bg-green-50 border-green-500', status: 'NORMAL', color: 'text-green-700' };
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Mostrando {filteredRepuestos.length} repuestos con stock en o por debajo del punto de reorden
      </div>
      
      <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
        {filteredRepuestos.map((repuesto, index) => {
          const status = getStockStatus(repuesto);
          const percentage = ((repuesto.stock / repuesto.puntoReorden) * 100).toFixed(1);
          
          return (
            <div 
              key={index} 
              className={`p-4 rounded-lg border-l-4 ${status.class}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">{repuesto.descripcion}</h4>
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{repuesto.id}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${status.color} bg-current bg-opacity-10`}>
                      {status.status}
                    </span>
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
                    <span className="text-xs text-gray-500 uppercase">mínimo</span>
                  </div>
                  <div>
                    <span className="text-lg font-bold text-gray-800 block">{repuesto.usado}</span>
                    <span className="text-xs text-gray-500 uppercase">usado</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Stock actual vs punto de reorden</span>
                  <span>{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      parseFloat(percentage) <= 25 ? 'bg-red-500' :
                      parseFloat(percentage) <= 50 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(100, parseFloat(percentage))}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredRepuestos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay repuestos con stock por debajo del punto de reorden
        </div>
      )}
    </div>
  );
}
