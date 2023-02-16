<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import { Breadcrumb, BreadcrumbItem, Content, DataTable, Grid, OverflowMenu, OverflowMenuItem } from "carbon-components-svelte";
  import NominationInformation from "../../components/nominations/NominationInformation.svelte";

  export let data;
  export let { nominations } = data.props;

  var headers = [
      { key: "data.id", empty: true},
      { key: "nominee", value: "Nominee" },
      { key: "nominator", value: "Nominated By" },
      { key: "date", value: "Date" },
    ]

  var populateRows = (nominations) => {
    let rows = [];
    let rowID = 1;
    Object.entries(nominations).forEach(([key, nomination], index) => {
      // console.log(typeof nomination.date)
      let data = {
        data: {
          id: rowID
        },
        id: rowID++,
        nominee: nomination["nomFirst"] + " " + nomination["nomLast"],
        nominator: nomination["authorFirst"] + " " + nomination["authorLast"],
        date: nomination.date
      }
      rows.push(data);
    });
    return rows;
  }

  export const rows = populateRows(nominations);
</script>

<main>
  <header><Navigation /></header>
  <Content class="bx--content--main">
    <Grid>
      <Breadcrumb>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem>Nominations</BreadcrumbItem>
      </Breadcrumb>
    
    <h1>Nominations</h1>
    <NominationInformation {rows}/>
    </Grid>
  </Content>
</main>
