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

function createCellsStore() {
  const width = 100;
  const height = 100;
  const initial = {
    width,
    height,
    cells: generateCells(width * height)
  };
  const { subscribe, set, update } = writable(initial);
  return {
    subscribe,
    reveal: idx =>
      update(state => {
        state.cells[idx].stateKnown = true;
        return state;
      })
  };
}
export const cellsStore = createCellsStore();

export const width = derived(
  [cellsStore],
  ([$cellsStore]) => $cellsStore.width
);
export const height = derived(
  [cellsStore],
  ([$cellsStore]) => $cellsStore.height
);
export const cellCount = derived(
  [width, height],
  ([$width, $height]) => $width * $height
);

export function deriveCellStore(idx) {
  return derived([cellsStore], ([$cellsStore]) => $cellsStore.cells[idx]);
}

export function deriveSurroundingsStore(idx, width, height) {
  const idxs = surroundingIndices(idx, width, height);
  const store = derived([cellsStore], ([$cellsStore]) =>
    idxs.map(idx => $cellsStore.cells[idx])
  );
  return {
    ...store,
    reveal: () => idxs.forEach(cellsStore.reveal)
  }
}
