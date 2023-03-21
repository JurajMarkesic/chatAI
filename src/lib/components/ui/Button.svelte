<script>
	export let href = undefined;
	export let type = 'button';
	export let classes = '';
	export let disabled = false;
</script>

{#if href === undefined}
	<button class={classes} {type} {disabled}>
		<slot />
	</button>
{:else}
	<a {href} class={classes}>
		<slot />
	</a>
{/if}

<style lang="postcss">
	@tailwind components;
	a:not(.button):hover {
		@apply underline;
	}
	.button {
		@apply block rounded bg-gray-200 py-1 px-3;
	}
	.button:hover {
		@apply bg-gray-300;
	}
	.primary {
		@apply bg-indigo-200;
	}
	.primary:hover {
		@apply bg-indigo-300;
	}
	.large {
		font-size: 125%;
	}
</style>
