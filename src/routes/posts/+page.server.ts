import trpcClient from '$lib/data/trpc/client';
import type { PageServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	// if RLS policies are enabled, check that user is authenticated before accessing db
	const { session } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}
	// else fetch data from db
	const posts = await trpcClient(event).posts.getPosts(session.user.id);
	return { posts };
};
