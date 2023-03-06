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

  export let rows: any;

  const headers = [
    { key: "id", empty: true },
    { key: "nomineeName", value: "Nominee" },
    { key: "nomineeCategory", value: "Nominee Category" },
    { key: "nomineeSubcategory", value: "Nominee Subcategory" },
    { key: "judgeName", value: "Judge" },
    { key: "judgeCategory", value: "Judge Category" },
    { key: "judgeSubcategory", value: "Judge Subcategory" },
    { key: "judgeCapacity", value: "Judge Capacity" },
    { key: "action", value: "Action" },
  ];

  let pageSize = 25;
  let page = 1;
  var getPageSizes = (totalItems: number) => {
    let pages = Math.ceil(totalItems / 25);
    let pageArray = Array.from({ length: pages }).map((_, i) => (i + 1) * 25);
    return pageArray;
  };
</script>

<main class="bx--content-main">
  <br/>
  <DataTable
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
          href={"matches/" + cell.value}
        />
      {:else if cell.key === "action"}
        <!-- <Row> -->
          <Button expressive size="small" type="submit" kind="ghost">Accept</Button>
          <Button expressive size="small" type="submit" kind="danger-ghost">Manual Assignment</Button>
        <!-- </Row> -->
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
