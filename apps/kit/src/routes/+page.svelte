<script lang="ts">
	import { berlinUhr } from "$lib/berlin"
	import { onMount } from "svelte"
	let uhr = [0, 0, 0, 0]

	onMount(() => {
		let frameId = window.requestAnimationFrame(refresh)
		function refresh() {
			uhr = berlinUhr()
			frameId = window.requestAnimationFrame(refresh)
		}
		return () => {
			window.cancelAnimationFrame(frameId)
		}
	})
</script>
<body>
	<div class="berlin-uhr">
		<div>
			<span class:on={!!uhr[0]}></span>
		</div>
		<div>
			{#each Array(4) as _, i}
				<span class:on={i < uhr[1]}></span>
			{/each}
		</div>
		<div>
			{#each Array(4) as _, i}
				<span class:on={i < uhr[2]}></span>
			{/each}
		</div>
		<div>
			{#each Array(11) as _, i}
				<span class:on={i < uhr[3]}></span>
			{/each}
		</div>
		<div>
			{#each Array(4) as _, i}
				<span class:on={i < uhr[4]}></span>
			{/each}
		</div>
	</div>
</body>

<style>
	* {
		width: 100%;
		font-family: sans-serif;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	body {
		flex-direction: column;
		display: flex;
	}

	.berlin-uhr {
		display: flex;
		flex-direction: column;
		padding:  2rem;
		margin: 0 auto;
		max-width: 32rem;
	}

	.berlin-uhr > div {
		height: 4rem;
		justify-content: center;
		display: flex;
		flex-direction: row;
		border-radius: 1rem;
		border-collapse: separate;
		overflow: hidden;
	}

	.berlin-uhr > * + * {
		margin-top: 0.75rem;
	}

	.berlin-uhr > div > * + * {
		margin-left: 0.5rem;
	}

	.berlin-uhr > div > span {
		background: #2f2f2f;
		width: 100%;
	}

	.berlin-uhr > div:nth-child(1) > span {
		border-radius: 9999px;
		width: 4rem;
	}

	.berlin-uhr > div:is(:nth-child(4), :nth-child(5)) > span.on {
		background: #ff9500;
	}

	.berlin-uhr > div:nth-child(1) > span.on {
		background: #ff9500;
	}

	.berlin-uhr > div > span.on {
		background: #ff0500;
	}

	.berlin-uhr > div:nth-child(4) > span:nth-child(3n).on {
		background: #ff0500;
	}
</style>
