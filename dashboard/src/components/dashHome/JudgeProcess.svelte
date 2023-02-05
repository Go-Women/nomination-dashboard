<script lang="ts">
  import {
    Content,
    Grid,
    Row,
    Column,
    ClickableTile,
  } from "carbon-components-svelte";

  let notOpenedCount = 4;
  let inProgressCount = 10;
  let completedCount = 6;
</script>

<Content>
  <ClickableTile href="/judges">
    <h3>Judge Content</h3>
    <Grid>
        <Row>
          <Column><Row><h4>{notOpenedCount}</h4></Row></Column>
          <Column><Row><h5>Not Opened</h5></Row></Column>
        </Row>
        <Row>
          <Column><Row><h4>{inProgressCount}</h4></Row></Column>
          <Column><Row><h5>In-Progress</h5></Row></Column>
        </Row>
        <Row>
          <Column><Row><h4>{completedCount}</h4></Row></Column>
          <Column><Row><h5>Completed</h5></Row></Column>
        </Row>
    </Grid>
  </ClickableTile>
</Content>
