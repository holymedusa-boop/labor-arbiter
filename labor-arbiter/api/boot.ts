import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from './router';
import { createContext } from './middleware';

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

app.get('/health', (c) => c.json({ status: 'ok' }));

export default app;
