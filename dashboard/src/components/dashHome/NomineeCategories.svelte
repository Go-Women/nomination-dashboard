<script lang="js">
  import { Content, Tile, DataTable } from "carbon-components-svelte";

  // the header for the DataTable
  let dataTableHeader = [{ key: "name", value: "Categories" },{ key: "value", value: "Count" }];

  // TODO: replace once backend is setup
  let dataTableRows = [
    {
      id: "1",
      name: "Art",
      subcategory: "Architecture, Art History, Cinema, Design, Literature, Music, Painting/Drawing, Sculpting, Theater/Dance, Other",
      value: "20",
    },
    {
      id: "2",
      name: "Athletics",
      subcategory: "Competition Sports, individual Sports, Team Sports, Sports/Team Management, Other",
      value: "20",
    },
    {
      id: "3",
      name: "Business",
      subcategory: "CEO",
      value: "20",
    },
    {
      id: "5",
      name: "Eduction",
      subcategory: "Early Eduaction",
      value: "20",
    },
    {
      id: "6",
      name: "Humanities",
      subcategory: "Ancient/Modern Languages",
      value: "20",
    },
    {
      id: "7",
      name: "Public Service/Government",
      subcategory: "Activism",
      value: "20",
    },
    {
      id: "8",
      name: "STEM",
      subcategory: "Astronomy",
      value: "20",
    },
    {
      id: "9",
      name: "Other",
      value: "20",
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
