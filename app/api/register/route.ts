import { NextResponse } from 'next/server'
import { Pool } from 'pg'

if (!process.env.POSTGRES_USER || 
    !process.env.POSTGRES_PASSWORD || 
    !process.env.POSTGRES_HOST || 
    !process.env.POSTGRES_DATABASE) {
  throw new Error('Faltan variables de entorno para la base de datos')
}

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DATABASE,
})

// Verificar conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err)
    return
  }
  release()
  console.log('Conexión a la base de datos establecida')
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, reason } = body

    const result = await pool.query(
      'INSERT INTO demo_registrations (first_name, last_name, email, reason) VALUES ($1, $2, $3, $4) RETURNING id',
      [firstName, lastName, email, reason]
    )

    return NextResponse.json({ success: true, id: result.rows[0].id })
  } catch (error) {
    console.error('Error al registrar:', error)
    return NextResponse.json(
      { error: 'Error al procesar el registro' },
      { status: 500 }
    )
  }
} 