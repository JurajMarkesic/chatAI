<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';

	import Button from '$lib/components/ui/Button.svelte';

	let isLoading = false;
	const handleLogout: SubmitFunction = () => {
		isLoading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			}

			isLoading = false;
			await applyAction(result);
		};
	};
</script>

<header class="site-header">
	<div class="container h-full">
		<div class="flex items-center justify-between">
			<button>hambi</button>
			<a href="/">Chat AI</a>
			<nav class="py-3">
				<ul class="-mr-2 flex items-baseline justify-end">
					<li class="mx-2">
						<Button href="/">Home</Button>
					</li>
					<li class="mx-2">
						<Button href="/about">About</Button>
					</li>
					{#if $page.data.session?.user}
						<li class="mx-2">
							<Button href="/posts">Posts</Button>
						</li>
						<form action="/logout" method="post" use:enhance={handleLogout}>
							<Button disabled={isLoading} type="submit" classes="button">Sign out</Button>
						</form>
					{:else}
						<li class="mx-2">
							<Button href="/login" classes="button">Sign in</Button>
						</li>
					{/if}
				</ul>
			</nav>
		</div>
	</div>
</header>
