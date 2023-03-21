import { invalid, type ValidationError } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import type { Actions } from './$types';
import { z } from 'zod';

export const actions: Actions = {
	async default(
		event
	): Promise<ValidationError<{ error: string; values; errors? }> | { message: string }> {
		const { supabaseClient } = await getSupabase(event);
		const { request, url } = event;
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
			return invalid(400, {
				error: 'Make sure you enter a valid email and a password of at least 6 characters.',
				errors: validatedData.error.flatten().fieldErrors,
				values: {
					email: formData.get('email') as string,
				},
			});
		}

		// attempt to register
		const { error } = await supabaseClient.auth.signUp({
			email: validatedData.data.email,
			password: validatedData.data.password,
			options: { emailRedirectTo: url.origin },
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return invalid(400, {
					error: 'Invalid credentials.',
					values: {
						email: formData.get('email') as string,
					},
				});
			}

			return invalid(500, {
				error: 'Server error. Try again later.',
				values: {
					email: formData.get('email') as string,
				},
			});
		}

		return {
			message: 'Please check your email for a magic link to log into the website.',
		};
	},
};
