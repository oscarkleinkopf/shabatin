import type { Config, Context } from '@netlify/functions'
import { getDatabase } from '@netlify/database'

// Tzedaká comunitaria: el total acumulado se comparte entre todos. Cada
// depósito agrega una fila y el total se calcula sumando; reiniciar la caja
// borra todas las filas.
async function getTotal(db: ReturnType<typeof getDatabase>): Promise<number> {
  const [row] = await db.sql`SELECT COALESCE(SUM(amount), 0)::int AS total FROM tzedaka_entries`
  return row?.total ?? 0
}

export default async (req: Request, _context: Context) => {
  const db = getDatabase()

  if (req.method === 'GET') {
    return Response.json({ total: await getTotal(db) })
  }

  if (req.method === 'POST') {
    const body = await req.json().catch(() => null)
    const amount = Number(body?.amount)
    if (!Number.isFinite(amount) || amount <= 0) {
      return Response.json({ error: 'Monto inválido.' }, { status: 400 })
    }
    await db.sql`INSERT INTO tzedaka_entries (amount) VALUES (${amount})`
    return Response.json({ total: await getTotal(db) }, { status: 201 })
  }

  if (req.method === 'DELETE') {
    await db.sql`DELETE FROM tzedaka_entries`
    return Response.json({ total: 0 })
  }

  return new Response('Method not allowed', { status: 405 })
}

export const config: Config = {
  path: '/api/tzedaka',
}
