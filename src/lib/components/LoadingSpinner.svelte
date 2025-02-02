<script lang="ts">
	import { isDarkText } from '$lib/stores/theme';
	let { visible } = $props<{ visible: boolean }>();

	let canvas: HTMLCanvasElement;
	let columns: number[] = [];
	let fontSize = 14;

	$effect(() => {
		if (visible && canvas) {
			const ctx = canvas.getContext('2d')!;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			const columnsCount = Math.floor(canvas.width / fontSize);
			columns = Array(columnsCount).fill(0);

			const matrixRain = () => {
				ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
				ctx.font = `${fontSize}px monospace`;

				for (let i = 0; i < columns.length; i++) {
					const char = String.fromCharCode(Math.random() * 128);
					const x = i * fontSize;
					const y = columns[i] * fontSize;

					ctx.fillText(char, x, y);

					if (y > canvas.height && Math.random() > 0.98) {
						columns[i] = 0;
					} else {
						columns[i]++;
					}
				}
			};

			const interval = setInterval(matrixRain, 30);
			return () => clearInterval(interval);
		}
	});
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center transition-all duration-500"
	class:opacity-0={!visible}
	class:opacity-100={visible}
	class:pointer-events-none={!visible}
>
	<canvas bind:this={canvas} class="absolute inset-0 h-full w-full" />

	<div class="relative flex flex-col items-center gap-4">
		<div class="relative h-24 w-24">
			<div class="absolute inset-0 animate-ping rounded-full bg-white/30" />
			<div
				class="absolute inset-2 animate-spin rounded-full border-4 border-white border-t-transparent"
			/>
		</div>
	</div>
</div>

<style>
	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.animate-gradient {
		animation: gradient 8s ease infinite;
	}
</style>
