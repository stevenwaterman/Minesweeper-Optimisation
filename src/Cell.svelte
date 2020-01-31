<script>
  import { cellStores, surroundingStores, width } from "./cellsStore";

  export let index;
  $: me = cellStores[index];
  $: surroundings = surroundingStores[index];

  $: isMine = $me.isMine;
  $: stateKnown = $me.stateKnown;
  $: createsConstraint = stateKnown && !isMine;

  $: unknownCellsCount = $surroundings.filter(cell => !cell.stateKnown).length;
  $: adjacentMinesCount = $surroundings.filter(cell => cell.isMine).length;
  $: knownMinesCount = $surroundings.filter(
    cell => cell.isMine && cell.stateKnown
  ).length;
  $: remainingMinesCount = adjacentMinesCount - knownMinesCount;

  $: clearable = createsConstraint && adjacentMinesCount === knownMinesCount;
  $: flaggable = createsConstraint && remainingMinesCount === unknownCellsCount;

  $: if (clearable) setTimeout(() => surroundings.reveal(), 0);
  $: if (flaggable) setTimeout(() => surroundings.reveal(), 0);

  let textColor;
  $: if (!stateKnown) {
    textColor = "transparent";
  } else if (isMine) {
    textColor = "white";
  } else {
    textColor = [
      "transparent",
      "blue",
      "green",
      "red",
      "purple",
      "maroon",
      "#0aa",
      "black",
      "#444"
    ][adjacentMinesCount];
  }

  $: x = Math.floor(index / $width);
  $: y = index % $width;
  $: light = (x + y) % 2 === 0;
  function getBackgroundColor(stateKnown, isMine, light) {
    if (stateKnown && isMine) return "#f55";
    if (stateKnown && !isMine && light) return "#fff";
    if (stateKnown && !isMine && !light) return "#ddd";
    if (!stateKnown && light) return "#aaa";
    if (!stateKnown && !light) return "#999";
  }
  $: backgroundColor = getBackgroundColor(stateKnown, isMine, light);

  $: cellText = isMine ? "X" : adjacentMinesCount;
</script>

<style>
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5pt;
    font-weight: 700;
    height: 8px;
    width: 8px;
  }
</style>

<div
  class="cell"
  style="color: {textColor}; background-color: {backgroundColor}">
  {cellText}
</div>
