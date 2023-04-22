<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../../../css/index.css";
  import Judge from "../../../../components/judges/Judge.svelte";
  import {
    Content,
    Column,
    Row,
    Breadcrumb,
    BreadcrumbItem,
    Grid,
  } from "carbon-components-svelte";
  export let data;
  export let { j } = data.props;
</script>

<main>
  <body>
    <Content>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/home">Home</BreadcrumbItem>
          <BreadcrumbItem href="/judges">Judges</BreadcrumbItem>
          <BreadcrumbItem>{j.firstName} {j.lastName}</BreadcrumbItem>
        </Breadcrumb>

        <Grid>
          <Column>
            <Row><h1>Judge</h1></Row>
            <Judge judge={j} />
          </Column>
        </Grid>
      </Column>
    </Content>
  </body>
</main>
