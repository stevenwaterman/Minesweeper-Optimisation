<script>
  import Cell from "./Cell.svelte";
  import {
    height,
    width,
    cellCount,
    canvasStore,
    cellSize
  } from "./cellsStore.js";
</script>

<main>
  <canvas
    bind:this={$canvasStore}
    width={$width * $cellSize}
    height={$height * $cellSize} />
  {#each Array($cellCount).fill(null) as _, idx}
    <Cell index={idx} />
  {/each}
</main>
