import { writable, derived, get } from "svelte/store";
import { shuffle, surroundingIndices } from "./Utils";

function generateCells(cellCount) {
  const mines = Math.floor(cellCount * 0.1);
  const clearCellCount = cellCount - mines;

  const clearCells = Array(clearCellCount - 1)
    .fill(null)
    .map(() => ({
      isMine: false,
      stateKnown: false
    }));
  const knownCells = Array(1)
    .fill(null)
    .map(() => ({
      isMine: false,
      stateKnown: true
    }));
  const mineCells = Array(mines)
    .fill(null)
    .map(() => ({
      isMine: true,
      stateKnown: false
    }));

  return shuffle([...clearCells, ...knownCells, ...mineCells]);
}
export const canvasStore = writable(null);
export const width = writable(100);
export const height = writable(100);
export const cellSize = derived([width, height], ([$width, $height]) =>
  Math.floor(800 / Math.max($width, $height))
);
export const cellCount = derived(
  [width, height],
  ([$width, $height]) => $width * $height
);
export const cellStores = generateCells(get(cellCount)).map(createCellStore);
export const surroundingStores = cellStores.map((_, idx) =>
  createSurroundingsStore(idx)
);

export function regenerate() {
  generateCells(get(cellCount)).forEach((newCell, idx) =>
    cellStores[idx].set(newCell)
  );
}

function createCellStore(cell) {
  const { subscribe, set, update } = writable(cell);
  return {
    subscribe,
    set,
    reveal: () => update(cell => ({ ...cell, stateKnown: true }))
  };
}

export function createSurroundingsStore(idx) {
  const idxs = surroundingIndices(idx, get(width), get(height));
  const relevantStores = idxs.map(idx => cellStores[idx]);
  // @ts-ignore
  const store = derived(relevantStores, values => values);
  return {
    ...store,
    reveal: () => relevantStores.forEach(store => store.reveal())
  };
}
