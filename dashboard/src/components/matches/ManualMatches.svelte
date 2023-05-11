<script lang="ts">
  import {
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
    Button,
    Modal,
    StructuredListBody,
    StructuredList,
    StructuredListRow,
    StructuredListCell,
    Checkbox,
    InlineNotification
  } from "carbon-components-svelte";
  import View from "carbon-icons-svelte/lib/Launch.svelte";

  export let rows: any;
  export let judges: any;

  const nomHeaders = [
    // { key: "nomineeID", empty: true },
    { key: "nomineeName", value: "Nominee Name" },
    { key: "nomineeCategory", value: "Nominee Category" },
    { key: "nomineeSubcategory", value: "Nominee Subcategory" },
    { key: "nomineeCapacity", value: "Judges Assigned" },
    { key: "action", empty: true },
  ];

  const judgeHeaders = [ 
    { key: "judgeName", value: "Judge Name" },
    { key: "judgeCategory", value: "Judge Category" },
    { key: "judgeSubcategory", value: "Judge Subcategory" },
    { key: "judgeCapacity", value: "Nominees Assigned" },
    { key: "rowID", empty: true }
  ];

  let pageSize = 25;
  let page = 1;
  var getPageSizes = (totalItems: number) => {
    let pages = Math.ceil(totalItems / 25);
    let pageArray = Array.from({ length: pages }).map((_, i) => (i + 1) * 25);
    return pageArray;
  };

  let selectedNomineeId:[] = [];
  let selectedJudgeIds:[] = [];

  var open = false;
  interface Judge {
    id: number;
    judgeName: string,
    judgeCategory: string,
    judgeSubcategory: string,
    judgeStatus: string,
    judgeCapacity: string,
    bio: string,
    linkedin: string,
    addInfo: string,
    previousJudge: boolean
  };
  var judge: Judge;

  function modalOpen(id: number) {
    open = true;
    judge = judges[id];
  };
  
  function getCapacity(id: any) {
    for (const key in rows) {
      if (rows[key].id == id)
        return rows[key].action;
    }
    return -1;
  }
  
</script>

<main class="bx--content-main">
  <br/>  
  {#if selectedNomineeId.length == 0}
      <InlineNotification
      lowContrast
      kind="warning"
      title="Please select a Nominee."
    />
  {:else if selectedNomineeId.length == 0 || selectedJudgeIds.length == 0 || (selectedJudgeIds.length > getCapacity(selectedNomineeId) && getCapacity(selectedNomineeId) != -1)}
    <InlineNotification
      lowContrast
      kind="warning"
      title="Please select up to {getCapacity(selectedNomineeId)} Judges to Match with the Nominee selected."
    />
  {/if}
  <DataTable
    style="justify-text: center;"
    headers={nomHeaders}
    {rows}
    {pageSize}
    {page}
    sortable
    radio
    bind:selectedRowIds={selectedNomineeId}
  >
    <Toolbar>
      <ToolbarContent>
        <ToolbarSearch persistent shouldFilterRows />
      </ToolbarContent>
    </Toolbar>
    <svelte:fragment slot="cell" let:cell>
      {#if cell.key === "nomineeID"}
        <Button
          iconDescription="View"
          icon={View}
          href={"nominees/" + cell.value}
        />
      {:else if cell.key === "action"}
        {#if (selectedNomineeId.length !== 0 && selectedJudgeIds.length !== 0) && (selectedJudgeIds.length <= cell.value)}
          <div class="action-zone">
              <form method="POST" action="?/match">
                <input type="hidden" name="nominee" value={selectedNomineeId}>
                <input type="hidden" name="judges" value={selectedJudgeIds}>
                <Button type="submit">Match</Button>
              </form>
          </div>
        {/if}
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
  <DataTable
    style="justify-text: center;"
    headers={judgeHeaders}
    rows={judges}
    {pageSize}
    {page}
    sortable
    selectable
    bind:selectedRowIds={selectedJudgeIds}
  >
    <Toolbar>
      <ToolbarContent>
        <ToolbarSearch persistent shouldFilterRows />
      </ToolbarContent>
    </Toolbar>
    <svelte:fragment slot="cell" let:cell>
      {#if cell.key === "rowID"}
        <Button
          iconDescription="View"
          icon={View}
          on:click={() => (modalOpen(cell.value))}
        />
      {:else}
        {cell.value}
      {/if}
    </svelte:fragment>
  </DataTable>
  <Pagination
    bind:pageSize
    bind:page
    totalItems={judges.length}
    pageSizes={getPageSizes(judges.length)}
  />
  {#if open}
    <Modal
      passiveModal
      bind:open
      modalHeading={judge.judgeName}
      on:open
      on:close
      size="lg"
    >
      <StructuredList flush>
        <StructuredListBody>
          {#if judge.bio}
            <StructuredListRow>
              <StructuredListCell noWrap><strong>Bio</strong></StructuredListCell>
              <StructuredListCell>{judge.bio}</StructuredListCell>
            </StructuredListRow> 
          {/if}
          <StructuredListRow>
            <StructuredListCell noWrap><strong>Category</strong></StructuredListCell>
            <StructuredListCell>{judge.judgeCategory}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap><strong>Subcategory</strong></StructuredListCell>
            <StructuredListCell>{judge.judgeSubcategory}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap><strong>Status</strong></StructuredListCell>
            <StructuredListCell>{judge.judgeStatus}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap><strong>Capacity</strong></StructuredListCell>
            <StructuredListCell>{judge.judgeCapacity}</StructuredListCell>
          </StructuredListRow>
          {#if judge.linkedin}
            <StructuredListRow>
              <StructuredListCell noWrap><strong>LinkedIn</strong></StructuredListCell>
              <StructuredListCell>{judge.linkedin}</StructuredListCell>
            </StructuredListRow>
          {/if}
          {#if judge.addInfo}
            <StructuredListRow>
              <StructuredListCell noWrap><strong>Additional Info</strong></StructuredListCell>
              <StructuredListCell>{judge.addInfo}</StructuredListCell>
            </StructuredListRow>
          {/if}
          <StructuredListRow>
              <StructuredListCell noWrap><strong>Previous Judge</strong></StructuredListCell>
              <Checkbox
                name="previousJudge"
                bind:checked={judge.previousJudge}
                value={judge.previousJudge}
                labelText="Previous Judge"
                disabled
              />
          </StructuredListRow>
        </StructuredListBody>
      </StructuredList>
    </Modal>
  {/if}
</main>
<style>
  .action-zone {
    display: grid;
    grid-template-columns: 75% 25%;
    grid-template-rows: 1fr;
    gap: 0.5em;
    margin-top: 0.5em;
  }
</style>