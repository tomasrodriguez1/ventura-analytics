import { NextResponse } from 'next/server';
import { query } from '../../../../src/lib/database';

export async function GET() {
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
    `;
    
    const result = await query(maintenanceQuery);
    
    const mantenimientos = result.rows.map(row => ({
      equipo: row.equipo_modelo || row.peh_id,
      cliente: row.cliente_nombre,
      actividad: row.actividad,
      dias: parseInt(row.dias_restantes_est) || 0,
      fecha: row.due_date_est ? new Date(row.due_date_est).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      repuestos: row.repuestos_necesarios && row.repuestos_necesarios[0] !== null 
        ? row.repuestos_necesarios.filter((r: string) => r !== null && r !== '') 
        : []
    }));
    
    return NextResponse.json(mantenimientos);
    
  } catch (error) {
    console.error('Error obteniendo mantenimientos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
