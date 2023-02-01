<script lang="js">
  import { Content, Tile, DataTable, Row, Column } from "carbon-components-svelte";

  // the header for the DataTable
  let dataTableHeader = [{ key: "name", value: "Categories" },{ key: "value", value: "Total" }];

  // TODO: replace once backend is setup
  let dataTableRows = [
    {
      id: "1",
      name: "Art",
      subcategory: ["Architecture", "Art History", "Cinema", "Design", "Literature", "Music", "Painting/Drawing", "Sculpting", "Theater/Dance", "Other"],
      value: "3",
      subcategoryCount: ["1", "2", "0", "0", "0", "0", "0", "0", "0", "0"],
    },
    {
      id: "2",
      name: "Athletics",
      subcategory: ["Competition Sports", "individual Sports", "Team Sports", "Sports/Team Management", "Other"],
      value: "4",
      subcategoryCount: ["1", "2", "1", "0", "0"],
    },
    {
      id: "3",
      name: "Business",
      subcategory: ["CEO/corporate leadership", "Entrepreneurship", "Inventing/patent holding", "Other"],
      value: "0",
      subcategoryCount: ["0", "0", "0", "0"],
    },
    {
      id: "5",
      name: "Eduaction",
      subcategory: ["Early Eduaction", "Higher Education", "Research", "Other"],
      value: "0",
      subcategoryCount: ["0", "0", "0", "0"],
    },
    {
      id: "6",
      name: "Humanities",
      subcategory: ["Ancient/Modern Languages", "Literature", "Philosophy/religion", "Social reformation", "Other"],
      value: "3",
      subcategoryCount: ["3", "0", "0", "0", "0"],
    },
    {
      id: "7",
      name: "Public Service/Government",
      subcategory: ["Activism", "Legal/judical", "Military", "Politics", "Other"],
      value: "12",
      subcategoryCount: ["12", "0", "0", "0", "0"],
    },
    {
      id: "8",
      name: "STEM",
      subcategory: ["Astronomy", "Architecture", "Biology", "Chemistry", "Climate/Earth Sciences", "Computer Science", "Mathematics", "Medicine", "Engineering", "Physics", " Technology", "Other"],
      value: "5",
      subcategoryCount: ["5", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    },
    {
      id: "9",
      name: "Other",
      value: "4",
    },
  ];
</script>

<Content>
  <Tile>
    <h3>Nominee Categories</h3>
    <DataTable expandable headers={dataTableHeader} rows={dataTableRows}>
      <svelte:fragment slot="expanded-row" let:row>
        <Row>
          <Column>
          {#each row.subcategory as list}
            <Row>{list}</Row>
          {/each}
          </Column>
          <Column>
          {#each row.subcategoryCount as count}
            <Row>{count}</Row>
          {/each}
          </Column>
        </Row>
      </svelte:fragment>
    </DataTable>
  </Tile>
</Content>
