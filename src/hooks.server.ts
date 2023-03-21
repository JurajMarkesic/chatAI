import '$lib/data/authClient';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect, error, type Handle } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { createTRPCHandle } from 'trpc-sveltekit';
import { router } from '$lib/data/trpc/router';
import { createContext, responseMeta } from '$lib/data/trpc/context';

const trpcHandle = createTRPCHandle({ router, createContext, responseMeta });

async function apiGuard({ event, resolve }) {
	const loggedOutPostRoutes = ['/login', '/register', '/forgot-password'];
	// Protect POST routes - must not be logged in
	if (event.request.method === 'POST' && loggedOutPostRoutes.includes(event.url.pathname)) {
		const { session } = await getSupabase(event);

		if (session) {
			throw error(401, '/');
		}
	}

	const loggedInPostRoutes = ['/logout', '/change-password'];
	// Protect POST routes - must be logged in
	if (event.request.method === 'POST' && loggedInPostRoutes.includes(event.url.pathname)) {
		const { session } = await getSupabase(event);

		if (!session) {
			throw error(401, '/');
		}
	}

	const loggedOutGetRoutes = ['/login', '/register', '/forgot-password'];
	// Protect GET routes - must not be logged in
	if (event.request.method === 'GET' && loggedOutGetRoutes.includes(event.url.pathname)) {
		const { session } = await getSupabase(event);

		if (session) {
			throw redirect(303, '/');
		}
	}

	const loggedInGetRoutes = ['/profile', '/posts', '/change-password'];
	// Protect GET routes - need to be logged in
	if (event.request.method === 'GET' && loggedInGetRoutes.includes(event.url.pathname)) {
		const { session } = await getSupabase(event);

		if (!session) {
			throw redirect(303, '/');
		}
	}

	return await resolve(event);
}

export const handle: Handle = sequence(apiGuard, trpcHandle);
