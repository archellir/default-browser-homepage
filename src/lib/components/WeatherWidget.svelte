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

	async function updateWeather() {
		try {
			const data = await fetchWeatherData();
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
		<span class="text-xl">Loading...</span>
	{:else if error}
		<span class="text-xl">{error}</span>
	{:else}
		<div class="flex flex-col items-end gap-2">
			<div class="text-3xl font-medium">{temperature}°C</div>
			<div class="text-xs opacity-70">{getWeatherDescription(weatherCode!)}</div>
			<div class="text-xs opacity-70">Humidity: {humidity}%</div>
			<div class="text-xs opacity-70">Wind: {windSpeed} km/h</div>
			{#if recommendations}
				<div class="mt-4 space-y-3 border-t border-white/30 pt-4">
					{#each recommendations as { message }}
						<div class="text-base">{message}</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
