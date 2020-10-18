<script>
  import Moveable from "svelte-moveable";

  const frame = {
    translate: [0, 0],
  };

  let roller;
  let handle;
</script>

<style type="text/scss">
  @import "../node_modules/bulma/sass/utilities/_all.sass";
  @import "../node_modules/bulma/sass/grid/_all.sass";

  .roller {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.445);
  }

  .handle {
    cursor: grab;
  }

  .handle:active {
    cursor: grabbing;
  }

  :global(.moveable-origin) {
    display: none !important;
  }

  :global(.moveable-line) {
    background-color: inherit !important;
  }

  img {
    width: 75px;
    height: auto;
  }

  .tile {
    align-items: center;
  }

  .primary {
    color: $primary;
  }
</style>

<div class="tile is-1 is-ancester roller" bind:this={roller}>
  <div class="tile is-vertical is-parent">
    <div class="tile is-child handle" bind:this={handle}>
      <i class="fas fa-grip-lines fa-5x primary" />
    </div>
    <img class="tile is-child" src="images/d4.png" alt="d4" />
  </div>
</div>
<Moveable
  dragTarget={handle}
  target={roller}
  draggable={true}
  throttleDrag={0}
  on:dragStart={({ detail: { set } }) => {
    set(frame.translate);
  }}
  on:drag={({ detail: { target, beforeTranslate } }) => {
    frame.translate = beforeTranslate;
    target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
  }} />
