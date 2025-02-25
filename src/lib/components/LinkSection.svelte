<script lang="ts">
	import type { Link } from '$lib/types/common';
	import { isDarkText } from '$lib/stores/theme';

	let { title, links } = $props<{
		title: string;
		links: Link[];
	}>();

	let borderClass = $derived($isDarkText ? 'border-white/30' : 'border-black/30');
	let bgClass = $derived($isDarkText ? 'bg-black/40' : 'bg-white/40');
	let hoverBgClass = $derived($isDarkText ? 'hover:bg-black/50' : 'hover:bg-white/50');
</script>

<div class="flex flex-col gap-6">
	<h2 class="text-xl font-medium drop-shadow-lg 2xl:text-2xl">
		{title}
	</h2>
	<div class="flex flex-wrap gap-3">
		{#each links as link}
			{#if link && link.name}
				<a
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					class="group relative z-0 flex items-center rounded-lg border px-4 py-2 text-sm shadow-lg hover:z-50 hover:border-white/50 2xl:text-base {borderClass} {bgClass} {hoverBgClass}"
				>
					<span class="relative">{link.name}</span>
					{#if link.description}
						<span
							class="pointer-events-none absolute left-1/2 top-[115%] hidden w-max -translate-x-1/2 rounded bg-black/90 px-3 py-1.5 text-xs text-white group-hover:block 2xl:text-sm"
						>
							{link.description}
						</span>
					{/if}
				</a>
			{/if}
		{/each}
	</div>
</div>
