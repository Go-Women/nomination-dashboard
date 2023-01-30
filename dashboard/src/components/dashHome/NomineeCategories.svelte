<script lang="js">
  import { Content, Tile, DataTable } from "carbon-components-svelte";

  // the header for the DataTable
  let dataTableHeader = [{ key: "name", value: "Categories" }];

  // TODO: replace once backend is setup
  let dataTableRows = [
    {
      id: "1",
      name: "Art",
      subcategory: "Architecture, Art History, Cinema, Design, Literature, Music, Painting/Drawing, Sculpting, Theater/Dance, Other",
    },
    {
      id: "2",
      name: "Athletics",
      subcategory: "Competition Sports, individual Sports, Team Sports, Sports/Team Management, Other",
    },
    {
      id: "3",
      name: "Business",
      subcategory: "CEO",
    },
    {
      id: "5",
      name: "Eduction",
      subcategory: "Early Eduaction",
    },
    {
      id: "6",
      name: "Humanities",
      subcategory: "Ancient/Modern Languages",
    },
    {
      id: "7",
      name: "Public Service/Government",
      subcategory: "Activism",
    },
    {
      id: "8",
      name: "STEM",
      subcategory: "Astronomy",
    },
    {
      id: "9",
      name: "Other",
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
