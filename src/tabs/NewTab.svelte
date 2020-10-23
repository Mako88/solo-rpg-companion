<style lang="scss">
  @import "../imports.scss";

  .outline {
    border: 1px solid $text;
    height: 750px;
    display: flex;
    border-radius: 10px;
  }

  .content {
    margin: auto auto;
    text-align: center;
  }
</style>

<template>
  <div class="outline mt-6 mb-6">
    <div class="content">
      <i class="fas fa-folder-plus fa-9x" />
      <p>Open a text window, a pdf, or an image!</p>
    </div>
  </div>
</template>
