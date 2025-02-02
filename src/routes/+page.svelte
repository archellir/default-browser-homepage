<script lang="ts">
	import { onMount } from 'svelte';
	import { personalLinks, toolLinks, businessLinks, cloudLinks } from '$lib/data/links';
	import WeatherWidget from '$lib/components/WeatherWidget.svelte';
	import LinkSection from '$lib/components/LinkSection.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { getImageBrightness } from '$lib/utils/image';
	import { ImageBrightness, LinkSection as SectionType } from '$lib/types/common';
	import { isDarkText } from '$lib/stores/theme';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let time = $state(new Date());
	let backgroundUrl = $state(`https://picsum.photos/3024/1964?random=${Date.now()}`);
	let imageBrightness = $state<ImageBrightness>(ImageBrightness.DARK);

	async function updateBackground() {
		backgroundUrl = `https://picsum.photos/3024/1964?random=${Date.now()}`;
		imageBrightness = await getImageBrightness(backgroundUrl);
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

<main
	class="relative grid h-screen grid-rows-[auto_auto_1fr] gap-16 p-16 font-['IBM_Plex_Mono']"
	class:text-white={$isDarkText}
	class:text-black={!$isDarkText}
	style:background-image="url({backgroundUrl})"
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
		<LinkSection title={SectionType.PERSONAL} links={personalLinks} brightness={imageBrightness} />
		<LinkSection title={SectionType.TOOLS} links={toolLinks} brightness={imageBrightness} />
	</div>

	<div class="grid grid-cols-2 gap-24 self-end">
		<LinkSection title={SectionType.BUSINESS} links={businessLinks} brightness={imageBrightness} />
		<LinkSection title={SectionType.CLOUD} links={cloudLinks} brightness={imageBrightness} />
	</div>

	<ThemeToggle />
</main>
