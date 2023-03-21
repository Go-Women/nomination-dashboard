<script lang="ts">
  import { DonutChart } from "@carbon/charts-svelte";
  import "@carbon/charts/styles.css";
  import "@carbon/styles/css/styles.css";
 

  import { Content, Tile, DataTable, Row, Column } from "carbon-components-svelte";

  // the header for the DataTable
  // let dataTableHeader = [{ key: "name", value: "Categories" },{ key: "value", value: "Total" }];

  // // TODO: replace once backend is setup
  // let dataTableRows = [
  //   {
  //     id: "1",
  //     name: "Art",
  //     subcategory: ["Architecture", "Art History", "Cinema", "Design", "Literature", "Music", "Painting / Drawing", "Sculpting", "Theater / Dance", "Other"],
  //     value: "3",
  //     subcategoryCount: ["1", "2", "0", "0", "0", "0", "0", "0", "0", "0"],
  //   },
  //   {
  //     id: "2",
  //     name: "Athletics",
  //     subcategory: ["Competition Sports", "Individual Sports", "Team Sports", "Sports / Team Management", "Other"],
  //     value: "4",
  //     subcategoryCount: ["1", "2", "1", "0", "0"],
  //   },
  //   {
  //     id: "3",
  //     name: "Business",
  //     subcategory: ["CEO / Corporate Leadership", "Entrepreneurship", "Inventing / Patent Holding", "Other"],
  //     value: "0",
  //     subcategoryCount: ["0", "0", "0", "0"],
  //   },
  //   {
  //     id: "5",
  //     name: "Education",
  //     subcategory: ["Early Education", "Higher Education", "Research", "Other"],
  //     value: "0",
  //     subcategoryCount: ["0", "0", "0", "0"],
  //   },
  //   {
  //     id: "6",
  //     name: "Humanities",
  //     subcategory: ["Ancient / Modern Languages", "Literature", "Philosophy / Religion", "Social reformation", "Other"],
  //     value: "3",
  //     subcategoryCount: ["3", "0", "0", "0", "0"],
  //   },
  //   {
  //     id: "7",
  //     name: "Public Service / Government",
  //     subcategory: ["Activism", "Legal / Judicial", "Military", "Politics", "Other"],
  //     value: "12",
  //     subcategoryCount: ["12", "0", "0", "0", "0"],
  //   },
  //   {
  //     id: "8",
  //     name: "STEM",
  //     subcategory: ["Astronomy", "Architecture", "Biology", "Chemistry", "Climate / Earth Sciences", "Computer Science", "Mathematics", "Medicine", "Engineering", "Physics", " Technology", "Other"],
  //     value: "5",
  //     subcategoryCount: ["5", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
  //   },
  //   {
  //     id: "9",
  //     name: "Other",
  //     value: "4",
  //   },
  // ];

  export let artCount: number;
  export let athleticsCount: number;
  export let businessCount: number;;
  export let eduCount: number;
  export let humanitiesCount: number;
  export let govCount: number;
  export let stemCount: number;
  export let otherCount: number;

  let test = [
    {
      "group": "Art",
      "value": 0
    },
    {
      "group": "Athletics",
      "value": 0
    },
    {
      "group": "Business",
      "value": 0
    },
    {
      "group": "Education",
      "value": 0
    },
    {
      "group": "Humanities",
      "value": 0
    },
    {
      "group": "Public Service / Government",
      "value": 0
    },
    {
      "group": "STEM",
      "value": 0
    },
    {
      "group": "Other",
      "value": {otherCount}
    }
  ];
  test[0].value = artCount;
  test[1].value = athleticsCount;
  test[2].value = businessCount;
  test[3].value = eduCount;
  test[4].value = humanitiesCount;
  test[5].value = govCount;
  test[6].value = stemCount;
  test[7].value = otherCount;

  let options = {
	"title": "Categories",
    "resizable": true,
    "donut": {
      "center": {
        "label": "Nominations"
      }
    },
    "height": "400px",
  };
</script>

<Content>
  <Tile>
    <h3>Nomination Categories</h3>
    <DonutChart data={test} {options} />
    <!-- <DataTable  
      headers={dataTableHeader}
      rows={dataTableRows}
      batchExpansion
      nonExpandableRowIds={dataTableRows
        .filter((row) => row.name == 'Other')
        .map((row) => row.id)}
    >
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
    </DataTable> -->
  </Tile>
</Content>
