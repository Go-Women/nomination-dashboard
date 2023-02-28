<script lang="ts">
  import {
    Content,
    Breadcrumb,
    BreadcrumbItem,
    Grid,
    Button,
    InlineNotification,
    DataTable
  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";

  let buttonClicked = false;
  function showMatches() {
    buttonClicked = true;
  }
</script>

<main>
  <header><Navigation /></header>
  <Content class="bx--content--main">
    <Grid>
      <Breadcrumb>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem>Matching</BreadcrumbItem>
      </Breadcrumb>

      <h1>Matching</h1>
      {#if buttonClicked === false}
        <InlineNotification
          lowContrast
          kind="error"
          subtitle="There aren't any potential matches yet. Click below to generate new matches."
        />
      {/if}
      <Button iconDescription="View" on:click|once={showMatches}>Generate New Matches</Button>

      {#if buttonClicked === true}
        <DataTable
            headers={[
              { key: "nomineeName", value: "Nominee Name" },
              { key: "nomineeCategory", value: "Nominee Category" },
              { key: "judgeName", value: "Judge Name" },
              { key: "judgeCategory", value: "Judge Category" },
              { key: "judgeCapacity", value: "Judge Capacity" },
              { key: "action", value: "Action" },
            ]}
            rows={[]}
          />
      {/if}
    </Grid>
  </Content>
</main>
