<script lang="ts">
    import {
      Content,
      Grid,
      Row,
      Column,
      ClickableTile,
      DataTable,
      Button,
    } from "carbon-components-svelte";
    import View from "carbon-icons-svelte/lib/Launch.svelte";
  
    export let judgeMatches: any;
    console.log(judgeMatches);

    var getInformation = (matches: JSON) => {
    let rows = new Array();
    Object.entries(matches).forEach(([key, match], index) => {
      let data = {
        id: [match.ID, match.matchStatus],
        name: match.fullName,
        category: match.category,
        subcategory: match.subcategory,
        status: match.matchStatus
      };
      rows.push(data);
    });

    return rows;
  };
  const rows = getInformation(judgeMatches);

  let headers = [
    { key: "id", empty: true },
    { key: "name", value: "Name" },
    { key: "category", value: "Category" },
    { key: "subcategory", value: "Subcategory"},
    { key: "status", value: "Status"}
  ];

</script>
  
<main class="bx--content-main">
    <h1>Nominees to Review</h1>
    <DataTable
        style="justify-text: center;"
        {headers}
        {rows}
        sortable
    >
        <svelte:fragment slot="cell" let:cell>
        {#if cell.key === "id"}
            {#if cell.value[1] === 'Matched'}
                <Button
                iconDescription="View"
                icon={View}
                href={"matches/" + cell.value[0]}
                />
            {/if}
        {:else}
            {cell.value}
        {/if}
        </svelte:fragment>
    </DataTable>
</main>
