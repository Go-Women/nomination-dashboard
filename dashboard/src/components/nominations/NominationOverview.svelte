<script lang="ts">
  import { BarChartSimple } from "@carbon/charts-svelte";

  import "@carbon/styles/css/styles.css";
  import "@carbon/charts/styles.css";
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
    height: "400px",
  };
</script>

<main class="content--overview">
  <Row>
    <Column>
      <Tile>
        <BarChartSimple {data} {options} />
      </Tile>
    </Column>
    <Column>
      <Row>
        <div class="info">
          <Tile>
            <Content style="padding: 2rem 0 2rem 0;">
              <div class="info-data">
                <!-- this would nominations with a status of "Reviewed" -->
                <Row><h4>Total Reviewed</h4></Row>
                <Row><h5>{reviewCount}</h5></Row>
              </div></Content
            >
          </Tile>
        </div>
      </Row>
      <Row>
        <div class="info">
          <Tile>
            <Content style="padding: 2rem 0 2rem 0;">
              <div class="info-data">
                <!-- TODO: change this later for now this checks just reviewed -->
                <!-- this would nominations minus status of reviewed, matched, selected, or rejected -->
                <Row><h4>Need to be Reviewed</h4></Row>
                <Row><h5>{totalLefttoReview}</h5></Row>
              </div>
            </Content>
          </Tile>
        </div>
      </Row>
    </Column>
  </Row>
</main>

<style>
  .content--overview {
    padding: 1rem 0 2rem 0;
  }

  .info {
    padding: 2rem 0 2rem 0;
    width: 100%;
    display: grid;
  }

  .info-data {
    padding: 0;
    justify-items: center;
    display: grid;
    text-align: center;
  }
</style>
