import { posts } from '$lib/data/trpc/routes/posts';
import { trpc } from '$lib/data/trpc';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const router = trpc.router({
	posts,
});

export type Router = typeof router;

// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
