<script lang="ts">
  import {
    Content,
    Breadcrumb,
    BreadcrumbItem,
    Grid,
    Button,
    InlineNotification
  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
</script>

<main>
  <header><Navigation /></header> 
  <Content class="bx--content--main">
    <Grid>
      <Breadcrumb>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem>Matching</BreadcrumbItem>
      </Breadcrumb>
    </Grid>
    <h1>Matching</h1>
    <InlineNotification
      lowContrast
      kind="error"
      subtitle="There aren't any potential matches yet. Click below to generate new matches." />
    <Button iconDescription="View" href={"/home"}>Generate New Matches</Button>
  </Content>
</main>
