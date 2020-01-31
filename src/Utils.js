export function surroundingIndices(index, width, height) {
  const x = index % width;
  const y = Math.floor(index / width);
  const newCoords = [
    [x-1, y-1],
    [x, y-1],
    [x+1, y-1],
    [x-1, y],
    [x+1, y],
    [x-1, y+1],
    [x, y+1],
    [x+1, y+1]
  ];
  const insideGrid = newCoords
  .filter(coords => coords[0] >= 0)
  .filter(coords => coords[1] >= 0)
  .filter(coords => coords[0] < width)
  .filter(coords => coords[1] < height);
  return insideGrid.map(coords => coords[0] + coords[1] * width);
}

export function shuffle(array) {
  let temp;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}