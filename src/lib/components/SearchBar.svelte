<script lang="ts">
	import { isDarkText } from '$lib/stores/theme';
</script>

<div class="mb-8">
	<form action="https://google.com/search" method="get" target="_blank" rel="noopener noreferrer">
		<input
			type="text"
			name="q"
			placeholder="Search Google..."
			autocomplete="off"
			class="w-96 rounded-lg bg-white/20 px-4 py-3 backdrop-blur-md transition-colors focus:outline-none {$isDarkText
				? 'text-white placeholder:text-white/70'
				: 'text-black placeholder:text-black/70'}"
		/>
	</form>
</div>
