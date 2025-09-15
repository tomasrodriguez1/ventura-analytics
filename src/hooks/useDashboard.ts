import { useState, useEffect, useCallback } from 'react';
import { DashboardData, TabType, EquipoIndividual } from '../types/dashboard';
import { dashboardService } from '../services/dashboardService';

export function useDashboard() {
  const [data, setData] = useState<DashboardData>({
    alertas: [],
    proximosMantenimientos: [],
    equipos: [],
    repuestos: [],
    estadisticas: {
      totalEquipos: 0,
      equiposCriticos: 0,
      mantenimientosPendientes: 0,
      repuestosBajoStock: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      console.log('🔄 Iniciando carga de datos del dashboard...');
      setLoading(true);
      setError(null);
      const dashboardData = await dashboardService.getDashboardData();
      console.log('✅ Datos del dashboard obtenidos:', dashboardData);
      setData(dashboardData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('❌ Error fetching dashboard data:', err);
      setError('Error al cargar los datos del dashboard');
    } finally {
      console.log('🏁 Finalizando carga de datos del dashboard');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    activeTab,
    setActiveTab,
    lastUpdated,
    refresh: fetchData
  };
}

export function useEquipmentData() {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEquipmentData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getEquipmentData();
      setEquipos(data);
    } catch (err) {
      console.error('Error fetching equipment data:', err);
      setError('Error al cargar los datos de equipos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEquipmentData();
  }, [fetchEquipmentData]);

  return {
    equipos,
    loading,
    error,
    refresh: fetchEquipmentData
  };
}

export function useInventoryData() {
  const [repuestos, setRepuestos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInventoryData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getInventoryData();
      setRepuestos(data);
    } catch (err) {
      console.error('Error fetching inventory data:', err);
      setError('Error al cargar los datos del inventario');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventoryData();
  }, [fetchInventoryData]);

  return {
    repuestos,
    loading,
    error,
    refresh: fetchInventoryData
  };
}

export function useTopEquipment() {
  const [equipos, setEquipos] = useState<EquipoIndividual[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopEquipment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getTopEquipment();
      setEquipos(data || []);
    } catch (err) {
      console.error('Error fetching top equipment data:', err);
      console.log('⚠️ Usando datos de ejemplo para equipos top en hook');
      setError('Error al cargar los datos de equipos top');
      // Usar datos de ejemplo cuando falla
      setEquipos([
        { id: 'EQ-3001', modelo: 'CAT 320D', cliente: 'Minera Los Andes', horasUso: 12, critico: true },
        { id: 'EQ-3002', modelo: 'Komatsu HD785-7', cliente: 'Minera Patagónica', horasUso: 11, critico: true },
        { id: 'EQ-3005', modelo: 'Hitachi EX1200', cliente: 'Ventura Mining', horasUso: 10, critico: true },
        { id: 'EQ-3010', modelo: 'CAT D10T2', cliente: 'Minera Sur', horasUso: 9, critico: false },
        { id: 'EQ-3015', modelo: 'Volvo L350H', cliente: 'Minera Los Andes', horasUso: 8, critico: false }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopEquipment();
  }, [fetchTopEquipment]);

  return {
    equipos,
    loading,
    error,
    refresh: fetchTopEquipment
  };
}
