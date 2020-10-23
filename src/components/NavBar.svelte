<script>
  import DiceRoller from "./DiceRoller.svelte";
  export let tabs;
  export let activeTab;
</script>

<style lang="scss">
  @import "../imports.scss";

  .tabs {
    width: 100%;
  }
</style>

<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <nav class="tabs">
          <ul>
            {#each tabs as tab}
              <li class:is-active={tab.id === activeTab}>
                <a href="#{tab.id}">
                  <span class="icon is-small">
                    <i class="fas fa-scroll" />
                  </span>
                  <span>{tab.title}</span>
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <DiceRoller />
      </div>
    </div>
  </div>
</template>
