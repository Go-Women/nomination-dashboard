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
  export let rowsData;

  let pageSize = 10;
  let page = 1;
  var getPageSizes = (totalItems: number) => {
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
      { key: "data.skill", value: "Category" },
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
          href={"judges/" + cell.value}
        />
      {:else if cell.key === "active"}
        <!-- TODO: dynamically toggle based on data -->
        <Toggle labelText="Active" toggled>
          <span slot="labelA" style="color: red">Not Active</span>
          <span slot="labelB" style="color: green">Active</span>
        </Toggle>
      {:else}
        {cell.value}
      {/if}
    </svelte:fragment>
  </DataTable>

  <Pagination
    bind:pageSize
    bind:page
    totalItems={rowsData.length}
    pageSizes={getPageSizes(rowsData.length)}
  />
</main>
