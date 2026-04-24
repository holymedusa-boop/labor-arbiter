import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { serveStatic } from '@hono/node-server/serve-static';
import { appRouter } from './router';
import { createContext } from './middleware';
import { serve } from '@hono/node-server';

const app = new Hono();

app.use(cors({ origin: '*' }));

app.use('/api/trpc/*', async (c) => {
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req: c.req.raw,
    router: appRouter,
    createContext: (opts) => createContext(opts, c),
  });
  return response;
});

app.get('/health', (c) => c.json({ status: 'ok', time: new Date().toISOString() }));

// Serve static frontend from dist/public in production
app.use('/*', serveStatic({ root: './dist/public', index: 'index.html' }));

const port = parseInt(process.env.PORT || '3000');
console.log(`Server running on port ${port}`);
serve({ fetch: app.fetch, port });

export default app;
