// src/scripts/test-db.ts
import { db } from '@/lib/db'

async function testConnection() {
  try {
    // Testar conexão executando uma query simples
    const result = await db.$queryRaw`SELECT 1 as test`
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!')
    console.log('Resultado do teste:', result)
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:')
    console.error(error)
  } finally {
    await db.$disconnect()
  }
}

testConnection()