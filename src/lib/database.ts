import { Pool, PoolClient } from 'pg';

// URL de conexión - usar variable de entorno en producción, fallback para desarrollo
const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://venturanalytic_demo_user:ytlUCNCGSyIj9QuZ6B6FW1SV8F4mENvq@dpg-cua4b5rqf0us73c6iplg-a.oregon-postgres.render.com/VA_minero';

// Crear pool de conexiones usando connection string
const pool = new Pool({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false // Necesario para Render.com
  },
  max: 10, // Máximo 10 conexiones en el pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // Aumentado para mejor estabilidad
});

export async function getDbConnection(): Promise<PoolClient> {
  try {
    const client = await pool.connect();
    console.log('✅ Conexión exitosa a PostgreSQL');
    return client;
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
    console.error('Connection string:', CONNECTION_STRING.replace(/:[^:@]*@/, ':***@')); // Ocultar password
    throw new Error('No se pudo conectar a la base de datos');
  }
}

export async function query(text: string, params?: unknown[]) {
  const client = await getDbConnection();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Error ejecutando query:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Función para probar la conexión
export async function testConnection() {
  try {
    await query('SELECT 1 as test');
    console.log('✅ Conexión a base de datos exitosa');
    return true;
  } catch (error) {
    console.error('❌ Error conectando a base de datos:', error);
    return false;
  }
}

export default pool;
