import { fail, type ActionFailure } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { SECRET_OPENAI_KEY } from '$env/static/private';
import type { Actions } from './$types';
import { Configuration, OpenAIApi, type CreateChatCompletionResponseChoicesInner } from 'openai';
import { z } from 'zod';

export const actions: Actions = {
	async default(
		event
	): Promise<
		ActionFailure<{ error: string; values? }> | CreateChatCompletionResponseChoicesInner[]
	> {
		const { supabaseClient } = await getSupabase(event);
		const { request } = event;
		const formData = await request.formData();

		const credentials = z.object({
			prompt: z.string({ required_error: 'Prompt is required.' }),
		});

		const validatedData = credentials.safeParse(Object.fromEntries(formData));

		if (!validatedData.success) {
			return fail(400, {
				error: 'The prompt is invalid. Make sure it is within the allowed character limit.',
				errors: validatedData.error.flatten().fieldErrors,
				values: {
					prompt: formData.get('prompt') as string,
				},
			});
		}

		const configuration = new Configuration({
			apiKey: SECRET_OPENAI_KEY,
		});
		const openai = new OpenAIApi(configuration);

		try {
			// send prompt to openai
			const response = await openai.createChatCompletion({
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: formData.get('prompt') as string }],
			});

			if (!response.data) {
				return fail(500, {
					error: 'Something went wrong. Try again later.',
					values: {
						prompt: formData.get('prompt') as string,
					},
				});
			}

			return response.data.choices;
		} catch (error) {
			console.log('error', error);
			return fail(500, {
				error: 'Server error. Try again later.',
				values: {
					prompt: formData.get('prompt') as string,
				},
			});
		}
	},
};
