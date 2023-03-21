<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<img
	src="https://user-images.githubusercontent.com/43737355/189502485-be99e3ce-272b-49a9-abe8-5496238dfbb3.png"
	alt="T3-SvelteKit"
	class=" text-center"
/>
<p class="tailwind-demo text-center text-2xl font-semibold">
	POSTS by {data.session?.user.email}
</p>

<ul>
	{#each data.posts as post}
		<li>{post.title}</li>
	{/each}
</ul>
