<script lang="ts">
	import { onMount } from 'svelte';

	interface CityTime {
		city: string;
		country: string;
		timezone: string;
	}

	interface TimeData {
		local: string;
		tzAbbr: string;
		utcOffset: string;
		difference: string;
	}

	const cities: CityTime[] = [
		{ city: 'Alicante', country: 'Spain', timezone: 'Europe/Madrid' },
		{ city: 'San Francisco', country: 'USA', timezone: 'America/Los_Angeles' },
		{ city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo' }
	];

	let times = $state<Record<string, TimeData>>({});

	function getTimezoneAbbr(timezone: string): string {
		const date = new Date();
		return (
			new Intl.DateTimeFormat('en-US', {
				timeZone: timezone,
				timeZoneName: 'short'
			})
				.formatToParts(date)
				.find((part) => part.type === 'timeZoneName')?.value || ''
		);
	}

	function getUTCOffset(timezone: string): string {
		const date = new Date();
		const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
		const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
		const diff = (tzDate.getTime() - utcDate.getTime()) / 3600000;
		return `UTC${diff >= 0 ? '+' : ''}${diff}`;
	}

	function getTimeDifference(timezone: string): string {
		const date = new Date();
		const localDate = new Date(date.toLocaleString('en-US'));
		const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
		const diff = (tzDate.getTime() - localDate.getTime()) / 3600000;
		if (diff === 0) return 'local';
		return diff > 0 ? `+${diff}h` : `${diff}h`;
	}

	function updateTimes() {
		const newTimes: Record<string, TimeData> = {};
		cities.forEach(({ timezone }) => {
			const date = new Date();
			newTimes[timezone] = {
				local: date.toLocaleTimeString('en-GB', {
					hour12: false,
					timeZone: timezone
				}),
				tzAbbr: getTimezoneAbbr(timezone),
				utcOffset: getUTCOffset(timezone),
				difference: getTimeDifference(timezone)
			};
		});
		times = newTimes;
	}

	onMount(() => {
		updateTimes();
		const interval = setInterval(updateTimes, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="absolute left-8 top-8 rounded-lg bg-black/30 px-6 py-4 backdrop-blur-md">
	<div class="flex flex-col gap-4">
		{#each cities as { city, country, timezone }}
			<div class="flex flex-col">
				<div class="mb-1 text-sm font-medium">{city}, {country}</div>
				<div class="flex items-baseline gap-4">
					<span class="text-2xl font-light tabular-nums"
						>{times[timezone]?.local || '--:--:--'}</span
					>
					<div class="flex items-baseline gap-3 text-xs opacity-50">
						<span>{times[timezone]?.tzAbbr || ''}</span>
						<span>{times[timezone]?.utcOffset || ''}</span>
						<span>({times[timezone]?.difference || ''})</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
