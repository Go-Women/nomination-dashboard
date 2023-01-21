<script>
  import { Toast, ToastHeader, ToastBody, Col, Row } from "sveltestrap";

  export let totalNominations;
  export let validNominations;
  export let uniqueNominations;
</script>

<Toast class="p-3 mb-3">
  <ToastHeader><h5>Nomination Overview</h5></ToastHeader>
  <ToastBody>
    <Row>
      <Col>{totalNominations}</Col>
      <Col>Total Nominations</Col>
    </Row>
    <Row>
      <Col>{validNominations}</Col>
      <Col>Valid Nominations</Col>
    </Row>
    <Row>
      <Col>{uniqueNominations}</Col>
      <Col>Unique Nominations</Col>
    </Row>
  </ToastBody>
</Toast>
