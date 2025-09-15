import { EquipoIndividual } from '../../types/dashboard';

interface EquiposModalProps {
  equipos: EquipoIndividual[];
  type: 'todos' | 'criticos';
}

export default function EquiposModal({ equipos, type }: EquiposModalProps) {
  const filteredEquipos = type === 'criticos' 
    ? equipos.filter(e => e.critico) 
    : equipos;

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        {type === 'criticos' 
          ? `Mostrando ${filteredEquipos.length} equipos críticos`
          : `Mostrando ${filteredEquipos.length} equipos totales`
        }
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {filteredEquipos.map((equipo, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border ${
              equipo.critico 
                ? 'border-red-200 bg-red-50' 
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  {equipo.modelo}
                  {equipo.critico && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-bold">
                      CRÍTICO
                    </span>
                  )}
                </h4>
                <p className="text-gray-600 text-sm">{equipo.cliente}</p>
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded mt-1 inline-block">
                  {equipo.id}
                </span>
              </div>
              <div className="text-right">
                <span className="text-blue-600 font-bold text-lg">{equipo.horasUso}h</span>
                <div className="text-xs text-gray-500">por día</div>
              </div>
            </div>
            
            {equipo.fabricante && (
              <div className="text-xs text-gray-600 mt-2">
                <span className="font-medium">Fabricante:</span> {equipo.fabricante}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {filteredEquipos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay equipos {type === 'criticos' ? 'críticos' : ''} para mostrar
        </div>
      )}
    </div>
  );
}
