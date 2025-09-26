import { NextResponse } from 'next/server';
import { query } from '../../../../src/lib/database';
import { DashboardData } from '../../../../src/types/dashboard';

export async function GET() {
  try {
    // Obtener alertas críticas
    const alertas = await getCriticalAlerts();
    
    // Obtener próximos mantenimientos
    const proximosMantenimientos = await getUpcomingMaintenance();
    
    // Obtener información de equipos
    const equipos = await getEquipmentInfo();
    
    // Obtener información de repuestos
    const repuestos = await getPartsInfo();
    
    // Calcular estadísticas
    const estadisticas = await calculateStatistics();
    
    const dashboardData: DashboardData = {
      alertas,
      proximosMantenimientos,
      equipos,
      repuestos,
      estadisticas
    };
    
    return NextResponse.json(dashboardData);
    
  } catch (error) {
    console.error('Error obteniendo datos del dashboard:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

async function getCriticalAlerts() {
  const alertas = [];
  
  try {
    // Alertas de stock bajo usando punto_reorden
    const repuestosQuery = `
      SELECT repuesto_id, descripcion, stock_u, punto_reorden
      FROM repuesto 
      WHERE stock_u <= punto_reorden
      ORDER BY (stock_u::float / punto_reorden::float) ASC
    `;
    
    const repuestosResult = await query(repuestosQuery);
    
    for (const repuesto of repuestosResult.rows) {
      const stock = parseInt(repuesto.stock_u) || 0;
      const puntoReorden = parseInt(repuesto.punto_reorden) || 0;
      const porcentaje = puntoReorden > 0 
        ? Math.round((stock / puntoReorden) * 100) 
        : 0;
      
      let tipo: 'critico' | 'advertencia';
      let nivel: string;
      
      if (stock <= puntoReorden * 0.5) {
        tipo = 'critico';
        nivel = 'CRÍTICO';
      } else {
        tipo = 'advertencia';
        nivel = 'BAJO';
      }
      
      alertas.push({
        tipo,
        mensaje: `Stock ${nivel}: ${repuesto.descripcion} (${stock}/${puntoReorden} - ${porcentaje}%)`,
        repuesto: repuesto.repuesto_id,
        stock_actual: stock,
        punto_reorden: puntoReorden,
        porcentaje
      });
    }
    
    // Alertas de mantenimientos vencidos
    const mantenimientosVencidosQuery = `
      SELECT cal_id, actividad, dias_restantes_est
      FROM calendario_repuestos_plan 
      WHERE dias_restantes_est < 0
      ORDER BY dias_restantes_est ASC
      LIMIT 5
    `;
    
    const mantenimientosVencidos = await query(mantenimientosVencidosQuery);
    
    for (const mantenimiento of mantenimientosVencidos.rows) {
      const dias_retraso = Math.abs(parseInt(mantenimiento.dias_restantes_est) || 0);
      alertas.push({
        tipo: 'critico' as const,
        mensaje: `Mantenimiento VENCIDO: ${mantenimiento.actividad} - ${dias_retraso} días de retraso`,
        mantenimiento: mantenimiento.cal_id,
        dias_retraso
      });
    }
    
    // Alertas de mantenimientos próximos (menos de 3 días)
    const mantenimientosUrgentesQuery = `
      SELECT cal_id, actividad, dias_restantes_est
      FROM calendario_repuestos_plan 
      WHERE dias_restantes_est BETWEEN 0 AND 3
      ORDER BY dias_restantes_est ASC
      LIMIT 5
    `;
    
    const mantenimientosUrgentes = await query(mantenimientosUrgentesQuery);
    
    for (const mantenimiento of mantenimientosUrgentes.rows) {
      alertas.push({
        tipo: 'advertencia' as const,
        mensaje: `Mantenimiento URGENTE: ${mantenimiento.actividad} - ${mantenimiento.dias_restantes_est} días restantes`,
        mantenimiento: mantenimiento.cal_id,
        dias_restantes: mantenimiento.dias_restantes_est
      });
    }
    
  } catch (error) {
    console.error('Error obteniendo alertas críticas:', error);
    return [];
  }
  
  return alertas;
}

async function getUpcomingMaintenance() {
  try {
    const maintenanceQuery = `
       SELECT
        crp.cal_id,
        crp.peh_id,
        crp.cliente_id,
        c.nombre AS cliente_nombre,
        e.equipo_id,
        e.modelo AS equipo_modelo,
        crp.actividad,
        crp.dias_restantes_est,
        crp.due_date_est,
        CASE
          WHEN crp.dias_restantes_est < 0 THEN 'atrasado'
          WHEN crp.dias_restantes_est = 0 THEN 'vence_hoy'
          WHEN crp.dias_restantes_est <= 7 THEN 'critico'
          WHEN crp.dias_restantes_est <= 14 THEN 'proximo'
          ELSE 'planificado'
        END AS estado_programacion,
        COALESCE(
          json_agg(
             DISTINCT jsonb_build_object(
               'repuesto_id', r.repuesto_id,
               'descripcion', r.descripcion,
               'stock_u', r.stock_u,
               'punto_reorden', r.punto_reorden,
               'lead_time_dias', r.lead_time_dias,
               'proveedor', r.proveedor
             )
          ) FILTER (WHERE r.repuesto_id IS NOT NULL),
          '[]'::json
        ) AS repuestos
      FROM calendario_repuestos_plan crp
      JOIN cliente c ON crp.cliente_id = c.cliente_id
      JOIN plan_equipo_hito peh ON crp.peh_id = peh.peh_id
      JOIN equipo e ON peh.equipo_id = e.equipo_id
      LEFT JOIN plan_equipo_hito_repuesto pehr ON peh.peh_id = pehr.peh_id
      LEFT JOIN repuesto r ON pehr.repuesto_id = r.repuesto_id
      WHERE crp.dias_restantes_est >= 0
      GROUP BY
        crp.cal_id,
        crp.peh_id,
        crp.cliente_id,
        c.nombre,
        e.equipo_id,
        e.modelo,
        crp.actividad,
        crp.dias_restantes_est,
        crp.due_date_est
      ORDER BY crp.dias_restantes_est ASC, crp.due_date_est ASC
      LIMIT 10
    `;
    
    const result = await query(maintenanceQuery);
    
    return result.rows.map(row => {
      // Parsear el JSON de repuestos de forma más robusta
      let repuestosData = [];
      
      if (row.repuestos) {
        try {
          // Si ya es un array u objeto, usarlo directamente
          if (Array.isArray(row.repuestos)) {
            repuestosData = row.repuestos;
          } else if (typeof row.repuestos === 'object') {
            repuestosData = [row.repuestos];
          } else if (typeof row.repuestos === 'string') {
            // Si es string, intentar parsearlo
            const parsed = JSON.parse(row.repuestos);
            repuestosData = Array.isArray(parsed) ? parsed : [parsed];
          } else {
            repuestosData = [];
          }
        } catch (error) {
          console.error('Error parsing repuestos:', error);
          repuestosData = [];
        }
      }
      
      // Generar lista simple de nombres de repuestos
      const repuestos = repuestosData.map((r: { descripcion: string }) => r.descripcion);
      
      // Generar repuestosDetalle con información completa
      const repuestosDetalle = repuestosData.map((repuesto: { repuesto_id: string; descripcion: string; stock_u: string; lead_time_dias: string; proveedor?: string }) => {
        const stockDisponible = parseInt(repuesto.stock_u) || 0;
        const leadTime = parseInt(repuesto.lead_time_dias) || 0;
        
        // Para mantener compatibilidad, asumimos cantidad necesaria = 1
        // (esto se puede ajustar si la BD incluye cantidad específica)
        const cantidadNecesaria = 1;
        
        return {
          id: repuesto.repuesto_id,
          descripcion: repuesto.descripcion,
          cantidadNecesaria,
          stockDisponible,
          proveedor: repuesto.proveedor || 'Sin proveedor',
          leadTime
        };
      });
      
      return {
        equipo: row.equipo_modelo || 'Sin modelo',
        cliente: row.cliente_nombre || 'Sin cliente',
        actividad: row.actividad || 'Sin actividad',
        dias: parseInt(row.dias_restantes_est) || 0,
        fecha: row.due_date_est ? new Date(row.due_date_est).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        estado: row.estado_programacion || 'planificado',
        repuestos,
        repuestosDetalle: repuestosDetalle.length > 0 ? repuestosDetalle : undefined
      };
    });
    
  } catch (error) {
    console.error('Error obteniendo próximos mantenimientos:', error);
    return [];
  }
}

async function getEquipmentInfo() {
  try {
    const equipmentQuery = `
      SELECT 
        c.nombre as cliente_nombre,
        c.cliente_id,
        COUNT(e.equipo_id) as total_equipos,
        COUNT(CASE WHEN e.critico = true THEN 1 END) as equipos_criticos,
        AVG(e.tasa_uso_horas_dia) as promedio_horas_uso,
        STRING_AGG(DISTINCT e.modelo, ', ') as modelos_principales
      FROM cliente c
      LEFT JOIN cliente_equipo ce ON c.cliente_id = ce.cliente_id
      LEFT JOIN equipo e ON ce.equipo_id = e.equipo_id
      GROUP BY c.cliente_id, c.nombre
      HAVING COUNT(e.equipo_id) > 0
      ORDER BY COUNT(e.equipo_id) DESC, COUNT(CASE WHEN e.critico = true THEN 1 END) DESC
      LIMIT 10
    `;
    
    const result = await query(equipmentQuery);
    
    return result.rows.map(row => ({
      id: row.cliente_id,
      cliente: row.cliente_nombre || 'Sin nombre',
      totalEquipos: parseInt(row.total_equipos) || 0,
      equiposCriticos: parseInt(row.equipos_criticos) || 0,
      promedioHorasUso: Math.round(parseFloat(row.promedio_horas_uso) || 0),
      modelosPrincipales: row.modelos_principales || 'Sin modelos'
    }));
    
  } catch (error) {
    console.error('Error obteniendo información de equipos:', error);
    return [];
  }
}

async function getPartsInfo() {
  try {
    const partsQuery = `
      SELECT 
        r.repuesto_id,
        r.descripcion,
        r.stock_u,
        r.punto_reorden,
        r.proveedor,
        r.lead_time_dias,
        COALESCE(usage.veces_usado, 0) as veces_usado
      FROM repuesto r
      LEFT JOIN (
        SELECT 
          repuesto_id, 
          COUNT(*) as veces_usado
        FROM historial_mantenimiento_repuesto 
        GROUP BY repuesto_id
      ) usage ON r.repuesto_id = usage.repuesto_id
      ORDER BY 
        CASE 
          WHEN r.stock_u <= r.punto_reorden * 0.5 THEN 1
          WHEN r.stock_u <= r.punto_reorden THEN 2
          ELSE 3
        END,
        usage.veces_usado DESC NULLS LAST
      LIMIT 50
    `;
    
    const result = await query(partsQuery);
    
    return result.rows.map(row => {
      // Convertir a números explícitamente
      const stock = parseInt(row.stock_u) || 0;
      const puntoReorden = parseInt(row.punto_reorden) || 0;
      const usado = parseInt(row.veces_usado) || 0;
      const leadTime = parseInt(row.lead_time_dias) || 0;
      
      const stockRatio = puntoReorden > 0 ? stock / puntoReorden : 1;
      
      let estado: 'sin_stock' | 'critico' | 'bajo' | 'normal' | 'alto';
      let prioridad: 'URGENTE' | 'CRÍTICO' | 'BAJO' | 'NORMAL' | 'ALTO';
      
      if (stock === 0) {
        estado = 'sin_stock';
        prioridad = 'URGENTE';
      } else if (stock <= puntoReorden * 0.5) {
        estado = 'critico';
        prioridad = 'CRÍTICO';
      } else if (stock <= puntoReorden) {
        estado = 'bajo';
        prioridad = 'BAJO';
      } else if (stock <= puntoReorden * 1.5) {
        estado = 'normal';
        prioridad = 'NORMAL';
      } else {
        estado = 'alto';
        prioridad = 'ALTO';
      }
      
      return {
        id: row.repuesto_id,
        descripcion: row.descripcion || 'Sin descripción',
        stock,
        puntoReorden,
        proveedor: row.proveedor,
        leadTime,
        usado,
        estado,
        prioridad,
        porcentajeStock: Math.round(stockRatio * 100),
        necesitaReorden: stock <= puntoReorden
      };
    });
    
  } catch (error) {
    console.error('Error obteniendo información de repuestos:', error);
    return [];
  }
}

async function calculateStatistics() {
  try {
    const statsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM equipo) as total_equipos,
        (SELECT COUNT(*) FROM equipo WHERE critico = true) as equipos_criticos,
        (SELECT COUNT(*) FROM calendario_repuestos_plan WHERE dias_restantes_est >= 0) as mantenimientos_pendientes,
        (SELECT COUNT(*) FROM repuesto WHERE stock_u <= punto_reorden) as repuestos_bajo_stock
    `;
    
    const result = await query(statsQuery);
    const row = result.rows[0];
    
    return {
      totalEquipos: parseInt(row.total_equipos) || 0,
      equiposCriticos: parseInt(row.equipos_criticos) || 0,
      mantenimientosPendientes: parseInt(row.mantenimientos_pendientes) || 0,
      repuestosBajoStock: parseInt(row.repuestos_bajo_stock) || 0
    };
    
  } catch (error) {
    console.error('Error calculando estadísticas:', error);
    return {
      totalEquipos: 0,
      equiposCriticos: 0,
      mantenimientosPendientes: 0,
      repuestosBajoStock: 0
    };
  }
}
