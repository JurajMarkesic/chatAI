<script lang="ts">
	import type { PageData } from './$types';
	import { MetaTags } from 'svelte-meta-tags';
	import meta from '$lib/stores/meta';

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

{#if !data.session?.user}
	<h1>I am not logged in</h1>
{:else}
	<h1>Welcome {data.session?.user.email}</h1>
	<p>I am logged in!</p>
{/if}
