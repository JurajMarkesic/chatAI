<script lang="ts">
	import '../app.css';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import { supabaseClient } from '$lib/data/authClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange((event, session) => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="flex min-h-screen flex-col justify-between">
	<div class="wrapper">
		<SiteHeader />
		<main>
			<div class="container">
				<slot />
			</div>
		</main>
	</div>

	<SiteFooter />
</div>
