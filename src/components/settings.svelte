<main>
    <div class="container">
      <div>
        <input type="text" placeholder="Node Name" bind:value={$nodeName} />
        <button on:click={handleSave}>Save</button>
      </div>
    </div>
</main>

<script>
import { nodeName } from "../store";

async function handleSave() {
    chrome.storage.local.set({ name: $nodeName }).then(() => {
      alert("Node name saved");
    });
}

  async function waitName() {
    const currentName = await chrome.storage.local.get("name");
    const name = currentName.name || "no name";
    nodeName.set(name);
  }

  waitName();
</script>

<style>
    main {
    text-align: center;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem;
  }

  .container {
    width: 100%;
    text-align: left;
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