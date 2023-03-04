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
  export let reviewed: boolean;

  var pageSize:number = 25;
  var page:number = 1;
  var getPageSizes = (totalItems: number) => {
    let pages = Math.ceil(totalItems / 25);
    let pageArray = Array.from({ length: pages }).map((_, i) => (i + 1) * 25);
    return pageArray;
  };

  const sortKey:string = "date";
  const sortDirection:string = "descending";
</script>

<main class="bx--content-main">
  {#if reviewed}
    <DataTable
      size="medium"
      style="justify-text: center;"
      headers={[
        { key: "id", empty: true},
        { key: "nominee", value: "Nomination" },
        { key: "category", value: "Category" },
        { key: "nominator", value: "Nominated By" },
        { key: "date", value: "Date", display: (date) => Date.parse(date).toLocaleString('es-pa'),
          sort: (a, b) => {
            const diff = Date.parse(a) - Date.parse(b);
            if (diff < 0) return -1;
            if (diff > 0) return 1;
            return 0;
          }
      }
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
      {#if cell.key === "id"}
        <Button
          iconDescription="View"
          icon={View}
          href={"nominations/" + cell.value.toString().substring(2, cell.value.length)}
        />
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
  {:else}
    <DataTable
      radio
      bind:selectedRowIds
      size="medium"
      style="justify-text: center;"
      headers={[
        { key: "nominee", value: "Nominee" },
        { key: "category", value: "Category" },
        { key: "nominator", value: "Nominated By" },
        { key: "date", value: "Date", display: (date) => Date.parse(date).toLocaleString('es-pa'),
          sort: (a, b) => {
            const diff = Date.parse(a) - Date.parse(b);
            if (diff < 0) return -1;
            if (diff > 0) return 1;
            return 0;
          }
      }
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
        {cell.value}
    </svelte:fragment>
    </DataTable>
    <Pagination
      bind:pageSize
      bind:page
      totalItems={rows.length}
      pageSizes={getPageSizes(rows.length)}
    />
  {/if}


</main>
