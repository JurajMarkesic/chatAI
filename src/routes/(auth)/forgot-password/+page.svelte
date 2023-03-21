<script lang="ts">
	import type { ActionData } from './$types';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';

	import Button from '$lib/components/ui/Button.svelte';
	import Loader from '$lib/components/ui/icons/Loader.svelte';

	export let form: ActionData;
	let isLoading = false;

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;

		return async ({ result }) => {
			isLoading = false;
			await applyAction(result);
		};
	};
</script>

<div class="mx-auto max-w-md">
	<section class="py-12">
		<h2 class="text-2xl font-bold">Forgotten Password</h2>
		{#if form?.error}
			<div class="my-6 rounded-md bg-red-500 px-5 py-3 text-white">{form.error}</div>
		{/if}
		{#if form?.message}
			<div class="my-6 rounded-md bg-teal-600 px-5 py-3 text-white">{form.message}</div>
		{/if}
		<form method="post" use:enhance={handleSubmit} class="mt-8">
			<div class="grid grid-cols-1 gap-6">
				<label for="email" class="block">
					<span class="block {form?.errors?.email ? 'text-red-500' : 'text-gray-700'}">Email</span>
					<input
						id="email"
						name="email"
						value={form?.values?.email ?? ''}
						class="
							mt-1
							block
							w-full
							rounded-md
							border focus:border-gray-500 focus:bg-white
							focus:ring-0
							{form?.errors?.email ? 'border-red-500 bg-red-50' : 'border-transparent bg-gray-100'}
							"
						type="email"
						placeholder="Email"
						required
					/>
				</label>
				<div class="flex items-center">
					<Button disabled={isLoading} type="submit" classes="button primary"
						>Send password recovery link to my email</Button
					>
					{#if isLoading}
						<div class="ml-4"><Loader /></div>
					{/if}
				</div>
			</div>
		</form>

		<div class="mt-6">
			<p class="has-text-centered">
				Don't have an account? <Button href="/register" classes="underline">Sign up</Button>
			</p>
		</div>
	</section>
</div>
