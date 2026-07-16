import type { Config, Context } from '@netlify/functions'
import { getDatabase } from '@netlify/database'

export default async (req: Request, _context: Context) => {
  const db = getDatabase()
  
  try {
    // 1. Obtener todas las tablas en todos los esquemas
    const allTables = await db.sql`
      SELECT table_schema, table_name 
      FROM information_schema.tables 
      WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
    `
    
    // 2. Buscar tablas que tengan "migration" en su nombre
    const migrationTables = allTables.filter(t => t.table_name.toLowerCase().includes('migration'))
    
    // 3. Consultar datos de las tablas de migración encontradas
    const migrationContents: Record<string, any> = {}
    for (const t of migrationTables) {
      const fullName = `"${t.table_schema}"."${t.table_name}"`
      try {
        const rows = await db.sql([`SELECT * FROM ${fullName}`] as any)
        migrationContents[fullName] = rows
      } catch (err: any) {
        migrationContents[fullName] = { error: err.message }
      }
    }
    
    return Response.json({
      allTables,
      migrationTables,
      migrationContents
    })
  } catch (err: any) {
    return Response.json({ error: err.message, stack: err.stack }, { status: 500 })
  }
}

export const config: Config = {
  path: '/api/schema-debug',
}
