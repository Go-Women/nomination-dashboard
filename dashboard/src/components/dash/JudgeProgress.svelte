<script>
  import { Toast, ToastHeader, ToastBody, Col, Row} from 'sveltestrap';

  export let notOpen;
  export let inProgress;
  export let completed;
</script>

<Toast>
  <ToastHeader>Judge Progress</ToastHeader>
  <ToastBody>
    <Row>
      <Col>{notOpen}</Col>
      <Col>Not Opened</Col> 
    </Row>
    <Row>
      <Col>{inProgress}</Col>
      <Col>In Progress</Col> 
    </Row>
    <Row>
      <Col>{completed}</Col>
      <Col>Completed</Col> 
    </Row>
  </ToastBody>
</Toast>