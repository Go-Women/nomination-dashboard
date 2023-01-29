<script lang="ts">
  import {
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
    Button,
    Row,
  } from "carbon-components-svelte";
  import View from "carbon-icons-svelte/lib/Launch.svelte";
  export let rowsData;

  let pageSize = 10;
  let page = 1;
  var getPageSizes = (totalItems) => {
    let pages = Math.ceil(totalItems / 10);
    let pageArray = Array.from({ length: pages }).map((_, i) => (i + 1) * 10);
    return pageArray;
  };
</script>

<main class="bx--content-main">
  <Row><h3>Information</h3></Row>
  <DataTable
    style="justify-text: center;"
    headers={[
      { key: "data.id", empty: true },
      { key: "id", value: "#" },
      { key: "name", value: "Name" },
      { key: "email", value: "Email" },
      { key: "active", value: "Active" },
    ]}
    rows={rowsData}
    {pageSize}
    {page}
  >
    <Toolbar>
      <ToolbarContent>
        <ToolbarSearch persistent shouldFilterRows />
      </ToolbarContent>
    </Toolbar>
    <svelte:fragment slot="cell" let:cell>
      {#if cell.key === "data.id"}
        <Button
          iconDescription="View"
          icon={View}
          href="/judges/{cell.value}"
        />
      {:else}{cell.value}{/if}
    </svelte:fragment>
  </DataTable>

  <Pagination
    bind:pageSize
    bind:page
    totalItems={rowsData.length}
    pageSizes={getPageSizes(rowsData.length)}
  />
</main>
