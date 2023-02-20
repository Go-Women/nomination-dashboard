<script lang="ts">
  import { Button, DataTable } from "carbon-components-svelte";
  import View from "carbon-icons-svelte/lib/Launch.svelte";

  export let selectedRowIds: string[] = ["b-0"];
  export let rows: any[];

  // Reset the selected row to the "no" row when the items change
  $: resetRow(rows);
  const resetRow = (_: any) => selectedRowIds = ["b-0"];
</script>

<main>
  <div class="suggestion-box">
    <DataTable
      radio
      bind:selectedRowIds
      size="compact"
      headers={[
        { key: "data.id", empty: true },
        { key: "nominee", value: "Nominee" },
        { key: "category", value: "Category" },
        { key: "yob", value: "Birth Year" },
      ]}
      {rows}
    >
      <svelte:fragment slot="cell" let:cell>
        {#if cell.key === "data.id"}
          {#if cell.value !== 'b-0'}
            <Button
              size="small"
              iconDescription="View"
              icon={View}
              href={`nominees/${cell.value.substring(2)}`}
            />
          {/if}
        {:else}
          {cell.value}
        {/if}
      </svelte:fragment>
    </DataTable>
  </div>
</main>

<style>
    .suggestion-box {
    width: 100%;
    /* border: 0.25em solid lightgray;
    border-radius: 0.5em;
    margin-bottom: 1em; */
  }
</style>
