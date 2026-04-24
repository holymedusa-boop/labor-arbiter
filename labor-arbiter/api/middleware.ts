import type { Context } from 'hono';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export async function createContext(opts: FetchCreateContextFnOptions, c: Context) {
  return {
    req: opts.req,
    hono: c,
  };
}

export type TrpcContext = Awaited<ReturnType<typeof createContext>>;
