<script lang="ts">
  import {
      Accordion,
      AccordionItem, Breadcrumb,
      BreadcrumbItem, Column
  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";

  import Navigation from "../../components/Navigation.svelte";
  import AcceptReject from "../../components/nominations/AcceptReject.svelte";
  import NominationInformation from "../../components/nominations/NominationInformation.svelte";
  import NominationOverview from "../../components/nominations/NominationOverview.svelte";

  import fuzzysort from "fuzzysort";
  import PleaseSelect from "../../components/nominations/PleaseSelect.svelte";

  export let data;
  export let { nominations, nominees } = data.props;
  export let reviewCount: number = 0;
  export let artCount: number = 0;
  export let athleticsCount: number = 0;
  export let eduCount: number = 0;
  export let businessCount: number = 0;
  export let humanitiesCount: number = 0;
  export let govCount: number = 0;
  export let stemCount: number = 0;
  export let otherCount: number = 0;

  let selectedRowIds: string[] = [];

  $: mergeCandidates = generateMergeCandidates(selectedRowIds);

  const generateMergeCandidates = (selectedIds: string[]) => {
    if (selectedIds.length === 0) return [];
    const selectedNomination = nominations.find(n => n.ID == selectedRowIds[0].substring(2))
    if (!selectedNomination) return [];
    let fullName: string = `${selectedNomination.nomFirst} ${selectedNomination.nomLast}`;
    const sorted = fuzzysort.go(fullName, nominees, {
        all: false,
        key: 'fullName',
        threshold: -Infinity
    });
    // console.log(sorted);
    return sorted.map(a => a.obj);
  } 

  const populateRows = (nominations: any[]) => {
    let rowsReviewed: any[] = [];
    let rowsCreated: any[] = [];
    Object.entries(nominations).forEach(([key, nomination], index) => {
      

      if (nomination.nomStatus == "Created" ){ 
        rowsCreated.push({
            id: `a-${nomination.ID}`,
            nominee: `${nomination.nomFirst} ${nomination.nomLast}`,
            category: nomination.category,
            nominator: `${nomination.authorFirst} ${nomination.authorLast}`,
            date: new Date(nomination.date).toLocaleDateString('es-pa')
          });
      } else if (nomination.nomStatus != "Created") {
        reviewCount++;
        rowsReviewed.push(
          {
            id: `a-${nomination.ID}`,
            nominee: `${nomination.nomFirst} ${nomination.nomLast}`,
            category: nomination.category,
            nominator: `${nomination.authorFirst} ${nomination.authorLast}`,
            date: new Date(nomination.date).toLocaleDateString('es-pa'),
            status: `${nomination.nomStatus}`
          });
      }

      switch (nomination.category) {
        case "Art":
          artCount++;
          break;
        case "Athletics":
          athleticsCount++;
          break;
        case "Business":
          businessCount++;
          break;
        case "Education":
          eduCount++;
          break;
        case "Humanities":
          humanitiesCount++;
          break;
        case "Public Service / Government":
          govCount++;
          break;
        case "STEM":
          stemCount++;
          break;
        case "Other":
          otherCount++;
          break;
        default:
          break;
      }
    });
    var rows = [rowsCreated, rowsReviewed]
    return rows;
  };

  $: rows = populateRows(nominations);
  $: rowsReviewed = rows[1];
  $: rowsCreated = rows[0];
</script>

<main>
  <header><Navigation /></header>
  <div id="container">
    <Breadcrumb>
      <BreadcrumbItem href="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>Nominations</BreadcrumbItem>
    </Breadcrumb>    
  </div>
  <div class="half-container">
    <div id="half-left">
      <h3>Submitted Nominations</h3>
      <Accordion size="sm">
        <AccordionItem>
          <svelte:fragment slot="title">
          <h4>Overview</h4>
          </svelte:fragment>
          <Column>
            <NominationOverview
              totalNominations={rowsCreated.length + rowsReviewed.length}
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
          </Column>
        </AccordionItem>
      </Accordion>

      <NominationInformation reviewed={false} rows={rowsCreated} bind:selectedRowIds />

      <Accordion size="sm">
        <AccordionItem>
          <svelte:fragment slot="title">
          <h4>Reviewed Nominations</h4>
          </svelte:fragment>
          <Column>
            <NominationInformation reviewed={true} rows={rowsReviewed} bind:selectedRowIds/>
          </Column>
        </AccordionItem>
      </Accordion>
    </div>
    <div id="half-right">
      <h3>Review Nomination</h3>
      {#if selectedRowIds.length !== 0}
      <AcceptReject
        bind:incomingRowIds={selectedRowIds}
        bind:nominations
        mergeCandidates={mergeCandidates}
      />
      {:else}
      <PleaseSelect />
      {/if}
      
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
    padding-left: 4rem;
    padding-right: 2rem;
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
