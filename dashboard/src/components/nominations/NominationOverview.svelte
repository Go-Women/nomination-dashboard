<script lang="ts">
  import { BarChartSimple } from "@carbon/charts-svelte";
  import "@carbon/charts/styles.css";
  import "@carbon/styles/css/styles.css";

  import { Column, Row, Tile, Content } from "carbon-components-svelte";

  export let totalNominations: number;
  export let reviewCount = 0;
  export let artCount: number;
  export let athleticsCount: number;
  export let businessCount: number;
  export let eduCount: number;
  export let humanitiesCount: number;
  export let govCount: number;
  export let stemCount: number;
  export let otherCount: number;

  const totalLefttoReview = totalNominations - reviewCount;

  let data = [
    {
      group: "Art",
      value: 0,
    },
    {
      group: "Athletics",
      value: 0,
    },
    {
      group: "Business",
      value: 0,
    },
    {
      group: "Education",
      value: 0,
    },
    {
      group: "Humanities",
      value: 0,
    },
    {
      group: "Public Service / Government",
      value: 0,
    },
    {
      group: "STEM",
      value: 0,
    },
    {
      group: "Other",
      value: { otherCount },
    },
  ];
  data[0].value = artCount;
  data[1].value = athleticsCount;
  data[2].value = businessCount;
  data[3].value = eduCount;
  data[4].value = humanitiesCount;
  data[5].value = govCount;
  data[6].value = stemCount;
  data[7].value = otherCount;

  let options = {
    title: "Categories",
    axes: {
      left: {
        mapsTo: "value",
      },
      bottom: {
        mapsTo: "group",
        scaleType: "labels",
      },
    },
    height: "200%",
  };
</script>

<main class="content--overview">
  <div class="chart">
    <Row>
      <Column>
        <Tile>
          <BarChartSimple {data} {options} />
        </Tile>
      </Column>
    </Row>
  </div>
  <div class="info info-top">
    <div class="info-data">
      <!-- this would nominations with a status of "Reviewed" -->
      <h4>Total Reviewed</h4>
      <h5>{reviewCount}</h5>
    </div>
  </div>
  <div class="info info-btm">
    <div class="info-data">
      <!-- TODO: change this later for now this checks just reviewed -->
      <!-- this would nominations minus status of reviewed, matched, selected, or rejected -->
      <h4>Needs Review</h4>
      <h5>{totalLefttoReview}</h5>
    </div>
  </div>
</main>

<style>
  .content--overview {
    display: grid;
    grid-template-columns: 20% 60% 30% 10%;
    grid-template-rows: 50% 50%;
    padding: 0;
    row-gap: 0.5em;
    column-gap: 0;
  }

  .chart {
    grid-row: span 2;
    grid-column: 2;
    height: 100%;
  }

  .info-top {
    display: grid;
    grid-row: 1;
    grid-column: 3;
    margin: 1.5em;
    background-color: white;
  }

  .info-btm {
    display: grid;
    grid-row: 2;
    grid-column: 3;
    margin: 1.5em;
    background-color: white;
  }

  .info-data {
    padding: 0;
    justify-items: center;
    display: grid;
    text-align: center;
  }
</style>
