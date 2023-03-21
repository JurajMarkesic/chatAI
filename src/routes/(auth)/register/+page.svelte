<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';

	import Button from '$lib/components/ui/Button.svelte';
	import Loader from '$lib/components/ui/icons/Loader.svelte';

	export let form: ActionData;
	let isLoading = false;

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;

		return async ({ result }) => {
			await applyAction(result);
			isLoading = false;
		};
	};
</script>

<div class="mx-auto max-w-md">
	<section class="py-12">
		<h2 class="text-2xl font-bold">Sign up</h2>
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

				<label for="password" class="block">
					<span class="block {form?.errors?.password ? 'text-red-500' : 'text-gray-700'}"
						>Password</span
					>
					<input
						id="password"
						name="password"
						class="
							mt-1
							block
							w-full
							rounded-md
							border focus:border-gray-500 focus:bg-white
							focus:ring-0
							{form?.errors?.password ? 'border-red-500 bg-red-50' : 'border-transparent bg-gray-100'}
							"
						type="password"
						placeholder="Password"
						min="6"
						required
					/>
				</label>
				{#if form?.errors?.password}
					<div class="block">{form?.errors?.password}</div>
				{/if}
				<div class="flex items-center">
					<Button disabled={isLoading} type="submit" classes="button primary">Sign up</Button>
					{#if isLoading}
						<div class="ml-4"><Loader /></div>
					{/if}
				</div>
			</div>
		</form>

		<div class="mt-6">
			<p>
				Already have an account? <Button href="/login" classes="underline">Sign in</Button>
			</p>
		</div>
	</section>
</div>
