import prismaClient from '$lib/data/prismaClient';
import { trpc } from '$lib/data/trpc';
import { z } from 'zod';

export const posts = trpc.router({
	getPost: trpc.procedure.input(z.number()).query(async ({ input }) => {
		return prismaClient.post.findFirst({
			where: {
				id: input,
			},
		});
	}),
	getPosts: trpc.procedure.input(z.string()).query(async ({ input }) => {
		return prismaClient.post.findMany({
			where: {
				user_id: input,
			},
		});
	}),
});
