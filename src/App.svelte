<script>
	import Header from '../src/components/header.svelte'
	import NodeInformations from '../src/components/node.info.svelte'

	import {nodeId, nodeName} from '../src/store'

	chrome.storage.local.get("nodeId", function(data) {

		const avatarString = 'node-' + data.nodeId.substring(0, 8)
		nodeId.set(data.nodeId)
		chrome.storage.local.set({ nodeAvatar: `https://avatars.dicebear.com/api/adventurer/${avatarString}.svg` }).then(() => {
	
		});
	})

	chrome.storage

	async function handleSave()
	{
		chrome.storage.local.set({ name: $nodeName }).then(() => {
			alert('Node name saved')
		});
	}

	async function waitName()
	{
		const currentName = await chrome.storage.local.get('name')
		const name = currentName.name || 'no name'
		nodeName.set(name)
	}

	waitName()
</script>
<Header />
<NodeInformations />
<main>
	<div class = "container">
		<div>
			<input type = "text" placeholder = "Node Name" bind:value={$nodeName}>
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
		width: 100%;
		padding: 2rem;
	}

	.container {
		width: 100%;
		text-align: left;
	}

	a {
		color: #222;
		margin-right: 0.4rem;
	}
	input {
		width: 100%;
		margin-bottom: 0.5rem;
		padding: 0.3rem;
		border: 0px;
		outline: none;
		border-radius: 4px;
		background: #ccc;
	}

	button {
		padding: 0.3rem 1rem;
		background: #ccc;
		color: #222;
		border: 0px;
		cursor: pointer;
		border-radius: 4px;
		margin-bottom: 0.5rem;
	}
</style>