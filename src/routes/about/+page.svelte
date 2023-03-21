<script>
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';
	import meta from '$lib/stores/meta';
</script>

<MetaTags title="About" description="About Description." {...meta} />

<h1>ABOUT US PAGE</h1>

{#if !$page.data.session}
	<h1>I am not logged in</h1>
{:else}
	<h1>Welcome {$page.data.session.user.email}</h1>
	<p>I am logged in!</p>
{/if}
