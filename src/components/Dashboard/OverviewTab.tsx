import { useState } from 'react';
import { DashboardData } from '../../types/dashboard';
import { useTopEquipment } from '../../hooks/useDashboard';
import Modal from './Modal';
import EquiposModal from './EquiposModal';
import RepuestosModal from './RepuestosModal';
import MantenimientosModal from './MantenimientosModal';

interface OverviewTabProps {
  data: DashboardData;
}

export default function OverviewTab({ data }: OverviewTabProps) {
  // Hook para obtener equipos individuales más ocupados
  const { equipos: topEquipos } = useTopEquipment();
  
  // Estados para los modales
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'equipos_todos' | 'equipos_criticos' | 'repuestos_bajo_stock' | 'mantenimientos_pendientes' | null;
    title: string;
  }>({
    isOpen: false,
    type: null,
    title: ''
  });
  
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

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, title: '' });
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border-l-4 border-red-500 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200"
          onClick={() => openModal('equipos_criticos', 'Equipos Críticos')}
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl">🚨</div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">{data.estadisticas.equiposCriticos}</h3>
              <p className="text-gray-600 font-medium">Equipos Críticos</p>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">Click para ver detalles</div>
        </div>

        <div 
          className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border-l-4 border-yellow-500 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200"
          onClick={() => openModal('mantenimientos_pendientes', 'Mantenimientos Pendientes')}
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl">🔧</div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">{data.estadisticas.mantenimientosPendientes}</h3>
              <p className="text-gray-600 font-medium">Mantenimientos Pendientes</p>
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
              🚨 Alertas Críticas
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
              {data.proximosMantenimientos.slice(0, 5).map((mantenimiento, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div>
                    <h4 className="font-semibold text-gray-800">{mantenimiento.equipo} - {mantenimiento.cliente}</h4>
                    <p className="text-gray-600 text-sm">{mantenimiento.actividad}</p>
                  </div>
                  <div className={`text-center px-4 py-2 rounded-lg ${
                    mantenimiento.dias <= 7 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    <span className="text-xl font-bold block">{mantenimiento.dias}</span>
                    <span className="text-xs uppercase">días</span>
                  </div>
                </div>
              ))}
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
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Promedio horas/día</span>
                <span className="font-bold text-gray-800">{promedioHoras.toFixed(1)}h</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Repuestos críticos</span>
                <span className="font-bold text-red-600">{repuestosCriticos}</span>
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
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              🎯 KPIs Clave
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Disponibilidad equipos</span>
                <span className="font-bold text-green-600">94%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Eficiencia operacional</span>
                <span className="font-bold text-green-600">87%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Rotación inventario</span>
                <span className="font-bold text-gray-800">12.5x/año</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Tiempo prom. reorden</span>
                <span className="font-bold text-gray-800">14 días</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Costo prom. mant.</span>
                <span className="font-bold text-gray-800">$2,450</span>
              </div>
            </div>
          </div>
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
      </Modal>
    </div>
  );
}
