<script>
  import {
    cellStores,
    surroundingStores,
    width,
    height,
    cellSize,
    canvasStore
  } from "./cellsStore";

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
$: x = Math.floor(index / $width);
  $: y = index % $width;
  $: rectanglePixelX = x * $cellSize;
  $: rectanglePixelY = y * $cellSize;
  $: textPixelX = rectanglePixelX + $cellSize / 2;
  $: textPixelY = rectanglePixelY + $cellSize / 2;

  $: light = (x + y) % 2 === 0;
  $: text = isMine ? "X" : adjacentMinesCount;
  $: textColor = isMine
    ? "white"
    : [
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

  function getBackgroundColor(stateKnown, isMine, light) {
    if (stateKnown && isMine && light) return "#f55";
    if (stateKnown && isMine && !light) return "#d33";
    if (stateKnown && !isMine && light) return "#fff";
    if (stateKnown && !isMine && !light) return "#ccc";
    if (!stateKnown && light) return "#aaa";
    if (!stateKnown && !light) return "#777";
  }

  $: backgroundColor = getBackgroundColor(stateKnown, isMine, light);

  function drawCell(
    ctx,
    rectanglePixelX,
    rectanglePixelY,
    textPixelX,
    textPixelY,
    size,
    stateKnown,
    text,
    textColor,
    backgroundColor
  ) {
    if (ctx === null) return;
    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.rect(rectanglePixelX, rectanglePixelY, size, size);
    ctx.fill();
    if (stateKnown) {
      ctx.fillStyle = textColor;
      ctx.fillText(text, textPixelX, textPixelY);
    }
  }

  $: ctx = $canvasStore === null ? null : $canvasStore.getContext("2d");

  $: if(ctx != null) ctx.font = $cellSize - 1 + "px arial";
  $: if(ctx != null) ctx.textAlign = "center";
  $: if(ctx != null) ctx.textBaseline = "middle";

  $: drawCell(
    ctx,
    rectanglePixelX,
    rectanglePixelY,
    textPixelX,
    textPixelY,
    $cellSize,
    stateKnown,
    text,
    textColor,
    backgroundColor
  );
</script>
