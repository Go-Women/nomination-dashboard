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
  export let rows: any;
  export let selectedRowIds: string[] = [];

  let pageSize = 25;
  let page = 1;
  var getPageSizes = (totalItems: number) => {
    let pages = Math.ceil(totalItems / 25);
    let pageArray = Array.from({ length: pages }).map((_, i) => (i + 1) * 25);
    return pageArray;
  };

  let sortKey = "date";
  let sortDirection = "descending";
</script>

<main class="bx--content-main">
  <DataTable
    radio
    bind:selectedRowIds
    size="medium"
    style="justify-text: center;"
    headers={[
      { key: "nominee", value: "Nominee" },
      { key: "category", value: "Category" },
      { key: "nominator", value: "Nominated By" },
      { key: "date", value: "Date", display: (date) => new Date(date).toLocaleString()},
      //sort: (a, b) => new Date(a) - new Date(b),},
    ]}
    rows={rows}
    {sortKey} {sortDirection} {pageSize} {page} sortable
  >
  <Toolbar>
    <ToolbarContent>
      <ToolbarSearch persistent shouldFilterRows/>
    </ToolbarContent>
  </Toolbar>
  <svelte:fragment slot="cell" let:cell>
    <!-- {#if cell.key === "id"}
      <Button
        size="small"
        iconDescription="View"
        icon={View}
        href={"nominations/" + cell.value}
      />
    {:else} -->
      {cell.value}
    <!-- {/if} -->
  </svelte:fragment>

  </DataTable>
  <Pagination
  bind:pageSize
  bind:page
  totalItems={rows.length}
  pageSizes={getPageSizes(rows.length)}
/>
</main>
