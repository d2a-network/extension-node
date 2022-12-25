<script>
  import Header from "../src/components/header.svelte";
  import { getCurrentTab } from "../src/utils"
  import { currentPlatform, nodeId } from "../src/store";
  import Twitter from "../src/views/twitter.svelte"
  import EksiSozluk from "../src/views/eksisozluk.svelte";
  import Platforms from "./views/platforms.svelte";

  chrome.storage.local.get("nodeId", function (data) {
    const avatarString = "node-" + data.nodeId.substring(0, 8);
    nodeId.set(data.nodeId);
    chrome.storage.local
    .set({
    nodeAvatar: `https://avatars.dicebear.com/api/adventurer/${avatarString}.svg`,
    })
    .then(() => {});
  })

  async function findCurrentPlatform()
  {
    const {url} = await getCurrentTab()
    const {hostname} = new URL(url)
    
    if(hostname != 'twitter.com' && hostname != 'eksisozluk.com') return;

    currentPlatform.set(hostname)
  }

  if(!$currentPlatform){
    findCurrentPlatform()
  }
</script>

<Header />

{#if !$currentPlatform}
  <Platforms />
{/if}

{#if $currentPlatform == 'twitter.com'}
  <Twitter />
{/if}

{#if $currentPlatform == 'eksisozluk.com'}
  <EksiSozluk />
{/if}
