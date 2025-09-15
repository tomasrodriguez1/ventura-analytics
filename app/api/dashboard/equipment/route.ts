import { NextResponse } from 'next/server';
import { query } from '../../../../src/lib/database';

export async function GET() {
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
    `;
    
    const result = await query(equipmentQuery);
    
    const equipos = result.rows.map(row => ({
      id: row.cliente_id,
      cliente: row.cliente_nombre || 'Sin nombre',
      totalEquipos: parseInt(row.total_equipos) || 0,
      equiposCriticos: parseInt(row.equipos_criticos) || 0,
      promedioHorasUso: Math.round(parseFloat(row.promedio_horas_uso) || 0),
      modelosPrincipales: row.modelos_principales || 'Sin modelos'
    }));
    
    return NextResponse.json(equipos);
    
  } catch (error) {
    console.error('Error obteniendo equipos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
