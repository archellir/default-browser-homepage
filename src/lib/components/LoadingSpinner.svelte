<script lang="ts">
	import { isDarkText } from '$lib/stores/theme';
	let { visible } = $props<{ visible: boolean }>();

	let canvas: HTMLCanvasElement;
	const lineCount = 3;
	let phase = 0;
	let hue = 0;

	$effect(() => {
		if (visible && canvas) {
			const ctx = canvas.getContext('2d')!;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			const isMobile = window.innerWidth < 768;
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;
			const amplitude = Math.min(window.innerWidth, window.innerHeight) * 0.35;
			const frequency = isMobile ? 0.015 : 0.01;

			const animate = () => {
				ctx.fillStyle = 'rgba(40, 40, 40, 1)';
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				for (let i = 0; i < lineCount; i++) {
					ctx.strokeStyle = 'rgba(235, 219, 178, 0.1)';
					ctx.lineWidth = isMobile ? 3 : 3.5;

					ctx.beginPath();

					if (isMobile) {
						// Vertical animation for mobile
						ctx.moveTo(centerX, 0);

						for (let y = 0; y < canvas.height; y++) {
							const distanceFromCenter = (y - canvas.height / 2) / (canvas.height / 4);
							const bellCurve = Math.exp(-distanceFromCenter * distanceFromCenter);

							const horizontalOffset = (i - (lineCount - 1) / 2) * 30 * bellCurve;

							const x =
								centerX +
								horizontalOffset +
								Math.sin(y * frequency + phase + i * 2) * amplitude * bellCurve;

							ctx.lineTo(x, y);
						}

						ctx.lineTo(centerX, canvas.height);
					} else {
						// Horizontal animation for desktop (original)
						ctx.moveTo(0, centerY);

						for (let x = 0; x < canvas.width; x++) {
							const distanceFromCenter = (x - canvas.width / 2) / (canvas.width / 4);
							const bellCurve = Math.exp(-distanceFromCenter * distanceFromCenter);

							const verticalOffset = (i - (lineCount - 1) / 2) * 30 * bellCurve;

							const y =
								centerY +
								verticalOffset +
								Math.sin(x * frequency + phase + i * 2) * amplitude * bellCurve;

							ctx.lineTo(x, y);
						}

						ctx.lineTo(canvas.width, centerY);
					}

					ctx.stroke();
				}

				phase += 0.03;
				hue = (hue + 0.5) % 360;
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
