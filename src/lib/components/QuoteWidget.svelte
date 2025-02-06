<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { isDarkText } from '$lib/stores/theme';
	import { fallbackQuotes } from '$lib/data/quotes';

	interface Quote {
		text: string;
		author: string;
	}

	let quote = $state<Quote | null>(null);

	async function fetchQuote() {
		try {
			const response = await fetch(
				'https://quoteslate.vercel.app/api/quotes/random?tags=wisdom&minLength=30&maxLength=150'
			);
			const [data] = await response.json();

			quote = {
				text: data.quote,
				author: data.author
			};
		} catch (error) {
			console.error('Failed to fetch quote:', error);
			quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
		}
	}

	onMount(() => {
		fetchQuote();
		const interval = setInterval(fetchQuote, 300000); // 5 minutes
		return () => clearInterval(interval);
	});
</script>

{#if quote}
	<div
		transition:fade={{ duration: 300 }}
		class="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-white/20 px-6 py-3 font-['IBM_Plex_Mono'] backdrop-blur-md transition-all hover:bg-white/30"
		class:text-white={$isDarkText}
		class:text-black={!$isDarkText}
	>
		<p class="whitespace-nowrap text-sm 2xl:text-base">{quote.text} — {quote.author}</p>
	</div>
{/if}
