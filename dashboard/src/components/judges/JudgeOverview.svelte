<script lang="ts">
  import { Column, Row, Tile, Content } from "carbon-components-svelte";

  export let activeCount;
  export let matchedCount = 5;
  export let inProgressCount = 0;
  export let completedCount = 12;
</script>

<main class="bx--content--main">
  <Row><h3>Overview</h3></Row>
  <Row>
    <Column>
      <Tile>
        <Content class="bx--content--judge-overview">
          <Row><h4>Total Active</h4></Row>
          <Row><h5>{activeCount}</h5></Row>
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
    <Column>
      <Tile>
        <Content class="bx--content--judge-overview">
          <Row><h4>Total In Progress</h4></Row>
          <Row><h5>{inProgressCount}</h5></Row>
        </Content>
      </Tile>
    </Column>
    <Column>
      <Tile>
        <Content class="bx--content--judge-overview">
          <Row><h4>Total Completed</h4></Row>
          <Row><h5>{completedCount}</h5></Row>
        </Content>
      </Tile>
    </Column>
  </Row>
</main>
