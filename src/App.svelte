<script>
  import NavBar from "./components/NavBar.svelte";
  import NewTab from "./tabs/NewTab.svelte";
  import { v4 as uuidv4 } from "uuid";

  let activeTab = uuidv4();

  let tabs = [
    { title: "New Tab", type: "new", id: activeTab },
    { title: "+", id: "add" },
  ];

  const getActiveTab = () => tabs.filter((x) => x.id === activeTab)[0];
</script>

<style lang="scss">
  @import "./imports.scss";
</style>

<svelte:head>
  <script defer src="https://use.fontawesome.com/releases/v5.15.1/js/all.js">
  </script>
</svelte:head>
<main>
  <NavBar {tabs} {activeTab} />
  <div class="container">
    {#if getActiveTab().type === 'new'}
      <NewTab />
    {/if}
  </div>
  <p>d4, d6, d8, d10, d12, and d20 by Lonnie Tapscott from the Noun Project</p>
</main>
