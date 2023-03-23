import { fail, redirect, type ActionFailure } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import type { Actions } from './$types';
import { Configuration, OpenAIApi } from 'openai';
import { z } from 'zod';

export const actions: Actions = {
	async default(event): Promise<ActionFailure<{ error: string; values; errors? }>> {
		const { supabaseClient } = await getSupabase(event);
		const { request } = event;
		const formData = await request.formData();

		const credentials = z.object({
			email: z
				.string({ required_error: 'Email is required.' })
				.email({ message: 'Please enter a valid email.' }),
			password: z
				.string({ required_error: 'Password is required.' })
				.min(6, { message: 'Password must be at least 6 characters.' }),
		});

		const validatedData = credentials.safeParse(Object.fromEntries(formData));

		if (!validatedData.success) {
			return fail(400, {
				error: 'Make sure you enter a valid email and a password of at least 6 characters.',
				errors: validatedData.error.flatten().fieldErrors,
				values: {
					email: formData.get('email') as string,
				},
			});
		}

		// attempt to log in
		const { error } = await supabaseClient.auth.signInWithPassword(validatedData.data);

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Incorrect credentials.',
					values: {
						email: formData.get('email') as string,
					},
				});
			}

			return fail(500, {
				error: 'Server error. Try again later.',
				values: {
					email: formData.get('email') as string,
				},
			});
		}

		// successfully logged in - redirect to homepage
		throw redirect(307, '/');
	},
};
