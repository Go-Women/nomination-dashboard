<script lang="ts">
  import { Button, Column, DataTable, Form, Grid, RadioButton, RadioButtonGroup, Row, TextArea } from "carbon-components-svelte";
  import View from "carbon-icons-svelte/lib/Launch.svelte";

  export let incomingRowIds: number[];
  export let nominations: any;

  let rows = [
    {
      data: { id: 0 }, id: 0,
      nominee: 'No, this is a unique nomination.',
      category: '', yob: ''
    },
    {
      data: { id: 1 }, id: 1,
      nominee: 'Grace Langsley',
      category: 'c503', yob: '1973'
    },
    {
      data: { id: 2 }, id: 2,
      nominee: 'Samantha Puckett',
      category: 'c201', yob: '1877'
    }
  ]

  let selectedRowIds: number[] = [0];
  $: nom = nominations[incomingRowIds[0]] || {};
</script>

<main>
  <div class="nom-information">
    <ul class="no-style">
      <li>Name: {nom['nom-first']} {nom['nom-last']} &mdash; Born: {nom['nom-yob']}</li>
      <li class="break">Contribution Areas: {nom['nom-contrib-area']}</li>
      {#if nom['nom-contrib-area-sub-description']}
      <li>User-Submitted Area: {nom['nom-contrib-area-sub-description']}</li>
      {/if}
      <li>Contribution Subcategories: {nom['nom-contrib-area-sub']}</li>
    </ul>
  </div>

  <div class="nom-responses">
    <h4>Question 1</h4>
    <TextArea 
      style="color: black;cursor: default;"
      rows={3}
      value={nom['nom-q1-description']}
      disabled
    />
    <h4>Question 2</h4>
    <TextArea
      style="color: black;cursor: default;"
      rows={3}
      value={nom['nom-q2-description']}
      disabled
    />
    <h4>Question 3</h4>
    <TextArea
      style="color: black;cursor: default;"
      rows={3}
      value={nom['nom-q3-description']}
      disabled
    />
    {#if nom['nom-additional-info-description']}
    <h4>Additional Information</h4>
    <TextArea
      style="color: black;cursor: default;"
      rows={3}
      value={nom['nom-additional-info-description']}
      disabled
    />
    {/if}
  </div>
  <h4 class="break">Are any of these the same person?</h4>
  <div class="action-zone">
    <div class="suggestion-area">
      <div class="suggestion-box">
        <DataTable
          radio
          bind:selectedRowIds
          size="compact"
          headers={[
            { key: "data.id", empty: true },
            { key: "nominee", value: "Nominee" },
            { key: "category", value: "Category" },
            { key: "yob", value: "Birth Year" }
          ]}
          rows={rows}
          >
          <svelte:fragment slot="cell" let:cell>
            {#if cell.key === "data.id"}
              {#if cell.value !== 0}
              <Button
                size="small"
                iconDescription="View"
                icon={View}
                href={"nominees/" + cell.value}
              />
              {/if}            
            {:else}
            {cell.value}
            {/if}
          </svelte:fragment>
        </DataTable>
      </div>
    </div>
    <div class="button-area">
      <Button kind="tertiary">Confirm Nomination</Button>
      <Button kind="danger-tertiary">Reject Nomination</Button>
      {#if selectedRowIds[0] === 0}
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

  .suggestion-box {
    width: 100%;
    border: 0.25em solid lightgray;
    border-radius: 0.5em;
    margin-bottom: 1em;
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