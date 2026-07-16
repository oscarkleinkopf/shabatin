import type { Config, Context } from '@netlify/functions'
import { getDatabase } from '@netlify/database'

export default async (req: Request, _context: Context) => {
  const db = getDatabase()
  
  try {
    // 1. Obtener lista de tablas
    const tables = await db.sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    
    // 2. Buscar tablas de migración
    let migrationData = null
    const hasNetlifyMigrations = tables.some(t => t.table_name === 'netlify_migrations')
    const hasPrismaMigrations = tables.some(t => t.table_name === '_prisma_migrations')
    const hasDrizzleMigrations = tables.some(t => t.table_name === '__drizzle_migrations')
    
    if (hasNetlifyMigrations) {
      migrationData = await db.sql`SELECT * FROM netlify_migrations`
    } else if (hasPrismaMigrations) {
      migrationData = await db.sql`SELECT * FROM _prisma_migrations`
    } else if (hasDrizzleMigrations) {
      migrationData = await db.sql`SELECT * FROM __drizzle_migrations`
    }
    
    return Response.json({
      tables,
      migrationTable: hasNetlifyMigrations ? 'netlify_migrations' : (hasPrismaMigrations ? '_prisma_migrations' : (hasDrizzleMigrations ? '__drizzle_migrations' : 'none')),
      migrationData
    })
  } catch (err: any) {
    return Response.json({ error: err.message, stack: err.stack }, { status: 500 })
  }
}

export const config: Config = {
  path: '/api/schema-debug',
}
