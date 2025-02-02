<script lang="ts">
	import { onMount } from 'svelte';
	import { personalLinks, toolLinks, businessLinks, cloudLinks } from '$lib/data/links';
	import WeatherWidget from '$lib/components/WeatherWidget.svelte';
	import LinkSection from '$lib/components/LinkSection.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { LinkSection as SectionType } from '$lib/types/common';
	import { isDarkText } from '$lib/stores/theme';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	let time = $state(new Date());
	let backgroundUrl = $state('');
	let isLoading = $state(true);

	async function updateBackground() {
		isLoading = true;
		const newUrl = `https://picsum.photos/3024/1964?random=${Date.now()}`;

		// Create a promise that resolves when the image loads
		await new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = resolve;
			img.onerror = reject;
			img.src = newUrl;
		});

		backgroundUrl = newUrl;
		isLoading = false;
	}

	onMount(() => {
		updateBackground();
		const timeInterval = setInterval(() => (time = new Date()), 1000);
		const bgInterval = setInterval(updateBackground, 300000);
		return () => {
			clearInterval(timeInterval);
			clearInterval(bgInterval);
		};
	});
</script>

<LoadingSpinner visible={isLoading} />
<main
	class="relative grid h-screen grid-rows-[auto_auto_1fr] gap-16 p-16 font-['IBM_Plex_Mono'] transition-opacity duration-500"
	class:opacity-0={isLoading}
	class:opacity-100={!isLoading}
	class:text-white={$isDarkText}
	class:text-black={!$isDarkText}
	style:background-image={backgroundUrl ? `url(${backgroundUrl})` : 'none'}
	style:background-size="cover"
	style:background-position="center"
>
	<WeatherWidget />

	<div class="flex flex-col items-center justify-start">
		<div class="mb-8 text-6xl font-light drop-shadow-lg">
			{time.toLocaleTimeString('en-GB', { hour12: false })}
		</div>
		<SearchBar />
	</div>

	<div class="grid grid-cols-2 gap-24">
		<LinkSection title={SectionType.PERSONAL} links={personalLinks} />
		<LinkSection title={SectionType.TOOLS} links={toolLinks} />
	</div>

	<div class="grid grid-cols-2 gap-24 self-end">
		<LinkSection title={SectionType.BUSINESS} links={businessLinks} />
		<LinkSection title={SectionType.CLOUD} links={cloudLinks} />
	</div>

	<ThemeToggle />
</main>
