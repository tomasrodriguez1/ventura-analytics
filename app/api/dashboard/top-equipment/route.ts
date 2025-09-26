import { NextResponse } from 'next/server';
import { query } from '../../../../src/lib/database';

export async function GET() {
  try {
    const topEquipmentQuery = `
      SELECT 
        e.equipo_id,
        e.modelo,
        e.fabricante,
        e.tasa_uso_horas_dia,
        e.critico,
        c.nombre as cliente_nombre
      FROM equipo e
      LEFT JOIN cliente_equipo ce ON e.equipo_id = ce.equipo_id
      LEFT JOIN cliente c ON ce.cliente_id = c.cliente_id
      WHERE e.tasa_uso_horas_dia IS NOT NULL
      ORDER BY e.tasa_uso_horas_dia DESC NULLS LAST
      LIMIT 10
    `;
    
    const result = await query(topEquipmentQuery);
    
    const equipos = result.rows.map(row => ({
      id: row.equipo_id,
      modelo: row.modelo || 'Sin modelo',
      fabricante: row.fabricante,
      cliente: row.cliente_nombre || 'Sin asignar',
      horasUso: parseInt(row.tasa_uso_horas_dia) || 0,
      critico: row.critico || false
    }));
    
    return NextResponse.json(equipos);
    
  } catch (error) {
    console.error('Error obteniendo equipos top:', error);
    return NextResponse.json([], { status: 500 });
  }
}
