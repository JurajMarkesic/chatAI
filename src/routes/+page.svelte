<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { MetaTags } from 'svelte-meta-tags';
	import meta from '$lib/stores/meta';

	import Button from '$lib/components/ui/Button.svelte';
	import Waiting from '$lib/components/ui/icons/Waiting.svelte';

	let isMobile = false;
	let isGenerating = false;
	let currentPrompt = '';

	onMount(() => {
		isMobile = window.matchMedia('only screen and (max-width: 768px)').matches;
	});

	// textarea of  current width holds roughly 70 characters per line on mobile and 165 on desktop
	$: charactersPerLine = isMobile ? 70 : 165;
	$: textareaHeight = 50 + Math.floor(currentPrompt.length / charactersPerLine) * 30;

	export let data: PageData;
</script>

<MetaTags title="Home" description="Home Description." {...meta} />

<div class="pt-8" />
<div class="flex justify-center">
	<img
		src="https://user-images.githubusercontent.com/43737355/189502485-be99e3ce-272b-49a9-abe8-5496238dfbb3.png"
		alt="T3-SvelteKit"
		class=" text-center"
	/>
</div>
<p class="tailwind-demo text-center text-2xl font-semibold">Welcome to T3 SvelteKit</p>

<form>
	<div
		class="relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-white py-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] md:py-3 md:pl-4"
	>
		<textarea
			tabindex="0"
			style="max-height: 200px; height: {textareaHeight}px; overflow-y: hidden;"
			rows="1"
			class="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 pl-2 focus:ring-0 focus-visible:ring-0 md:pl-0"
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

{#if !data.session?.user}
	<h1>I am not logged in</h1>
{:else}
	<h1>Welcome {data.session?.user.email}</h1>
	<p>I am logged in!</p>
{/if}
