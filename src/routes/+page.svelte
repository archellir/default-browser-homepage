<script lang="ts">
	import { onMount } from 'svelte';
	import {
		personalLinks,
		toolLinks,
		businessLinks,
		cloudLinks,
		funLinks,
		learningLinks
	} from '$lib/data/links';
	import WeatherWidget from '$lib/components/WeatherWidget.svelte';
	import LinkSection from '$lib/components/LinkSection.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { LinkSection as SectionType } from '$lib/types/common';
	import { isDarkText } from '$lib/stores/theme';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { updateBackground, type ImageInfo } from '$lib/services/background';
	import TimeWidget from '$lib/components/TimeWidget.svelte';

	let time = $state(new Date());
	let backgroundUrl = $state('');
	let isLoading = $state(true);
	let imageInfo = $state<ImageInfo | null>(null);

	async function refreshBackground() {
		isLoading = true;
		try {
			const { finalUrl, imageInfo: newImageInfo } = await updateBackground();
			backgroundUrl = finalUrl;
			imageInfo = newImageInfo;
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		refreshBackground();
		const timeInterval = setInterval(() => (time = new Date()), 1000);
		const bgInterval = setInterval(refreshBackground, 300000);

		return () => {
			clearInterval(timeInterval);
			clearInterval(bgInterval);
		};
	});
</script>

<LoadingSpinner visible={isLoading} />
<main
	class="relative grid min-h-screen grid-rows-[auto_auto_1fr] gap-12 p-4 font-['IBM_Plex_Mono'] transition-all duration-500 sm:gap-16 sm:p-16 lg:h-screen"
	class:text-white={$isDarkText}
	class:text-black={!$isDarkText}
	style:background-image={backgroundUrl ? `url(${backgroundUrl})` : 'none'}
	style:background-size="cover"
	style:background-position="center"
>
	<TimeWidget />
	<WeatherWidget />

	<div class="hidden flex-col items-center justify-start sm:flex">
		<div class="mb-8 text-6xl font-light drop-shadow-lg">
			{time.toLocaleTimeString('en-GB', { hour12: false })}
		</div>
		<SearchBar />
	</div>

	<div class="grid grid-cols-1 gap-6 self-end md:grid-cols-2">
		<LinkSection title={SectionType.PERSONAL} links={personalLinks} />
		<LinkSection title={SectionType.TOOLS} links={toolLinks} />
		<LinkSection title={SectionType.LEARNING} links={learningLinks} />
		<LinkSection title={SectionType.FUN} links={funLinks} />
		<LinkSection title={SectionType.BUSINESS} links={businessLinks} />
		<LinkSection title={SectionType.CLOUD} links={cloudLinks} />
	</div>

	<div class="fixed bottom-4 right-4 flex items-center gap-4 md:bottom-8 md:right-8">
		{#if imageInfo}
			<a
				href={imageInfo.url}
				target="_blank"
				rel="noopener noreferrer"
				class="rounded-full bg-white/20 p-3 backdrop-blur-md transition-all hover:bg-white/30"
				title="Photo by {imageInfo.author}"
				aria-label="View photo source"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
					<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
				</svg>
			</a>
		{/if}
		<ThemeToggle />
	</div>

	<button type="button" aria-label="Refresh background" onclick={refreshBackground}>
		<!-- button content -->
	</button>
</main>
