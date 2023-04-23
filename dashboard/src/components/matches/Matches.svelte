<script lang="ts">
  import {
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
    Button,
    RadioButtonGroup,
    RadioButton
  } from "carbon-components-svelte";
  import {Launch, Undo} from "carbon-icons-svelte";

  export let rows: any;
  export var review: boolean;

  let nbsp = '\u00A0';

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
    { key: "nomineeName", value: "Nominee" },
    { key: "nomineeCategory", value: "Nominee Category" },
    { key: "nomineeSubcategory", value: "Nominee Subcategory" },
    { key: "nomineeCapacity", value: "Nominee Capacity" },
    { key: "judgeName", value: "Judge" },
    { key: "judgeCategory", value: "Judge Category" },
    { key: "judgeSubcategory", value: "Judge Subcategory" },
    { key: "judgeCapacity", value: "Judge Capacity" },
    { key: "action", value: "Action" }
  ]
  
  let pageSize = 25;
  let page = 1;
  var getPageSizes = (totalItems: number) => {
    let pages = Math.ceil(totalItems / 25);
    let pageArray = Array.from({ length: pages }).map((_, i) => (i + 1) * 25);
    return pageArray;
  };

  let matchActions: {[key:string]:any} = {};
</script>

<main style="width: 100%;">
  <br/>
  <DataTable
    style="justify-text: center; width: 100%;"
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
      {#if review}
        <form method="POST" action="?/suggestions">
          <input type="hidden" name="matchSelections" value={JSON.stringify(matchActions)}>
          <Button type="submit" size="field" kind="primary">Confirm Selections</Button>
        </form>
      {/if}
    </Toolbar>
    <svelte:fragment slot="cell" let:cell>
      {#if cell.key === "action" && review}
        <div class="radios">
          <RadioButtonGroup name="action-rb-group" orientation="vertical">
            <RadioButton
              name={`action:${cell.value[0]}:${cell.value[1]}`}
              value=0
              labelText="Accept"
              on:change={() => matchActions[`${cell.value[0]}:${cell.value[1]}`] = 'ACCEPT'}
            />
            <RadioButton
              name={`action:${cell.value[0]}:${cell.value[1]}`}
              value=1
              labelText={`Manual${nbsp}Assignment`}
              on:change={() => matchActions[`${cell.value[0]}:${"m200"}`] = 'MANUAL'}
            />
          </RadioButtonGroup>
        </div>
      {:else if cell.key === "action" && !review}
        <form method="POST" action="?/undo">
          <input name="id" type="hidden" value={cell.value[0]} />
          <input name="nomID" type="hidden" value={cell.value[1]} />
          <input name="judgeID" type="hidden" value={cell.value[2]} />
          <input name="cat" type="hidden" value={cell.value[3]} />
          <Button type="submit" iconDescription="Undo Match" icon={Undo} kind="secondary"/>
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
  {#if review}
    <form method="POST" action="?/suggestions">
      <input type="hidden" name="matchSelections" value={JSON.stringify(matchActions)}>
      <Button type="submit" size="field" kind="primary">Confirm Selections</Button>
    </form>
  {/if}
</main>

<style>

</style>