import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext(event: RequestEvent) {
	return {
		// context information
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;

// Cache-control header- needed for Vercel Edge functions
export const responseMeta = ({ type, errors }) => {
	if (type === 'query' && errors.length === 0) {
		const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
		return {
			headers: {
				'cache-control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
			},
		};
	}

	return {};
};
