<script>
  import { deriveCellStore, deriveSurroundingsStore, width, height } from "./cellsStore";

  export let index;
  $: me = deriveCellStore(index);
  $: surroundings = deriveSurroundingsStore(index, $width, $height);

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
  $: if (isMine) {
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

  let backgroundColor;
  $: if (stateKnown) {
    backgroundColor = isMine ? "#f55" : "white";
  } else {
    backgroundColor = null;
  }

  let cellText;
  $: if(stateKnown){
    cellText = isMine ? "X" : adjacentMinesCount;
  } else {
    cellText = "";
  }
</script>

<style>
  .cell {
    border: 1px solid #aaa;
    background-color: #ddd;
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
