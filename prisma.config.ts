import path from 'node:path'
import { defineConfig } from 'prisma/config'
import { config } from 'dotenv'

// Load .env.local
config({ path: '.env.local' })
// Load .env (fallback)
config({ path: '.env' })

export default defineConfig({
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),
})