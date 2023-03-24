import { fail, type ActionFailure } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import type { Actions } from './$types';
import { z } from 'zod';

export const actions: Actions = {
	async default(
		event
	): Promise<
		ActionFailure<{ error: string; errors?; values: { email: string } }> | { message: string }
	> {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);

		const formData = await request.formData();

		const credentials = z.object({
			email: z
				.string({ required_error: 'Email is required.' })
				.email({ message: 'Please enter a valid email.' }),
		});

		const validatedData = credentials.safeParse(Object.fromEntries(formData));

		if (!validatedData.success) {
			return fail(400, {
				error: 'Please enter a valid email.',
				errors: validatedData.error.flatten().fieldErrors,
				values: {
					email: formData.get('email') as string,
				},
			});
		}

		const { error } = await supabaseClient.auth.resetPasswordForEmail(validatedData.data.email);

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid credentials.',
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

		return {
			message: 'Please check your email for a link that will allow you to choose a new password.',
		};
	},
};
