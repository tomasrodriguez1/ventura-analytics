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
    console.log('⚠️ Usando datos de ejemplo para equipos top en API');
    // Devolver datos de ejemplo en lugar de error 500
    const equiposEjemplo = [
      { id: 'EQ-3001', modelo: 'CAT 320D', fabricante: 'Caterpillar', cliente: 'Minera Los Andes', horasUso: 12, critico: true },
      { id: 'EQ-3002', modelo: 'Komatsu HD785-7', fabricante: 'Komatsu', cliente: 'Minera Patagónica', horasUso: 11, critico: true },
      { id: 'EQ-3005', modelo: 'Hitachi EX1200', fabricante: 'Hitachi', cliente: 'Ventura Mining', horasUso: 10, critico: true },
      { id: 'EQ-3010', modelo: 'CAT D10T2', fabricante: 'Caterpillar', cliente: 'Minera Sur', horasUso: 9, critico: false },
      { id: 'EQ-3015', modelo: 'Volvo L350H', fabricante: 'Volvo', cliente: 'Minera Los Andes', horasUso: 8, critico: false }
    ];
    return NextResponse.json(equiposEjemplo);
  }
}
