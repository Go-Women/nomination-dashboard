<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../../css/index.css";
  import {
    Content,
    Column,
    Row,
    Breadcrumb,
    BreadcrumbItem,
    Grid,
  } from "carbon-components-svelte";
  export let data;
  export let { m } = data.props;
</script>

<main>
  <body>
    <Content>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/home">Home</BreadcrumbItem>
          <BreadcrumbItem href="/matches">Matches</BreadcrumbItem>
          <BreadcrumbItem>{m.nomFullName}</BreadcrumbItem>
        </Breadcrumb>

        <Grid>
          <Column>
            <Row><h1>Match</h1></Row>
            <Row
              ><h4>
                Nominee: {m.nomFullName} -> Judge: {m.judgeFullName}
              </h4></Row
            >
          </Column>
        </Grid>
      </Column>
    </Content>
  </body>
</main>
