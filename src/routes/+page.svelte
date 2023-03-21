<script lang="ts">
	import type { PageData } from './$types';
	import { MetaTags } from 'svelte-meta-tags';
	import meta from '$lib/stores/meta';

	import Button from '$lib/components/ui/Button.svelte';
	import Waiting from '$lib/components/ui/icons/Waiting.svelte';

	let isGenerating = false;

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
	<div class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
		<textarea tabindex="0" style="max-height: 200px; height: 168px; overflow-y: hidden;" rows="1" class="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0">asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd asdassasaadsadsbadsasdddasasd </textarea>
		{#if isGenerating}
			<Button type="submit" classes="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent disabled:bottom-0.5 md:disabled:bottom-1 right-1 md:right-2">
				<div class="text-2xl">
					<Waiting />
				</div>
			</Button>
		{:else}
			<Button classes="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2">
				<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
					<line x1="22" y1="2" x2="11" y2="13"></line>
					<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
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
