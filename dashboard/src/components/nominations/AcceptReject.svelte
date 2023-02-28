<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, Column, DataTable, Form, Grid, RadioButton, RadioButtonGroup, Row, TextArea } from "carbon-components-svelte";
  import View from "carbon-icons-svelte/lib/Launch.svelte";
  import Merge from "./Merge.svelte";

  export let incomingRowIds: string[];
  export let nominations: any[];
  export let mergeCandidates: any[];

  const norow = { data: { id: 'b-0' }, id: 'b-0', nominee: 'No, this is a unique nomination.', category: '', yob: '' };

  $: rows = [norow, ...mergeCandidates.map((c, idx) => ({
    data: { id: `b-${c.ID}` },
    id: `b-${c.ID}`,
    nominee: `${c.firstName} ${c.lastName}`,
    category: c.category,
    yob: c.yob
  }))];
  let selectedRowIds: string[] = ['b-0'];
  $: selectedNominee = selectedRowIds[0].substring(2);

  $: nom = nominations.find(n => n.ID == incomingRowIds[0].substring(2)) || {};

  let validated: string[] = [];
</script>

<main>
  <div class="nom-information">
    <ul class="no-style">
      <li>Name: {nom['nomFirst']} {nom['nomLast']} &mdash; Born: {nom['nomYOB']}</li>
      <li class="break">Contribution Areas: {nom.category}</li>
      <!-- {#if nom['nom-contrib-area-sub-description']}
      <li>User-Submitted Area: {nom['nom-contrib-area-sub-description']}</li>
      <!-- {/if} -->  <!-- TODO -->
      <li>Contribution Subcategories: {nom.subcategory}</li>
    </ul>
  </div>

  <div class="nom-responses">
    <h4>Question 1</h4>
    <TextArea 
      style="color: black;cursor: default;"
      rows={3}
      value={nom['nomQ1Description']}
      disabled
    />
    <h4>Question 2</h4>
    <TextArea
      style="color: black;cursor: default;"
      rows={3}
      value={nom['nomQ2Description']}
      disabled
    />
    <h4>Question 3</h4>
    <TextArea
      style="color: black;cursor: default;"
      rows={3}
      value={nom['nomQ3Description']}
      disabled
    />
    {#if nom['nom-additional-info-description']}
    <h4>Additional Information</h4>
    <TextArea
      style="color: black;cursor: default;"
      rows={3}
      value={nom['nomAdditionalInfo']}
      disabled
    />
    {/if}
  </div>
  <h4 class="break">Are any of these the same person?</h4>
  <div class="action-zone">
    <div class="suggestion-area">
      <Merge bind:selectedRowIds bind:rows={rows} />
    </div>
    <div class="button-area">
      <form method="POST" action="?/accept" use:enhance={() => {
        // nominations = nominations.filter(n => n.ID != nom.ID);
        incomingRowIds = [];
        console.log("heyo");
        return async ({update}) => {
          await update();
        }
      }}>
        <input name="nominationId" type="hidden" value={nom.ID} />
        <input name="nomineeId" type="hidden" value={selectedNominee} />
        <Button type="submit" kind="tertiary">Confirm Nomination</Button>
      </form>
      <form method="POST" action="?/reject" use:enhance={() => {
        // nominations = nominations.filter(n => n.ID != nom.ID);
        console.log("heyo");
        return async ({update}) => {
          await update();
        }
      }}>
        <input name="nominationId" type="hidden" value={nom.ID} />
        <Button type="submit" kind="danger-tertiary">Reject Nomination</Button>
      </form>
      {#if selectedRowIds[0] === 'b-0'}
      <div class="info">A new nominee will be created for this nomination.</div>
      {:else}
      <div class="info">This nomination will be merged into the selected nominee.</div>
      {/if}
    </div>
  </div>
</main>

<style>
  .nom-information {
    font-size: 12pt;
  }

  .action-zone {
    display: grid;
    grid-template-columns: 75% 25%;
    grid-template-rows: 1fr;
    gap: 0.5em;
    margin-top: 0.5em;
  }

  .suggestion-area {
    grid-column: 1;
    grid-row: 1;
  }
  
  .button-area {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .nom-responses {
    margin-top: 1em;
  }

  .no-style {
    list-style: none;
  }

  .no-style > li {
    margin-left: 0;
  }

  .info {
    font-style: italic;
  }

  .break {
    margin-top: 1em;
  }
</style>