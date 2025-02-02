<script lang="ts">
	import type { Link } from '$lib/types/common';

	let { title, links } = $props<{
		title: string;
		links: Link[];
	}>();
</script>

<div class="flex flex-col gap-6">
	<h2 class="text-2xl font-medium drop-shadow-lg">{title}</h2>
	<div class="flex flex-wrap gap-3">
		{#each links as link}
			<a
				href={link.url}
				target="_blank"
				rel="noopener noreferrer"
				class="group relative z-0 flex items-center rounded-lg border border-white/30 bg-white/20 px-4 py-2 text-base shadow-lg backdrop-blur-md transition-all hover:z-50 hover:scale-105 hover:border-white/50 hover:bg-white/30"
			>
				<span class="relative">{link.name}</span>
				{#if link.description}
					<span
						class="pointer-events-none absolute left-1/2 top-[115%] hidden w-max -translate-x-1/2 rounded bg-black/90 px-3 py-1.5 text-sm group-hover:block"
						style="transform: translate(-50%, 0) scale(1);"
					>
						{link.description}
					</span>
				{/if}
			</a>
		{/each}
	</div>
</div>
