<script>
	let name = ''
	async function handleSave()
	{
		chrome.storage.local.set({ name: name }).then(() => {
			alert('Node name saved')
		});
	}

	async function waitName()
	{
		const currentName = await chrome.storage.local.get('name')
		name = currentName.name || 'no name'
	}

	waitName()
</script>

<main>
	<div class = "container">
		<h2>D2A Extension Node</h2>
		<div>
			<input type = "text" placeholder = "Node Name" bind:value={name}>
			<button on:click={handleSave}>Save</button>
		</div>
		<a href="https://network.foxql.com" target="_blank" rel="noreferrer">Explorer</a>
		<a href="https://github.com/orgs/d2a-network/repositories" target="_blank" rel="noreferrer">Contribute D2A</a>
		<a href="https://github.com/foxql/peer" target="_blank" rel="noreferrer">Contribute FoxQL</a>

		<div style = "margin-top: 2rem;">
			<p>Version: 0.0.1</p>
		</div>
	</div>
</main>	

<style>
	main {
		text-align: center;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		padding: 2rem;
	}

	.container {
		width: 100%;
		text-align: left;
	}

	h2 {
		color: #ff3e00;
		text-transform: uppercase;
		font-weight: 200;
		margin-bottom: 0.5rem;
	}

	a {
		color: #f3f3f3;
		margin-right: 0.4rem;
	}
	input {
		width: 100%;
		margin-bottom: 0.5rem;
		padding: 0.3rem;
		border: 0px;
		outline: none;
		border-radius: 4px;
	}

	button {
		padding: 0.3rem 1rem;
		background: #407a40;
		color: #eee;
		border: 0px;
		cursor: pointer;
		border-radius: 4px;
		margin-bottom: 0.5rem;
	}
</style>