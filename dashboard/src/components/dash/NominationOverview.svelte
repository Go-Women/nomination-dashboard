<script>
  import { Toast, ToastHeader, ToastBody, Col, Row } from "sveltestrap";

  export let totalNominations;
  export let validNominations;
  export let uniqueNominations;
</script>

<Toast>
  <ToastHeader>Nomination Overview</ToastHeader>
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
