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
    MultiSelect,
  } from "carbon-components-svelte";
  import { LogicalPartition } from "carbon-icons-svelte";
  import View from "carbon-icons-svelte/lib/Launch.svelte";

  export let rows;

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
</script>

<main class="bx--content-main">
  <Row><h3>Information</h3></Row>
  <!-- <Test rows={rows}/> -->
  <DataTable style="justify-text: center;" {headers} {rows} {pageSize} {page} sortable>
    <Toolbar>
      <ToolbarContent>
        <ToolbarSearch persistent shouldFilterRows />

        <!-- <MultiSelect
          spellcheck="false"
          filterable
          size="sm"
          bind:selectedIds={selected}
          titleText="Categories"
          placeholder="Filter judge categories..."
          items={categories}
        />
        <Button
          iconDescription="Select All"
          icon={Checkmark}
          on:click={(e) => selectAll()}
        /> -->
      </ToolbarContent>
    </Toolbar>
    <svelte:fragment slot="cell" let:cell>
      {#if cell.key === "id"}
        <Button
          iconDescription="View"
          icon={View}
          href={"judges/" + cell.value}
        />
      {:else if cell.key === "active"}
        <Toggle
          toggled={cell.value}
          on:toggle={(e) => (cell.value = e.detail.toggled)}
        >
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
    totalItems={rows.length}
    pageSizes={getPageSizes(rows.length)}
  />
</main>
