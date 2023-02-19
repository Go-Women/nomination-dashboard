<script lang="ts">
  import { Column, Row, Tile, Content, Grid } from "carbon-components-svelte";

  export let totalNominations: number;
  export let reviewCount = 0;
  export let artCount: number;
  export let athleticsCount: number;
  export let businessCount: number;;
  export let eduCount: number;
  export let humanitiesCount: number;
  export let govCount: number;
  export let stemCount: number;
  export let otherCount: number;
</script>

<main class="bx--content--overview">
  <Grid>
    <Column>
      <Row><h3>Overview</h3></Row>
      <Row>
        <Column>
          <Tile>
            <Content class="bx--content--judge-overview">
              <!-- this would nominations with a status of "created" -->
              <Row><h4>Total Nominations</h4></Row>
              <Row><h5>{totalNominations}</h5></Row>
            </Content>
          </Tile>
        </Column>
        <Column>
          <Tile>
            <Content class="bx--content--judge-overview">
              <Row><h4>Total Reviewed</h4></Row>
              <Row><h5>{reviewCount}</h5></Row>
            </Content>
          </Tile>
        </Column>
      </Row>
      <Row><h4>Categories Totals</h4></Row>
      <Row>
        <Column>
          <Tile>
            <Content class="bx--content--judge-overview">
              <Row><h4>Art</h4></Row>
              <Row><h5>{artCount}</h5></Row>
            </Content>
          </Tile>
        </Column>
        <Column>
          <Tile>
            <Content class="bx--content--judge-overview">
              <Row><h4>Athletics</h4></Row>
              <Row><h5>{athleticsCount}</h5></Row>
            </Content>
          </Tile>
        </Column>
        <Column>
          <Tile>
            <Content class="bx--content--judge-overview">
              <Row><h4>Business</h4></Row>
              <Row><h5>{businessCount}</h5></Row>
            </Content>
          </Tile>
        </Column>
        <Column>
          <Tile>
            <Content class="bx--content--judge-overview">
              <Row><h4>Education</h4></Row>
              <Row><h5>{eduCount}</h5></Row>
            </Content>
          </Tile>
        </Column>
        <Column>
          <Tile>
            <Content class="bx--content--judge-overview">
              <Row><h4>Humanities</h4></Row>
              <Row><h5>{humanitiesCount}</h5></Row>
            </Content>
          </Tile>
        </Column>
        <Column>
          <Tile>
            <Content class="bx--content--judge-overview">
              <Row><h5>Public Service / Government</h5></Row>
              <Row><h6>{govCount}</h6></Row>
            </Content>
          </Tile>
        </Column>
        <Column>
          <Tile>
            <Content class="bx--content--judge-overview">
              <Row><h4>STEM</h4></Row>
              <Row><h5>{stemCount}</h5></Row>
            </Content>
          </Tile>
        </Column>
        <Column>
          <Tile>
            <Content class="bx--content--judge-overview">
              <Row><h4>Other</h4></Row>
              <Row><h5>{otherCount}</h5></Row>
            </Content>
          </Tile>
        </Column>
      </Row>
    </Column>
  </Grid>
</main>
