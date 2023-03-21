import { invalid, type ValidationError } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import type { Actions } from './$types';
import { z } from 'zod';

export const actions: Actions = {
	async default(event): Promise<ValidationError<{ error: string; errors? }> | { message: string }> {
		const { supabaseClient } = await getSupabase(event);
		const { request } = event;
		const formData = await request.formData();

		const credentials = z.object({
			password: z
				.string({ required_error: 'Password is required.' })
				.min(6, { message: 'Password must be at least 6 characters.' }),
		});

		const validatedData = credentials.safeParse(Object.fromEntries(formData));

		if (!validatedData.success) {
			return invalid(400, {
				error: 'Password must be at least 6 characters.',
				errors: validatedData.error.flatten().fieldErrors,
			});
		}

		const { error } = await supabaseClient.auth.updateUser({
			password: validatedData.data.password,
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return invalid(400, {
					error: 'Invalid credentials.',
				});
			}
			return invalid(500, {
				error: 'Server error. Try again later.',
			});
		}

		return {
			message: 'Your password has been changed!.',
		};
	},
};
