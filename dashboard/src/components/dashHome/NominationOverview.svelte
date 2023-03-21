<script lang="ts">
  import { Content, Grid, Row, Column, Tile, ClickableTile } from "carbon-components-svelte";
  export let totalNominations: number;
  export let createdCount;
  export let reviewCount;
</script>

<Content>
  <ClickableTile href="/nominations">
    <h3>Nomination Overview</h3>
    <Grid>
      <Row>
        <Column><Row><h4>{totalNominations}</h4></Row></Column>
        <Column><Row><h5>Submitted Nominations</h5></Row></Column>
      </Row>
      <Row>
        <Column><Row><h4>{reviewCount}</h4></Row></Column>
        <Column><Row><h5>Confirmed Nominations</h5></Row></Column>
      </Row>
      <Row>
        <Column><Row><h4>{createdCount}</h4></Row></Column>
        <Column><Row><h5>Needs Review</h5></Row></Column>
      </Row>
  </Grid>
  </ClickableTile>
</Content>
