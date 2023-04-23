<script lang="ts">
  import { Button, Column, Grid, Row } from "carbon-components-svelte";
  import AffiliatedNomination from "./AffiliatedNomination.svelte";
  import {Edit, Group, Save} from "carbon-icons-svelte";
  import Cancel from "carbon-icons-svelte/lib/Close.svelte";
  import Nominee from "./Nominee.svelte";

  export let nominee: any;
  export let keys: any;
  export let nominations: any[];
  export let review: boolean;

  const fullName = `${nominee.firstName} ${nominee.lastName}`;
</script>

<main>
  <div class="bx--content--overview nom-body">
    <h2>{`#${nominee.ID} - ${fullName}`}</h2>
    <Nominee {nominee} {review}/>
    <div class="submissions">
      <h3>Submitted Nominations</h3>
      {#each nominations as nomination}
        <AffiliatedNomination {nomination} {keys} {review}/>
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 15% 1fr 15%;
    grid-template-rows: 1fr;
    font-size: 12pt;
  }

  .submissions {
    margin-top: 4rem;
  }
  
  .nom-body {
    grid-column: 2;
    grid-row: 1;
  }
</style>
