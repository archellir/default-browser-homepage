<script lang="ts">
	import { onMount } from 'svelte';
	import { getWeatherDescription, getActivityRecommendation } from '$lib/utils/weather';
	import { fetchWeatherData } from '$lib/services/weather';
	import type { WeatherData, ActivityRecommendation } from '$lib/types/weather';

	let temperature = $state<number | null>(null);
	let humidity = $state<number | null>(null);
	let windSpeed = $state<number | null>(null);
	let weatherCode = $state<number | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let recommendations = $state<ActivityRecommendation[] | null>(null);
	let loadingProgress = $state(0);

	async function updateWeather() {
		try {
			// Reset states
			loading = true;
			loadingProgress = 0;

			// Simulate loading progress
			const progressInterval = setInterval(() => {
				loadingProgress = Math.min(loadingProgress + Math.random() * 30, 90);
			}, 200);

			const data = await fetchWeatherData();
			clearInterval(progressInterval);
			loadingProgress = 100;

			// Short delay to show 100% completion
			await new Promise((resolve) => setTimeout(resolve, 200));

			temperature = data.temperature;
			humidity = data.humidity;
			windSpeed = data.windSpeed;
			weatherCode = data.weatherCode;
			loading = false;
		} catch (e) {
			error = 'Failed to load weather data';
			loading = false;
		}
	}

	onMount(() => {
		updateWeather();
		const interval = setInterval(updateWeather, 1800000);
		return () => clearInterval(interval);
	});

	$effect(() => {
		recommendations = getActivityRecommendation({ temperature, humidity, windSpeed, weatherCode });
	});
</script>

<div class="absolute right-8 top-8 rounded-lg bg-black/30 px-6 py-4 backdrop-blur-md">
	{#if loading}
		<div class="flex w-48 flex-col gap-3">
			<div class="h-8 w-full overflow-hidden rounded-lg bg-white/10">
				<div
					class="h-full bg-white/20 transition-all duration-300"
					style:width="{loadingProgress}%"
				/>
			</div>
			<div class="text-xs opacity-70">Loading weather data...</div>
		</div>
	{:else if error}
		<span class="text-xl">{error}</span>
	{:else}
		<div class="flex flex-col items-end gap-2">
			<div class="text-3xl font-medium">{temperature}°C</div>
			<div class="text-xs opacity-70">{getWeatherDescription(weatherCode!)}</div>
			<div class="text-xs opacity-70">Humidity: {humidity}%</div>
			<div class="text-xs opacity-70">Wind: {windSpeed} km/h</div>
			{#if recommendations}
				<div class="mt-4 border-t border-white/30 pt-4">
					<div class="grid grid-cols-2 gap-3">
						{#each recommendations as { message }}
							<div class="flex items-center justify-center rounded bg-white/10 p-2 text-sm">
								{message}
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
