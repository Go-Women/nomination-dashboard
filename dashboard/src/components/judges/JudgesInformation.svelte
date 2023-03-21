<script lang="ts">
  import {
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
    Button,
    Row,
    Checkbox,
    MultiSelect,
  } from "carbon-components-svelte";
  import View from "carbon-icons-svelte/lib/Launch.svelte";

  export let rows: any[];
  export let selectedRowIds: string[] = [];

  let pageSize = 15;
  let page = 1;
  var getPageSizes = (totalItems: number) => {
    let pages = Math.ceil(totalItems / 15);
    let pageArray = Array.from({ length: pages }).map((_, i) => (i + 1) * 15);
    return pageArray;
  };

  let headers = [
    { key: "id", empty: true },
    { key: "name", value: "Name" },
    { key: "category", value: "Category" },
    { key: "capacity", value: "Capacity" },
    { key: "active", value: "Active" },
  ];
  let categories = [
    { id: 0, text: "Art" },
    { id: 1, text: "Athletics" },
    { id: 2, text: "Business" },
    { id: 3, text: "Education" },
    { id: 4, text: "Humanities" },
    { id: 5, text: "Public Service/Government" },
    { id: 6, text: "STEM" },
    { id: 7, text: "Other" },
  ];
  let selected = [0, 1, 2, 3, 4, 5, 6, 7];
  var selectAll = () => {
    selected = [0, 1, 2, 3, 4, 5, 6, 7];
  };

  function formatCategories(value: string) {
    if (value.length > 4) {
      return value.replaceAll(',', ', ');
    }
    return value;
  }
</script>

<main class="bx--content-main">
  <DataTable 
    radio
    bind:selectedRowIds
    style="justify-text: center;" 
    {headers} 
    {rows} 
    {pageSize} 
    {page} 
    sortable
  >
    <Toolbar>
      <ToolbarContent>
        <ToolbarSearch persistent shouldFilterRows />
      </ToolbarContent>
    </Toolbar>
    <svelte:fragment slot="cell" let:cell>
      {#if cell.key === "id"}
        <Button
          iconDescription="View"
          icon={View}
          href={"judges/" + cell.value.substring(2)}
        />
      {:else if cell.key === "active"}
        <Checkbox checked={cell.value} disabled/>
      {:else if cell.key === "category"}
        {formatCategories(cell.value)}
      {:else}
        {cell.value}
      {/if}
    </svelte:fragment>
  </DataTable>

  <Pagination
    bind:pageSize
    bind:page
    totalItems={rows.length}
    pageSizes={getPageSizes(rows.length)}
  />
</main>
