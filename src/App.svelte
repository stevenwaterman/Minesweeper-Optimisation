<script>
  import Cell from "./Cell.svelte";
  import { cellCount, width, height } from "./cellsStore.js";
</script>

<style>
  .board {
    display: grid;
    
  }
</style>

<main>
  <div class="board" style={`grid-template-columns: repeat(${$width}, 8px); grid-template-rows: repeat(${$height}, 8px)`}>
  {#each Array($cellCount).fill(null) as _, idx}
        <Cell index={idx} />
  {/each}
  </div>
</main>
