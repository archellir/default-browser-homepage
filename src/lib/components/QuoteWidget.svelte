<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { isDarkText } from '$lib/stores/theme';

	interface Quote {
		text: string;
		author: string;
	}

	let quote = $state<Quote | null>(null);

	function fetchQuoteJSONP() {
		return new Promise<Quote>((resolve, reject) => {
			const script = document.createElement('script');
			const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

			// @ts-ignore
			window[callbackName] = (data: any) => {
				// @ts-ignore
				delete window[callbackName];
				document.body.removeChild(script);
				resolve({
					text: data.quoteText.trim(),
					author: data.quoteAuthor || 'Unknown'
				});
			};

			script.src = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=${callbackName}`;
			script.onerror = reject;
			document.body.appendChild(script);
		});
	}

	async function updateQuote() {
		try {
			quote = await fetchQuoteJSONP();
		} catch (error) {
			console.error('Failed to fetch quote:', error);
			const fallbackQuotes = [
				{ text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
				{ text: 'Simplicity is prerequisite for reliability.', author: 'Edsger W. Dijkstra' },
				{
					text: 'The computer was born to solve problems that did not exist before.',
					author: 'Bill Gates'
				},
				{ text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
				{
					text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
					author: 'Martin Fowler'
				}
			];
			quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
		}
	}

	onMount(() => {
		updateQuote();
		const interval = setInterval(updateQuote, 300000);
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
		<p class="whitespace-nowrap text-sm">{quote.text} — {quote.author}</p>
	</div>
{/if}
