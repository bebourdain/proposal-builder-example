import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'

const layoutSpacingFile = fileURLToPath(
  new URL('./src/layout-spacing.json', import.meta.url),
)

const layoutSpacingApi = {
  name: 'layout-spacing-api',
  configureServer(server) {
    server.middlewares.use('/api/layout-spacing', (request, response, next) => {
      if (request.method !== 'PUT') {
        next()
        return
      }

      let body = ''
      request.on('data', (chunk) => {
        body += chunk
      })
      request.on('end', async () => {
        try {
          const settings = JSON.parse(body)
          if (
            settings.version !== 7 ||
            typeof settings.defaults?.pagePad !== 'number' ||
            typeof settings.defaults?.summaryFontSize !== 'number'
          ) {
            response.statusCode = 409
            response.end('Stale spacing settings schema')
            return
          }
          const nextContents = `${JSON.stringify(settings, null, 2)}\n`
          const currentContents = await readFile(layoutSpacingFile, 'utf8')
          if (currentContents !== nextContents) {
            await writeFile(layoutSpacingFile, nextContents, 'utf8')
          }
          response.statusCode = 204
          response.end()
        } catch {
          response.statusCode = 400
          response.end('Invalid spacing settings')
        }
      })
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), layoutSpacingApi],
})
