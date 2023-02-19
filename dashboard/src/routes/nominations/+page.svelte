<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import { Breadcrumb, BreadcrumbItem, Content, DataTable, Grid, OverflowMenu, OverflowMenuItem, Column, Row } from "carbon-components-svelte";
  import NominationOverview from "../../components/nominations/NominationOverview.svelte";
  import NominationInformation from "../../components/nominations/NominationInformation.svelte";
  import AcceptReject from "../../components/nominations/AcceptReject.svelte";

  export let data;
  export let { nominations } = data.props;
  export let reviewCount:number = 0;
  export let artCount: number = 0;
  export let athleticsCount: number = 0;
  export let eduCount: number = 0;
  export let businessCount: number = 0;
  export let humanitiesCount: number = 0;
  export let govCount: number = 0;
  export let stemCount: number = 0;
  export let otherCount: number = 0;

  let selectedRowIds: number[] = [1];

  var populateRows = (nominations: any) => {
    let rows: any[] = [];
    Object.entries(nominations).forEach(([key, nomination], index) => {
      let data = {
        id: nomination.ID,
        nominee: nomination.nomFirst + " " + nomination.nomLast,
        category: nomination.category,
        nominator: nomination.authorFirst + " " + nomination.authorLast,
        date: nomination.date
      }
      if (nominations.status == 'Reviewed')
        reviewCount++;

      switch(nomination.category) {
        case 'Art':
          artCount++;
          break;
        case 'Athletics':
          athleticsCount++;
          break;
        case 'Business':
          businessCount++;
          break;
        case 'Education':
          eduCount++;
          break;
        case 'Humanities':
          humanitiesCount++;
          break;
        case 'Public Service / Government':
          govCount++;
          break;
        case 'STEM':
          stemCount++;
          break;
        case 'Other':
          otherCount++;
          break;
        default:
          break;
      }
      
      rows.push(data);
    });
    return rows;
  }

  export const rows = populateRows(nominations);
</script>

<main>
  <header><Navigation /></header>
  <Grid>
    <div id="container">
      <Breadcrumb>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem>Nominations</BreadcrumbItem>
      </Breadcrumb>
 
    <h1>Nominations</h1>
    <NominationOverview 
      totalNominations={rows.length} 
      {reviewCount}
      {artCount} 
      {athleticsCount} 
      {businessCount}
      {eduCount}
      {humanitiesCount}
      {govCount}
      {stemCount}
      {otherCount}  
      />
    </div> 
  </Grid>
  <div class="half-container">
      
    <div id="half-left">
      <h2>Information</h2>
      <NominationInformation {rows} bind:selectedRowIds />
    </div>
    <div id="half-right">
      <h2>Review Nomination</h2>
      <AcceptReject 
        bind:incomingRowIds={selectedRowIds}
        bind:nominations
      />
    </div>
  </div>
</main>

<style>

  main {
    padding-top: 4rem;
    padding-left: 2rem;
  }
  .half-container {
    width: 100%;
    display: grid;
    grid-template-columns: 3% 1fr 1fr 1%;
    grid-template-rows: auto 1fr;
    row-gap: 0;
    column-gap: 1em;
  }

  #container {
    /* grid-column: 2;
    grid-row: 1; */
    /* padding-top: 4rem; */
    padding-left: 2rem;
    /* padding: 4rem 2rem 0 2rem; */
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