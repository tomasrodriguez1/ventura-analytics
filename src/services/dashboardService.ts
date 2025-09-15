import { DashboardData } from '../types/dashboard';

// Datos de ejemplo para demostración
const MOCK_DATA: DashboardData = {
  alertas: [
    { 
      tipo: 'critico', 
      mensaje: 'Stock CRÍTICO: Bomba de combustible Sandvik (3/5 - 60.0%)', 
      repuesto: 'RPT-004',
      stock_actual: 3,
      punto_reorden: 5,
      porcentaje: 60.0
    },
    { 
      tipo: 'advertencia', 
      mensaje: 'Stock BAJO: Kit pastillas de freno CAT 777F (6/8 - 75.0%)', 
      repuesto: 'RPT-002',
      stock_actual: 6,
      punto_reorden: 8,
      porcentaje: 75.0
    },
    { 
      tipo: 'critico', 
      mensaje: 'Mantenimiento VENCIDO: Servicio excavadora - 4 días de retraso', 
      mantenimiento: 'CAL-0005',
      dias_retraso: 4
    },
    { 
      tipo: 'advertencia', 
      mensaje: 'Mantenimiento URGENTE: Servicio cargador frontal - 2 días restantes', 
      mantenimiento: 'CAL-0004',
      dias_restantes: 2
    }
  ],
  proximosMantenimientos: [
    { 
      equipo: 'EQ-3001', 
      cliente: 'Minera Los Andes', 
      actividad: 'Servicio excavadora', 
      dias: 4, 
      fecha: '2025-09-14',
      repuestos: ['Filtro de aceite hidráulico', 'Sello hidráulico principal', 'Correa de ventilador']
    },
    { 
      equipo: 'EQ-3004', 
      cliente: 'Minera Los Andes', 
      actividad: 'Servicio cargador frontal', 
      dias: 28, 
      fecha: '2025-10-08',
      repuestos: ['Filtro de aire', 'Pastillas de freno', 'Aceite de transmisión']
    },
    { 
      equipo: 'EQ-3002', 
      cliente: 'Minera Patagónica', 
      actividad: 'Servicio camión minero', 
      dias: 29, 
      fecha: '2025-10-09',
      repuestos: ['Filtro de combustible', 'Bujías de precalentamiento', 'Filtro de aceite motor']
    }
  ],
  equipos: [
    { 
      id: 'CLI-001', 
      cliente: 'Minera Los Andes', 
      totalEquipos: 15, 
      equiposCriticos: 8, 
      promedioHorasUso: 12,
      modelosPrincipales: 'CAT 320D, Komatsu PC400, Volvo EC380'
    },
    { 
      id: 'CLI-002', 
      cliente: 'Minera Patagónica', 
      totalEquipos: 12, 
      equiposCriticos: 5, 
      promedioHorasUso: 10,
      modelosPrincipales: 'Komatsu HD785-7, CAT 777D, Liebherr T282C'
    },
    { 
      id: 'CLI-003', 
      cliente: 'Ventura Mining', 
      totalEquipos: 8, 
      equiposCriticos: 3, 
      promedioHorasUso: 11,
      modelosPrincipales: 'Hitachi EX1200, CAT 6020B, Komatsu PC1250'
    }
  ],
  repuestos: [
    { 
      id: 'RPT-001', 
      descripcion: 'Filtro de aceite hidráulico', 
      stock: 18, 
      puntoReorden: 10, 
      usado: 8,
      proveedor: 'Suministros Mineros S.A.',
      leadTime: 7,
      estado: 'alto',
      prioridad: 'ALTO',
      porcentajeStock: 180.0,
      necesitaReorden: false
    },
    { 
      id: 'RPT-002', 
      descripcion: 'Kit pastillas de freno CAT 777F', 
      stock: 6, 
      puntoReorden: 8, 
      usado: 3,
      proveedor: 'Partes y Servicios CAT',
      leadTime: 14,
      estado: 'bajo',
      prioridad: 'BAJO',
      porcentajeStock: 75.0,
      necesitaReorden: true
    },
    { 
      id: 'RPT-003', 
      descripcion: 'Sensor de temperatura Volvo L120H', 
      stock: 22, 
      puntoReorden: 12, 
      usado: 6,
      proveedor: 'ElectroRepuestos Chile',
      leadTime: 5,
      estado: 'alto',
      prioridad: 'ALTO',
      porcentajeStock: 183.3,
      necesitaReorden: false
    },
    { 
      id: 'RPT-004', 
      descripcion: 'Bomba de combustible Sandvik', 
      stock: 3, 
      puntoReorden: 5, 
      usado: 2,
      proveedor: 'Repuestos Sandvik Ltda.',
      leadTime: 21,
      estado: 'critico',
      prioridad: 'CRÍTICO',
      porcentajeStock: 60.0,
      necesitaReorden: true
    }
  ],
  estadisticas: {
    totalEquipos: 8,
    equiposCriticos: 8,
    mantenimientosPendientes: 5,
    repuestosBajoStock: 3
  }
};

class DashboardService {
  private baseUrl = '/api/dashboard';

  async getDashboardData(): Promise<DashboardData> {
    try {
      const response = await fetch(`${this.baseUrl}/dashboard-data`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Datos obtenidos de la base de datos');
        return data;
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      console.log('⚠️ Usando datos de ejemplo para demostración');
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_DATA;
    }
  }

  async getEquipmentData() {
    try {
      const response = await fetch(`${this.baseUrl}/equipment`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Equipos obtenidos de la base de datos');
        return data;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    } catch (error) {
      console.error('Error fetching equipment data:', error);
      console.log('⚠️ Usando datos de ejemplo para equipos');
      return MOCK_DATA.equipos;
    }
  }

  async getInventoryData() {
    try {
      const response = await fetch(`${this.baseUrl}/inventory`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Inventario obtenido de la base de datos');
        return data;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      console.log('⚠️ Usando datos de ejemplo para inventario');
      return MOCK_DATA.repuestos;
    }
  }

  async getMaintenanceData() {
    try {
      const response = await fetch(`${this.baseUrl}/maintenance`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Mantenimientos obtenidos de la base de datos');
        return data;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    } catch (error) {
      console.error('Error fetching maintenance data:', error);
      console.log('⚠️ Usando datos de ejemplo para mantenimientos');
      return MOCK_DATA.proximosMantenimientos;
    }
  }

  async getAnalyticsData() {
    try {
      const response = await fetch(`${this.baseUrl}/analytics`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Análisis obtenidos de la base de datos');
        return data;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      console.log('⚠️ Usando datos de ejemplo para análisis');
      return {
        equipos: MOCK_DATA.equipos,
        repuestos: MOCK_DATA.repuestos,
        metricas: {
          promedioDiasMantenimiento: 28.0,
          totalMantenimientosProgramados: 5,
          eficienciaOperacional: 87,
          disponibilidadEquipos: 94
        }
      };
    }
  }

  async getTopEquipment() {
    try {
      const response = await fetch(`${this.baseUrl}/top-equipment`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Equipos top obtenidos de la base de datos');
        return data;
      }
      console.error(`Error HTTP ${response.status}: ${response.statusText}`);
      const errorText = await response.text();
      console.error('Response body:', errorText);
      throw new Error(`Error HTTP: ${response.status}`);
    } catch (error) {
      console.error('Error fetching top equipment data:', error);
      console.log('⚠️ Usando datos de ejemplo para equipos top en servicio');
      // No lanzar el error, en su lugar devolver datos de ejemplo
      return [
        { id: 'EQ-3001', modelo: 'CAT 320D', cliente: 'Minera Los Andes', horasUso: 12, critico: true },
        { id: 'EQ-3002', modelo: 'Komatsu HD785-7', cliente: 'Minera Patagónica', horasUso: 11, critico: true },
        { id: 'EQ-3005', modelo: 'Hitachi EX1200', cliente: 'Ventura Mining', horasUso: 10, critico: true },
        { id: 'EQ-3010', modelo: 'CAT D10T2', cliente: 'Minera Sur', horasUso: 9, critico: false },
        { id: 'EQ-3015', modelo: 'Volvo L350H', cliente: 'Minera Los Andes', horasUso: 8, critico: false }
      ];
    }
  }
}

export const dashboardService = new DashboardService();
