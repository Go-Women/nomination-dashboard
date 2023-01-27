<script lang="js">
  import { Content, Tile, DataTable } from "carbon-components-svelte";

  // the header for the DataTable
  let dataTableHeader = [{ key: "name", value: "Categories" }];

  // TODO: replace once backend is setup
  let dataTableRows = [
    {
      id: "1",
      name: "Load Balancer 3",
      subcategory: "HTTP",
    },
    {
      id: "2",
      name: "Load Balancer 1",
      subcategory: "HTTP",
    },
    {
      id: "3",
      name: "Load Balancer 2",
      subcategory: "HTTP",
    },
    {
      id: "4",
      name: "Load Balancer 6",
      subcategory: "HTTP",
    },
    {
      id: "5",
      name: "Load Balancer 4",
      subcategory: "HTTP",
    },
    {
      id: "6",
      name: "Load Balancer 5",
      subcategory: "HTTP",
    },
    {
      id: "7",
      name: "Load Balancer 5",
      subcategory: "HTTP",
    },
    {
      id: "8",
      name: "Load Balancer 5",
      subcategory: "HTTP",
    },
  ];
</script>

<Content>
  <Tile>
    <h3>Nominee Categories</h3>
    <DataTable expandable headers={dataTableHeader} rows={dataTableRows}>
      <svelte:fragment slot="expanded-row" let:row>
        <div>{JSON.stringify(row, null, 2)}</div>
      </svelte:fragment>
    </DataTable>
  </Tile>
</Content>
