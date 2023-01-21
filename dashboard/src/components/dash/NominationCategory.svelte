<script>
  import { Toast, ToastHeader, ToastBody, Col, Row } from "sveltestrap";

  export let categories;
</script>

<Toast>
  <ToastHeader>Nomination Overview</ToastHeader>
  <ToastBody>
    {#each [...categories] as [key, value]}
      <Row>
        <Col>{key}</Col>
        <Col>{value}</Col>
      </Row>
    {/each}
  </ToastBody>
</Toast>
