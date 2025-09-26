// Tipos TypeScript para el Dashboard Minero

export interface Alerta {
  tipo: 'critico' | 'advertencia';
  mensaje: string;
  repuesto?: string;
  stock_actual?: number;
  punto_reorden?: number;
  porcentaje?: number;
  mantenimiento?: string;
  dias_retraso?: number;
  dias_restantes?: number;
}

export interface RepuestoNecesario {
  id: string;
  descripcion: string;
  cantidadNecesaria: number;
  stockDisponible: number;
  proveedor?: string;
  leadTime?: number;
}

export interface ProximoMantenimiento {
  equipo: string;
  cliente: string;
  actividad: string;
  dias: number;
  fecha: string;
  estado?: 'atrasado' | 'vence_hoy' | 'critico' | 'proximo' | 'planificado';
  repuestos?: string[]; // Lista de nombres de repuestos necesarios
  repuestosDetalle?: RepuestoNecesario[]; // Información detallada de repuestos
}

export interface Equipo {
  id: string;
  cliente: string;
  totalEquipos: number;
  equiposCriticos: number;
  promedioHorasUso: number;
  modelosPrincipales: string;
}

export interface EquipoIndividual {
  id: string;
  modelo: string;
  fabricante?: string;
  cliente: string;
  horasUso: number;
  critico: boolean;
}

export interface Repuesto {
  id: string;
  descripcion: string;
  stock: number;
  puntoReorden: number;
  usado: number;
  proveedor?: string;
  leadTime?: number;
  estado: 'sin_stock' | 'critico' | 'bajo' | 'normal' | 'alto';
  prioridad: 'URGENTE' | 'CRÍTICO' | 'BAJO' | 'NORMAL' | 'ALTO';
  porcentajeStock: number;
  necesitaReorden: boolean;
}

export interface Estadisticas {
  totalEquipos: number;
  equiposCriticos: number;
  mantenimientosPendientes: number;
  repuestosBajoStock: number;
}

export interface DashboardData {
  alertas: Alerta[];
  proximosMantenimientos: ProximoMantenimiento[];
  equipos: Equipo[];
  repuestos: Repuesto[];
  estadisticas: Estadisticas;
}

export type TabType = 'overview' | 'maintenance' | 'inventory' | 'analytics';
