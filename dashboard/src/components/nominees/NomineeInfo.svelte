<script lang="ts">
  import { Column, Grid, Row } from "carbon-components-svelte";
    import AffiliatedNomination from "./AffiliatedNomination.svelte";

  export let nominee: any;
  export let keys: any;
  let fullName = `${nominee.firstName} ${nominee.lastName}`;
</script>

<main>
  <div class="bx--content--overview nom-body">
    <h2>{`#${nominee.ID} - ${fullName}`}</h2>
    <Grid>
      <Row>
        <Column>Full Name</Column>
        <Column>{fullName}</Column>
      </Row>
      <Row>
        <Column>Year of Birth</Column>
        <Column>{nominee.yob}</Column>
      </Row>
      <Row>
        <Column>Contribution Areas</Column>
        <Column>{nominee.category}</Column>
      </Row>
      <Row>
        <Column>Contribution Subcategories</Column>
        <Column>{nominee.subcategory}</Column>
      </Row>
    </Grid>
    <h3>Submitted Nominations</h3>
    {#each nominee.nominations as nomination}
      <AffiliatedNomination nomination={nomination} keys={keys} />
    {/each}
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 15% 1fr 15%;
    grid-template-rows: 1fr;
    font-size: 12pt;
  }

  .nom-body {
    grid-column: 2;
    grid-row: 1;
  }
</style>