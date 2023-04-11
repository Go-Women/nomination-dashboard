<script lang="ts">
  import { Column, Row, Tile, Content } from "carbon-components-svelte";

  export let reviewCount: number;
  export let manualCount: number;
  export let matchedCount: number;
</script>

<main class="bx--content--overview">
  <Row><h3>Overview</h3></Row>
  <Row>
    <Column>
      <Tile>
        <Content class="bx--content--judge-overview">
          <Row><h4>Needs Review</h4></Row>
          <Row><h5>{reviewCount}</h5></Row>
        </Content>
      </Tile>
    </Column>
    <Column>
      <Tile>
        <Content class="bx--content--judge-overview">
          <Row><h4>Manual Matches</h4></Row>
          <Row><h5>{manualCount}</h5></Row>
        </Content>
      </Tile>
    </Column>
    <Column>
      <Tile>
        <Content class="bx--content--judge-overview">
          <Row><h4>Total Matched</h4></Row>
          <Row><h5>{matchedCount}</h5></Row>
        </Content>
      </Tile>
    </Column>
  </Row>
</main>
