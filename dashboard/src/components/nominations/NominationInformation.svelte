<script lang="ts">
  import {
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
    Button,
    Row,
    Toggle,
  } from "carbon-components-svelte";
  import View from "carbon-icons-svelte/lib/Launch.svelte";
  export let rows;
</script>

<main class="bx--content-main">
  <DataTable
    style="justify-text: center;"
    headers={[
      { key: "data.id", empty: true},
      { key: "nominee", value: "Nominee" },
      { key: "nominator", value: "Nominated By" },
      { key: "date", value: "Date" },
    ]}
    rows={rows}
  >
  <Toolbar>
    <ToolbarContent>
      <ToolbarSearch persistent shouldFilterRows/>
    </ToolbarContent>
  </Toolbar>
  <svelte:fragment slot="cell" let:cell>
      {#if cell.key === "data.id"}
        <Button
          iconDescription="View"
          icon={View}
          href={"nominations/" + cell.value}
        />
      {:else}
        {cell.value}
      {/if}
    </svelte:fragment>

  </DataTable>
</main>
