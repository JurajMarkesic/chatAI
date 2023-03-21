import type { Context } from '$lib/data/trpc/context';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

export const trpc = initTRPC.context<Context>().create({ transformer: superjson });
