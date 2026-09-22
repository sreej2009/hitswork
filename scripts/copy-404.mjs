// GitHub Pages has no server-side rewrites, so a direct load of a client
// route (e.g. /learning-paths) 404s. Serving index.html as 404.html is the
// standard SPA fallback: GH Pages serves it for any unknown path, and
// react-router then takes over client-side.
import { copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
