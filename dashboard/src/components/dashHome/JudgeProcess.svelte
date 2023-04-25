<script lang="ts">
  import {
    Content,
    Grid,
    Row,
    Column,
    ClickableTile,
  } from "carbon-components-svelte";

  export let judges: any;

  function getJudgeCounts() {
    var activeCount = 0;
    var appliedCount = 0;
    var rejectedCount = 0;
    Object.entries(judges).forEach(([key, judge], index) => {
      switch (judge.info["judgeStatus"]) {
        case "Active":
          activeCount += 1;
          break;
        case "Applied":
          appliedCount += 1;
          break;
        case "Rejected":
          rejectedCount += 1;
          break;
        default:
          break;
      }
    });
    return [activeCount, appliedCount, rejectedCount]; 
  }

  const total = judges.length;
  const activeCount = getJudgeCounts()[0];
  const appliedCount = getJudgeCounts()[1];
  const rejectedCount = getJudgeCounts()[2];
</script>

<Content>
  <ClickableTile href="/judges">
    <h3>Judge Content</h3>
    <Grid>
        <Row>
          <Column><Row><h4>{total}</h4></Row></Column>
          <Column><Row><h4>Total</h4></Row></Column>
        </Row>
        <Row>
          <Column><Row><h4>{appliedCount}</h4></Row></Column>
          <Column><Row><h5>Applied</h5></Row></Column>
        </Row>
        <Row>
          <Column><Row><h4>{activeCount}</h4></Row></Column>
          <Column><Row><h5>Active</h5></Row></Column>
        </Row>
        <Row>
          <Column><Row><h4>{rejectedCount}</h4></Row></Column>
          <Column><Row><h5>Rejected</h5></Row></Column>
        </Row>
    </Grid>
  </ClickableTile>
</Content>
