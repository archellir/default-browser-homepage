<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { protect } from '$lib/utils/protection';

	let { children } = $props();

	const variable = 'homepage';
	const token_name = 'auth_token';

	let isAuthenticated = $state(false);
	let password = $state('');

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter' && password.trim()) {
			authenticate();
		}
	}

	function preventDevTools(e: KeyboardEvent) {
		if (
			(e.ctrlKey && e.shiftKey && e.key === 'I') ||
			(e.ctrlKey && e.shiftKey && e.key === 'J') ||
			e.key === 'F12'
		) {
			e.preventDefault();
		}
	}

	function authenticate() {
		if (!password.trim()) return;

		if (password === variable) {
			isAuthenticated = true;
			const token = protect.hash(password);
			localStorage.setItem(token_name, token);
		} else {
			password = '';
		}
	}

	function checkStoredAuth() {
		const token = localStorage.getItem(token_name);
		if (token && protect.verifyToken(token, variable)) {
			isAuthenticated = true;
		}
	}

	onMount(() => {
		checkStoredAuth();

		// Prevent dev tools
		window.addEventListener('contextmenu', (e) => e.preventDefault());
		window.addEventListener('keydown', preventDevTools);

		return () => {
			window.removeEventListener('keydown', preventDevTools);
		};
	});
</script>

{#if isAuthenticated}
	{@render children()}
{:else}
	<div class="relative flex h-screen items-center justify-center overflow-hidden bg-[#1d2021]">
		<!-- Gruvbox-themed background effects -->
		<div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#32302f,#1d2021)]"></div>
		<div class="absolute h-56 w-56 -translate-x-1/2 rounded-full bg-[#d65d0e]/20 blur-3xl"></div>
		<div
			class="absolute right-0 h-56 w-56 translate-x-1/2 rounded-full bg-[#d79921]/10 blur-3xl"
		></div>
		<div class="absolute bottom-0 h-56 w-56 rounded-full bg-[#cc241d]/10 blur-3xl"></div>

		<form
			class="relative w-72 overflow-hidden rounded-3xl border border-[#bdae93]/10 bg-gradient-to-br from-[#32302f]/90 via-[#32302f]/80 to-[#3c3836]/70 p-6 shadow-[0_0_50px_-12px] shadow-[#d65d0e]/10 backdrop-blur-xl"
			onsubmit={(e) => {
				try {
					e.preventDefault();
					authenticate();
				} catch (error) {
					console.error('Authentication error:', error);
				}
			}}
		>
			<div
				class="absolute inset-px rounded-3xl bg-gradient-to-br from-[#ebdbb2]/5 to-transparent opacity-50"
			></div>
			<div class="relative space-y-3">
				<input
					type="password"
					bind:value={password}
					placeholder="Password"
					class="w-full rounded-xl border border-[#bdae93]/10 bg-[#282828]/90 px-4 py-3
						   text-[#ebdbb2] backdrop-blur-sm transition-all
						   duration-300 placeholder:text-[#a89984]/50 focus:border-[#d65d0e]/30
						   focus:outline-none focus:ring-1 focus:ring-[#d65d0e]/20"
					onkeydown={(e) => {
						try {
							if (e.key === 'Enter' && password.trim()) authenticate();
						} catch (error) {
							console.error('Keydown error:', error);
						}
					}}
					aria-label="Password input"
				/>
				<button
					type="submit"
					disabled={!password.trim()}
					class="group w-full rounded-xl bg-gradient-to-r from-[#d65d0e]/20 to-[#d79921]/20
						   px-4 py-3 text-[#ebdbb2] transition-all duration-300
						   hover:from-[#d65d0e]/30 hover:to-[#d79921]/30 focus:outline-none
						   focus:ring-1 focus:ring-[#bdae93]/20 disabled:cursor-not-allowed
						   disabled:opacity-50"
					aria-label="Submit password"
				>
					<span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
				</button>
			</div>
		</form>
	</div>
{/if}
