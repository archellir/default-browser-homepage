import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import obfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
	plugins: [
		sveltekit(),
		obfuscator({
			include: ['src/**/*.{js,ts,svelte}'],
			exclude: [
				'node_modules/**',
				'.svelte-kit/**',
				'build/**',
				'dist/**'
			],
			options: {
				compact: true,
				controlFlowFlattening: true,
				controlFlowFlatteningThreshold: 1,
				deadCodeInjection: false,
				debugProtection: false,
				disableConsoleOutput: true,
				identifierNamesGenerator: 'hexadecimal',
				numbersToExpressions: true,
				simplify: true,
				splitStrings: true,
				stringArray: true,
				stringArrayEncoding: ['base64'],
				stringArrayThreshold: 1,
				transformObjectKeys: false,
				unicodeEscapeSequence: false
			}
		})
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},

	build: {
		minify: 'terser',
		terserOptions: {
			format: {
				comments: false
			},
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
			}
		},
		rollupOptions: {
			output: {
				manualChunks: undefined
			}
		}
	}
});
