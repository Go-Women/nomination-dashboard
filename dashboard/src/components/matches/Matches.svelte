<script lang="ts">
  import {
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
    Button
  } from "carbon-components-svelte";
  import View from "carbon-icons-svelte/lib/Launch.svelte";

  export let rows: any;
  export var review: boolean;


  const headers = (review) ? [
    { key: "nomineeName", value: "Nominee" },
    { key: "nomineeCategory", value: "Nominee Category" },
    { key: "nomineeSubcategory", value: "Nominee Subcategory" },
    { key: "judgeName", value: "Judge" },
    { key: "judgeCategory", value: "Judge Category" },
    { key: "judgeSubcategory", value: "Judge Subcategory" },
    { key: "judgeCapacity", value: "Judge Capacity" },
    { key: "action", value: "Action" }
  ] :

  [
    { key: "matchID", empty: true },
    { key: "nomineeName", value: "Nominee" },
    { key: "nomineeCategory", value: "Nominee Category" },
    { key: "nomineeSubcategory", value: "Nominee Subcategory" },
    { key: "judgeName", value: "Judge" },
    { key: "judgeCategory", value: "Judge Category" },
    { key: "judgeSubcategory", value: "Judge Subcategory" },
    { key: "judgeCapacity", value: "Judge Capacity" }
  ]
  
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
      {#if cell.key === "matchID" && !review}
        <Button
          iconDescription="View"
          icon={View}
          href={"matches/" + cell.value + "/review"}
        />
      {:else if cell.key === "action" && review}
        <form method="POST" action="?/match">
          <input name="nominee" type="hidden" value={cell.value[0]} />
          <input name="judges" type="hidden" value={cell.value[1]} />
          <Button expressive size="small" type="submit" kind="ghost">Accept</Button>
        </form>
        <form method="POST" action="?/manual">
          <input name="nomineeID" type="hidden" value={cell.value[0]} />
          <input name="status" type="hidden" value='m200' />
          <Button expressive size="small" type="submit" kind="danger-ghost">Manual Assignment</Button>
        </form>
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
