<script lang="ts">
  import {
    Content,
    Row,
    Column,
    ClickableTile,
    Grid,
  } from "carbon-components-svelte";

  export var matches: any;
  export var nominees: any;
  export var judges: any;

  function getNomineeCount() {
    var reviewCount = 0;
    var manualCount = 0;
    var selected = 0;
    var capacityCount = 0;
    Object.entries(nominees).forEach(([key, nominee], index) => {
      switch (nominee.nomStatus) {
        case "Reviewed":
          reviewCount += 1;
          break;
        case "Manual Review":
          manualCount += 1;
          break;
        case "Selected":
          selected += 1;
          break;
        case "Capacity":
          capacityCount += 1;
          break;
        default:
          break;
      }
    });
    return [capacityCount, selected, reviewCount, manualCount]; 
  }

  function getJudgeCount() {
    var reviewedCount = 0;
    var capacityCount = 0;
    Object.entries(judges).forEach(([key, judge], index) => {
      switch (judge.info["judgeStatus"]) {
        case "Judged Reviewed":
          reviewedCount += 1;
          break;
        case "Capacity":
          capacityCount += 1;
          break;
        default:
          break;
      }
    });
    return [reviewedCount, capacityCount]; 
  }

  const totalMatches: number = matches.length;
  const nomMatches: number = getNomineeCount()[0];
  const nomSelected: number = getNomineeCount()[1];
  const nomReview: number = getNomineeCount()[2];
  const nomManual: number = getNomineeCount()[3];
  const judgeCapacity: number = getJudgeCount()[1];
  const matchedJudges: number = getJudgeCount()[0];
</script>

<Content>
  <ClickableTile href="/matches">
    <h3>Matches</h3>
    <Grid>
      <Row><Column sm={{ span: 2, offset: 1 }}><h4>Totals</h4></Column></Row>
      <Row>
        <Column><Row><h4>{totalMatches}</h4></Row></Column>
        <Column><Row><h5>Confirmed</h5></Row></Column>
      </Row>
      <Row>
        <Column><Row><h4>{nomReview}</h4></Row></Column>
        <Column><Row><h5>Needs Review</h5></Row></Column>
      </Row>
      <Row>
        <Column><Row><h4>{nomManual}</h4></Row></Column>
        <Column><Row><h5>Manual Review Needed</h5></Row></Column>
      </Row>
      <Row>
        <Column><Row><h4>{matchedJudges}</h4></Row></Column>
        <Column><Row><h5>Reviewed by Judges</h5></Row></Column>
      </Row>
      
      <Row><Column sm={{ span: 2, offset: 1 }}><h4>Capacity Max</h4></Column></Row>
      <Row>
        <Column><Row><h4>{nomMatches}</h4></Row></Column>
        <Column><Row><h5>Nominees</h5></Row></Column>
      </Row>
      <Row>
        <Column><Row><h4>{judgeCapacity}</h4></Row></Column>
        <Column><Row><h5>Judges</h5></Row></Column>
      </Row>
      <br>
      <Row>
        <Column><Row><h4>{nomSelected}</h4></Row></Column>
        <Column><Row><h4><em>Nominees Selected</em></h4></Row></Column>
      </Row>
    </Grid>
  </ClickableTile>
</Content>
