<script>
  import Cell from "./Cell.svelte";
  import { width, height, cellCount, regenerate } from "./cellsStore.js";
  $: rows = Array($height)
    .fill(null)
    .map((_, y) =>
      Array($width)
        .fill(null)
        .map((_, x) => x + y * $width)
    );

  function createSections(
    sectionsWide,
    defaultSectionWidth,
    finalSectionWidth,
    sectionsTall,
    defaultSectionHeight,
    finalSectionHeight,
    boardWidth
  ) {
    const sections = [];
    for (let sectionY = 0; sectionY < sectionsTall; sectionY++) {
      for (let sectionX = 0; sectionX < sectionsWide; sectionX++) {
        const height =
          sectionY === sectionsTall - 1
            ? finalSectionHeight
            : defaultSectionHeight;
        const width =
          sectionX === sectionsWide - 1
            ? finalSectionWidth
            : defaultSectionWidth;

        const firstIndex =
          sectionY * defaultSectionHeight * boardWidth +
          sectionX * defaultSectionWidth;
        const indices = [];
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const offset = x + y * boardWidth;
            indices.push(firstIndex + offset);
          }
        }
        sections.push({
          x: sectionX,
          y: sectionY,
          width,
          height,
          indices
        });
      }
    }
    return sections;
  }

  $: cellsPerSectionTarget = Math.max(20, $cellCount / 100);
  $: sectionSize = Math.round(Math.sqrt(cellsPerSectionTarget));

  $: sectionsWide = Math.ceil($width / sectionSize);
  $: sectionsTall = Math.ceil($height / sectionSize);
  $: finalSectionWidth = $width - (sectionsWide - 1) * sectionSize;
  $: finalSectionHeight = $height - (sectionsTall - 1) * sectionSize;

  $: sections = createSections(
    sectionsWide,
    sectionSize,
    finalSectionWidth,
    sectionsTall,
    sectionSize,
    finalSectionHeight,
    $width
  );
</script>

<style>
  .sectionGrid {
    display: grid;
    grid-gap: 0px;
  }

  .boardSection {
    display: grid;
    grid-gap: 0px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
</style>

<main>
  <div
    class="sectionGrid"
    style="grid-template-columns: repeat({sectionsWide}, {sectionSize * 8}px);
    grid-template-rows: repeat({sectionsTall}, {sectionSize * 8}px)">
    {#each sections as section}
      <div
        class="boardSection"
        style="grid-template-columns: repeat({section.width}, 8px);
        grid-template-rows: repeat({section.height}, 8px)">
        {#each section.indices as idx}
          <Cell index={idx} />
        {/each}
      </div>
    {/each}
  </div>
</main>
