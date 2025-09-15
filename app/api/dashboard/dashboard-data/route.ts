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
    console.log('⚠️ Usando alertas de ejemplo debido a error de BD');
    // Retornar alertas de ejemplo cuando falla la conexión
    return [
      {
        tipo: 'critico' as const,
        mensaje: 'Stock crítico: Filtro de aceite hidráulico - 18 unidades (180% del mínimo)',
        repuesto: 'RPT-001',
        stock_actual: 18,
        punto_reorden: 10,
        porcentaje: 180
      },
      {
        tipo: 'advertencia' as const,
        mensaje: 'Stock bajo: Kit pastillas de freno CAT 777F - 6 unidades (75% del mínimo)',
        repuesto: 'RPT-002',
        stock_actual: 6,
        punto_reorden: 8,
        porcentaje: 75
      }
    ];
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
        c.nombre as cliente_nombre,
        crp.actividad,
        crp.dias_restantes_est,
        crp.due_date_est,
        e.modelo as equipo_modelo,
        ARRAY_AGG(DISTINCT r.descripcion) as repuestos_necesarios
      FROM calendario_repuestos_plan crp
      JOIN cliente c ON crp.cliente_id = c.cliente_id
      JOIN plan_equipo_hito peh ON crp.peh_id = peh.peh_id
      JOIN equipo e ON peh.equipo_id = e.equipo_id
      LEFT JOIN plan_equipo_hito_repuesto pehr ON peh.peh_id = pehr.peh_id
      LEFT JOIN repuesto r ON pehr.repuesto_id = r.repuesto_id
      WHERE crp.dias_restantes_est >= 0
      GROUP BY crp.cal_id, crp.peh_id, crp.cliente_id, c.nombre, crp.actividad, 
               crp.dias_restantes_est, crp.due_date_est, e.modelo
      ORDER BY crp.dias_restantes_est ASC
      LIMIT 10
    `;
    
    const result = await query(maintenanceQuery);
    
    return result.rows.map(row => ({
      equipo: row.equipo_modelo || row.peh_id,
      cliente: row.cliente_nombre,
      actividad: row.actividad,
      dias: parseInt(row.dias_restantes_est) || 0,
      fecha: row.due_date_est ? new Date(row.due_date_est).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      repuestos: row.repuestos_necesarios && row.repuestos_necesarios[0] !== null 
        ? row.repuestos_necesarios.filter((r: string) => r !== null && r !== '') 
        : []
    }));
    
  } catch (error) {
    console.error('Error obteniendo próximos mantenimientos:', error);
    console.log('⚠️ Usando mantenimientos de ejemplo debido a error de BD');
    return [
      { 
        equipo: 'Hitachi EX1200', 
        cliente: 'Ventura Mining', 
        actividad: 'Servicio excavadora y lubricación', 
        dias: 4, 
        fecha: '2025-09-19',
        repuestos: ['Sellos hidráulicos Hitachi ZX470']
      },
      { 
        equipo: 'CAT 320D', 
        cliente: 'Minera Los Andes', 
        actividad: 'Servicio excavadora y lubricación', 
        dias: 24, 
        fecha: '2025-10-08',
        repuestos: ['Filtro de aceite hidráulico', 'Sensor de temperatura']
      }
    ];
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
    console.log('⚠️ Usando equipos de ejemplo debido a error de BD');
    return [
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
      }
    ];
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
