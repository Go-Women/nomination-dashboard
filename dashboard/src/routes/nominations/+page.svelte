<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import { Content, DataTable, OverflowMenu, OverflowMenuItem } from "carbon-components-svelte";

  export let data;
  export let { nominations } = data.props;

  let headers = [
    { key: "name", value: "Name"},
    { key: "category", value: "Category"},
    { key: "overflow", empty: true},
  ];

  var populateRows = (nominations) => {
    let rows = [];
    let rowID = 1;
    Object.entries(nominations).forEach(([key, nomination], index) => {
      let data = {
        id: rowID++,
        name: nomination.nominee.firstName + " " + nomination.nominee.lastName,
        category: nomination.nominee.category
      }
      rows.push(data);
    });
    return rows;
  }

  export const rows = populateRows(nominations);
</script>

<main>
  <header><Navigation /></header>
  <Content>
    <h1>Nominees</h1>
    <DataTable zebra stickyHeader size="tall"
    headers={headers} rows={rows}>
      <svelte:fragment slot="cell" let:cell>
        {#if cell.key === "overflow"}
          <OverflowMenu flipped>
            <OverflowMenuItem text="Restart" />
            <OverflowMenuItem
              href="https://cloud.ibm.com/docs/loadbalancer-service"
              text="API documentation"
            />
            <OverflowMenuItem danger text="Stop" />
          </OverflowMenu>
        {:else}{cell.value}{/if}
      </svelte:fragment>
    </DataTable>
  </Content>
</main>
