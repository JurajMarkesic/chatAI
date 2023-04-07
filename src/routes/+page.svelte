<script lang="ts">
	import { onMount } from 'svelte';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import { MetaTags } from 'svelte-meta-tags';
	import meta from '$lib/stores/meta';

	import Button from '$lib/components/ui/Button.svelte';
	import Waiting from '$lib/components/ui/icons/Waiting.svelte';

	export let data: PageData;

	let isMobile = false;
	let isGenerating = false;
	let currentPrompt = '';

	onMount(() => {
		isMobile = window.matchMedia('only screen and (max-width: 768px)').matches;
	});

	// textarea of  current width holds roughly 70 characters per line on mobile and 165 on desktop
	$: charactersPerLine = isMobile ? 70 : 165;
	$: textareaHeight = 50 + Math.floor(currentPrompt.length / charactersPerLine) * 30;

	let messages: { content: string; role: string }[] = [];

	async function handleSubmit(event) {
		isGenerating = true;
		messages.push({
			content: currentPrompt,
			role: 'user',
		});
		messages = messages;

		currentPrompt = '';

		let data = new FormData();
		data.set('messages', JSON.stringify(messages));

		const response = await fetch(this.action, {
			method: 'POST',
			body: data,
			headers: {
				'x-sveltekit-action': 'true',
			},
		});
		/** @type {import('@sveltejs/kit').ActionResult} */
		const result = deserialize(await response.text());

		isGenerating = false;

		if (result.status === 200 && result.data) {
			messages.push(result.data[0].message);
			messages = messages;
		}
		// if (result.type === 'success') {
		// 	// re-run all `load` functions, following the successful update
		// 	await invalidateAll();
		// }

		// applyAction(result);
	}
</script>

<MetaTags title="Home" description="Home Description." {...meta} />

<div class="mb-24">
	{#each messages as message}
		{#if message.role === 'user'}
			<div class="bg-amber-200 rounded-lg shadow-md px-5 py-4 flex focus:outline-none mt-16 mr-20">
				{message.content}
			</div>
		{:else if message.role === 'assistant'}
			<div class="bg-emerald-300 rounded-lg shadow-md px-5 py-4 flex focus:outline-none mt-16 ml-20">
				{message.content}
			</div>
		{/if}
	{/each}
</div>


<div class="mb-2">
	<form method="post" on:submit|preventDefault={handleSubmit}>
		<div
			class="relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-white py-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] md:py-3 md:pl-4"
		>
			<textarea
				tabindex="0"
				style="max-height: 200px; height: {textareaHeight}px; overflow-y: hidden;"
				rows="1"
				class="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 pl-2 focus:ring-0 focus-visible:ring-0 md:pl-0"
				name="prompt"
				bind:value={currentPrompt}
			/>
			{#if isGenerating}
				<Button
					type="submit"
					classes="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 hover:bg-gray-100 disabled:hover:bg-transparent right-1 md:right-2"
				>
					<div class="text-2xl">
						<Waiting />
					</div>
				</Button>
			{:else}
				<Button
					type="submit"
					classes="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 hover:bg-gray-100 disabled:hover:bg-transparent disabled:bottom-0.5 md:disabled:bottom-1 right-1 md:right-2"
				>
					<svg
						stroke="currentColor"
						fill="none"
						stroke-width="2"
						viewBox="0 0 24 24"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mr-1 h-4 w-4"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<line x1="22" y1="2" x2="11" y2="13" />
						<polygon points="22 2 15 22 11 13 2 9 22 2" />
					</svg>
				</Button>
			{/if}
		</div>
	</form>

	<div class="px-3 pt-2 pb-3 text-center text-sm text-zinc-400 md:px-4">
		Chat AI omogućio <a href="https://had.hr" target="_blank" rel="noreferrer" class="text-emerald-400 font-bold">had.hr</a>
	</div>

</div>