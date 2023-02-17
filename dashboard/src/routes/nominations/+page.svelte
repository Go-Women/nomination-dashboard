<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import { Breadcrumb, BreadcrumbItem, Content, DataTable, Grid, OverflowMenu, OverflowMenuItem } from "carbon-components-svelte";
  import NominationInformation from "../../components/nominations/NominationInformation.svelte";
  import AcceptReject from "../../components/nominations/AcceptReject.svelte";

  export let data;
  export let { nominations } = data.props;

  let selectedRowIds: number[] = [1];

  var populateRows = (nominations: any) => {
    let rows: any[] = [];
    let rowID = 1;
    Object.entries(nominations).forEach(([key, nomination], index) => {
      let data = {
        data: {
          id: rowID
        },
        id: rowID++,
        nominee: nomination["nom-first"] + " " + nomination["nom-last"],
        category: nomination['nom-contrib-area'],
        nominator: nomination["author-first"] + " " + nomination["author-last"],
        date: nomination.date,
      }
      rows.push(data);
    });
    return rows;
  }

  export const rows = populateRows(nominations);
</script>

<main>
  <header><Navigation /></header>
  <div class="half-container">
    <div id="breadcrumb-container">
      <Breadcrumb>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem>Nominations</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div id="half-left">
      <h2>Nominations</h2>
      <NominationInformation {rows} bind:selectedRowIds />
    </div>
    <div id="half-right">
      <h2>Review Nomination</h2>
      <AcceptReject 
        bind:incomingRowIds={selectedRowIds} bind:nominations />
    </div>
  </div>
</main>

<style>

  main {
    padding-top: 6em;
  }
  .half-container {
    width: 100%;
    display: grid;
    grid-template-columns: 3% 1fr 1fr 1%;
    grid-template-rows: auto 1fr;
    row-gap: 0;
    column-gap: 1em;
  }

  #breadcrumb-container {
    grid-column: 2;
    grid-row: 1;
  }

  #half-left {
    width: 100%;
    grid-column: 2;
    grid-row: 2;
  }

  #half-right {
    width: 100%;
    grid-column: 3;
    grid-row: 2;
  }
</style>