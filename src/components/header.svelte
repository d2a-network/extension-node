<script>
  import { nodeId, nodeName } from "../store";
</script>

<div class="header">
  <div>
    <h3>D2A</h3>
  </div>
  <div class="right-side">
    <div class="network-label">FoxQL Test Bridge</div>
    <div class="avatar">
      {#if $nodeId != null}
        <img
          src="https://avatars.dicebear.com/api/adventurer/{$nodeId}.svg"
          alt="node avatar"
        />
      {/if}
    </div>
  </div>
</div>

<style>
  .header {
    width: 100%;
    display: flex;
    padding: 1rem 1.5rem;
    background: #f2f4f6;
    align-items: center;
    color: #535a61;
  }
  .header .right-side {
    margin-left: auto;
    display: flex;
    align-items: center;
  }

  .header .right-side .avatar {
    width: 42px;
    height: 42px;
    background: #fff;
    border-radius: 300px;
    margin-left: 0.5rem;
  }

  .header .right-side img {
    width: 100%;
    height: 100%;
  }

  .header .right-side .network-label {
    padding: 0.7rem;
    border: 1px solid #444;
    border-radius: 32px;
  }
</style>
