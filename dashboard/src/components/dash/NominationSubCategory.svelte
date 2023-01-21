<script>
  import { Toast, ToastHeader, ToastBody, Col, Row } from "sveltestrap";

  export let subCategories;
</script>

<Toast class="p-3 mb-3">
  <ToastHeader><h5>Nominees By Subcategory</h5></ToastHeader>
  <ToastBody>
    {#each [...subCategories] as [key, value]}
      <Row>
        <Col>{key}</Col>
        <Col>{value}</Col>
      </Row>
    {/each}
  </ToastBody>
</Toast>
