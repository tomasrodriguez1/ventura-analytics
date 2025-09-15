import { NextResponse } from 'next/server';
import { query } from '../../../../src/lib/database';

export async function GET() {
  try {
    const inventoryQuery = `
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
    `;
    
    const result = await query(inventoryQuery);
    
    const repuestos = result.rows.map(row => {
      // Convertir a números explícitamente
      const stock = parseInt(row.stock_u) || 0;
      const puntoReorden = parseInt(row.punto_reorden) || 0;
      const usado = parseInt(row.veces_usado) || 0;
      const leadTime = parseInt(row.lead_time_dias) || 0;
      
      const stockRatio = puntoReorden > 0 ? stock / puntoReorden : 1;
      
      let estado: string;
      let prioridad: string;
      
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
    
    return NextResponse.json(repuestos);
    
  } catch (error) {
    console.error('Error obteniendo inventario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
