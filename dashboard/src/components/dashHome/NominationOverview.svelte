<script lang="js">
  import { Content, Grid, Row, Column, Tile } from "carbon-components-svelte";
  let totalCount = 600;
  let validCount = 587;
  let uniqueCount = 200;
</script>

<Content>
  <Tile>
    <h3>Nomination Overview</h3>
    <Grid>
      <Row>
        <Column>
          <Row><h4>{totalCount}</h4></Row>
          <Row><h4>{validCount}</h4></Row>
          <Row><h4>{uniqueCount}</h4></Row>
        </Column>
        <Column>
          <Row><h5>Total Nominations</h5></Row>
          <Row><h5>Valid Nominations</h5></Row>
          <Row><h5>Unique Nominations</h5></Row>
        </Column>
      </Row>
    </Grid>
  </Tile>
</Content>
