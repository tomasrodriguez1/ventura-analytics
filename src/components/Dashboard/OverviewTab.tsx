import { useState } from 'react';
import { DashboardData, ProximoMantenimiento } from '../../types/dashboard';
import { useTopEquipment } from '../../hooks/useDashboard';
import Modal from './Modal';
import EquiposModal from './EquiposModal';
import RepuestosModal from './RepuestosModal';
import MantenimientosModal from './MantenimientosModal';
import MantenimientoDetalleModal from './MantenimientoDetalleModal';

interface OverviewTabProps {
  data: DashboardData;
}

export default function OverviewTab({ data }: OverviewTabProps) {
  // Hook para obtener equipos individuales más ocupados
  const { equipos: topEquipos } = useTopEquipment();
  
  // Estados para los modales
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'equipos_todos' | 'equipos_criticos' | 'repuestos_bajo_stock' | 'mantenimientos_pendientes' | 'mantenimiento_detalle' | null;
    title: string;
  }>({
    isOpen: false,
    type: null,
    title: ''
  });

  // Estado para el mantenimiento seleccionado
  const [selectedMantenimiento, setSelectedMantenimiento] = useState<ProximoMantenimiento | null>(null);
  
  // Calcular estadísticas adicionales
  const totalStock = data.repuestos.reduce((sum, r) => sum + r.stock, 0);
  const totalUsado = data.repuestos.reduce((sum, r) => sum + r.usado, 0);
  const promedioHoras = data.equipos.length > 0 
    ? data.equipos.reduce((sum, e) => sum + e.promedioHorasUso, 0) / data.equipos.length 
    : 0;
  const clientesUnicos = data.equipos.length;
  const repuestosCriticos = data.repuestos.filter(r => r.stock <= r.puntoReorden).length;
  const mantenimientosUrgentes = data.proximosMantenimientos.filter(m => m.dias <= 7).length;

  // Funciones para abrir modales
  const openModal = (type: typeof modalState.type, title: string) => {
    setModalState({ isOpen: true, type, title });
  };

  const openMantenimientoDetalle = (mantenimiento: ProximoMantenimiento) => {
    setSelectedMantenimiento(mantenimiento);
    setModalState({ 
      isOpen: true, 
      type: 'mantenimiento_detalle', 
      title: `Detalles: ${mantenimiento.equipo}` 
    });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, title: '' });
    setSelectedMantenimiento(null);
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200"
          onClick={() => openModal('equipos_todos', 'Equipos Totales')}
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl">⚙️</div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">{data.estadisticas.totalEquipos}</h3>
              <p className="text-gray-600 font-medium">Equipos Totales</p>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">Click para ver detalles</div>
        </div>

        <div 
          className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border-l-4 border-orange-500 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200"
          onClick={() => openModal('repuestos_bajo_stock', 'Repuestos Bajo Stock')}
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl">📦</div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">{data.estadisticas.repuestosBajoStock}</h3>
              <p className="text-gray-600 font-medium">Repuestos Bajo Stock</p>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">Click para ver detalles</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contenido principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Alertas críticas */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🚨 Alertas Críticas de Stock
            </h2>
            <div className="space-y-3">
              {data.alertas.map((alerta, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    alerta.tipo === 'critico' 
                      ? 'bg-red-50 border-red-500' 
                      : 'bg-yellow-50 border-yellow-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {alerta.tipo === 'critico' ? '🔴' : '⚠️'}
                    </span>
                    <span className="text-gray-800 font-medium">{alerta.mensaje}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Próximos mantenimientos */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              📅 Próximos Mantenimientos
            </h2>
            <div className="space-y-3">
              {data.proximosMantenimientos.slice(0, 5).map((mantenimiento, index) => {
                // Debug: Verificar datos
                console.log(`🔍 Mantenimiento ${index}:`, {
                  equipo: mantenimiento.equipo,
                  tieneRepuestosDetalle: !!mantenimiento.repuestosDetalle,
                  cantidadRepuestos: mantenimiento.repuestosDetalle?.length || 0,
                  repuestosDetalle: mantenimiento.repuestosDetalle
                });
                
                // Calcular estadísticas de repuestos si están disponibles
                const repuestosDisponibles = mantenimiento.repuestosDetalle?.filter(r => r.stockDisponible >= r.cantidadNecesaria).length || 0;
                const totalRepuestos = mantenimiento.repuestosDetalle?.length || 0;
                const tieneRepuestosDetalle = totalRepuestos > 0;
                
                // Determinar colores basados en el estado
                const getEstadoStyles = () => {
                  switch (mantenimiento.estado) {
                    case 'atrasado':
                      return 'bg-red-50 border-red-500';
                    case 'vence_hoy':
                      return 'bg-red-50 border-red-400';
                    case 'critico':
                      return 'bg-orange-50 border-orange-500';
                    case 'proximo':
                      return 'bg-yellow-50 border-yellow-500';
                    case 'planificado':
                    default:
                      return 'bg-blue-50 border-blue-500';
                  }
                };
                
                const getHoverStyles = () => {
                  switch (mantenimiento.estado) {
                    case 'atrasado':
                      return 'hover:bg-red-100';
                    case 'vence_hoy':
                      return 'hover:bg-red-100';
                    case 'critico':
                      return 'hover:bg-orange-100';
                    case 'proximo':
                      return 'hover:bg-yellow-100';
                    case 'planificado':
                    default:
                      return 'hover:bg-blue-100';
                  }
                };
                
                return (
                  <div 
                    key={index} 
                    className={`flex justify-between items-center p-4 rounded-lg border-l-4 transition-all duration-200 ${getEstadoStyles()} ${
                      tieneRepuestosDetalle ? `cursor-pointer hover:shadow-md ${getHoverStyles()}` : ''
                    }`}
                    onClick={tieneRepuestosDetalle ? () => openMantenimientoDetalle(mantenimiento) : undefined}
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{mantenimiento.equipo} - {mantenimiento.cliente}</h4>
                      <p className="text-gray-600 text-sm">{mantenimiento.actividad}</p>
                      
                      {/* Información de repuestos */}
                      {tieneRepuestosDetalle && (
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Repuestos:</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                              repuestosDisponibles === totalRepuestos 
                                ? 'bg-green-100 text-green-700' 
                                : repuestosDisponibles > totalRepuestos / 2
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                            }`}>
                              {repuestosDisponibles} / {totalRepuestos}
                            </span>
                          </div>
                          <div className="text-xs text-blue-600 font-medium">
                            Click para ver detalles →
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Indicador visual de repuestos si están disponibles */}
                      {tieneRepuestosDetalle && (
                        <div className="text-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            repuestosDisponibles === totalRepuestos 
                              ? 'bg-green-500 text-white' 
                              : repuestosDisponibles > totalRepuestos / 2
                                ? 'bg-yellow-500 text-white'
                                : 'bg-red-500 text-white'
                          }`}>
                            {repuestosDisponibles === totalRepuestos ? '✓' : '!'}
                          </div>
                          <span className="text-xs text-gray-500 mt-1 block">Stock</span>
                        </div>
                      )}
                      
                      {/* Días restantes */}
                      <div className={`text-center px-4 py-2 rounded-lg ${
                        mantenimiento.estado === 'atrasado' 
                          ? 'bg-red-100 text-red-800' 
                          : mantenimiento.estado === 'vence_hoy'
                            ? 'bg-red-100 text-red-800'
                            : mantenimiento.estado === 'critico'
                              ? 'bg-orange-100 text-orange-800'
                              : mantenimiento.estado === 'proximo'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                      }`}>
                        <span className="text-xl font-bold block">
                          {mantenimiento.estado === 'atrasado' ? `+${Math.abs(mantenimiento.dias)}` : mantenimiento.dias}
                        </span>
                        <span className="text-xs uppercase">
                          {mantenimiento.estado === 'atrasado' ? 'atrasado' : 'días restantes'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Estadísticas rápidas */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              📊 Estadísticas Rápidas
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Clientes activos</span>
                <span className="font-bold text-green-600">{clientesUnicos}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Stock total repuestos</span>
                <span className="font-bold text-gray-800">{totalStock.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Repuestos consumidos</span>
                <span className="font-bold text-gray-800">{totalUsado}</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Mant. urgentes (&lt;7 días)</span>
                <span className="font-bold text-yellow-600">{mantenimientosUrgentes}</span>
              </div>
            </div>
          </div>

          {/* Equipos top */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              ⚙️ Equipos Más Ocupados
            </h3>
            <div className="space-y-2">
              {topEquipos.slice(0, 6).map((equipo, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800 text-sm">{equipo.modelo}</div>
                    <small className="text-gray-600">{equipo.cliente}</small>
                    {equipo.critico && (
                      <span className="ml-1 text-xs bg-red-100 text-red-700 px-1 rounded">CRÍTICO</span>
                    )}
                  </div>
                  <div className="text-blue-600 font-semibold text-sm">
                    {equipo.horasUso}h/día
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KPIs */}
          
        </div>
      </div>

      {/* Modales */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
      >
        {modalState.type === 'equipos_todos' && (
          <EquiposModal equipos={topEquipos} type="todos" />
        )}
        {modalState.type === 'equipos_criticos' && (
          <EquiposModal equipos={topEquipos} type="criticos" />
        )}
        {modalState.type === 'repuestos_bajo_stock' && (
          <RepuestosModal repuestos={data.repuestos} />
        )}
        {modalState.type === 'mantenimientos_pendientes' && (
          <MantenimientosModal mantenimientos={data.proximosMantenimientos} />
        )}
        {modalState.type === 'mantenimiento_detalle' && selectedMantenimiento && (
          <MantenimientoDetalleModal mantenimiento={selectedMantenimiento} />
        )}
      </Modal>
    </div>
  );
}

