<script lang="ts">
	import { isDarkText } from '$lib/stores/theme';
	let { visible } = $props<{ visible: boolean }>();

	let canvas: HTMLCanvasElement;
	const lineCount = 3;
	let phase = 0;

	$effect(() => {
		if (visible && canvas) {
			const ctx = canvas.getContext('2d')!;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			const centerY = canvas.height / 2;
			const amplitude = 160;
			const frequency = 0.02;

			const animate = () => {
				ctx.fillStyle = 'rgb(40, 40, 40)';
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				ctx.strokeStyle = 'rgb(235, 219, 178)';
				ctx.lineWidth = 2.5;

				for (let i = 0; i < lineCount; i++) {
					ctx.beginPath();
					ctx.moveTo(0, centerY);

					for (let x = 0; x < canvas.width; x++) {
						const distanceFromCenter = (x - canvas.width / 2) / (canvas.width / 6);
						const bellCurve = Math.exp(-distanceFromCenter * distanceFromCenter);

						const verticalOffset = (i - (lineCount - 1) / 2) * 18 * bellCurve;

						const y =
							centerY +
							verticalOffset +
							Math.sin(x * frequency + phase + i * 2) * amplitude * bellCurve;

						ctx.lineTo(x, y);
					}

					ctx.lineTo(canvas.width, centerY);
					ctx.stroke();
				}

				phase += 0.05;
			};

			const interval = setInterval(animate, 30);
			return () => clearInterval(interval);
		}
	});
</script>

<div
	class="fixed inset-0 -z-10 transition-all duration-500"
	class:opacity-0={!visible}
	class:opacity-100={visible}
>
	<canvas bind:this={canvas} class="absolute inset-0" aria-label="Loading animation"></canvas>
</div>
