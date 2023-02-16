<script lang="ts">
  import { Column, Grid, Row } from "carbon-components-svelte";
    import AffiliatedNomination from "./AffiliatedNomination.svelte";

  export let nominee: any;
  export let keys: any;
  let fullName = `${nominee['first-name']} ${nominee['last-name']}`;

  /**
   * Transforms a comma-separated list of codes to their full values
   * @param input String to transform
   */
  let kg = (input: string): string => {
    let result = "";
    let splits = input.split(",");
    for (let split of splits) {
      result += `${keys[split]}, `;
    }
    return result.substring(0, result.length - 2);
  }
</script>

<main>
  <div class="bx--content--overview nom-body">
    <h2>{`#${nominee['id']} - ${fullName}`}</h2>
    <Grid>
      <Row>
        <Column>Full Name</Column>
        <Column>{fullName}</Column>
      </Row>
      <Row>
        <Column>Year of Birth</Column>
        <Column>{nominee['yob']}</Column>
      </Row>
      <Row>
        <Column>Contribution Areas</Column>
        <Column>{kg(nominee['contrib-area'])}</Column>
      </Row>
      <Row>
        <Column>Contribution Subcategories</Column>
        <Column>{kg(nominee['contrib-area-sub'])}</Column>
      </Row>
    </Grid>
    <h3>Submitted Nominations</h3>
    {#each nominee['nominations'] as nomination}
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