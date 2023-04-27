<script lang="ts">
  import {
      Accordion,
      AccordionItem, Breadcrumb,
      BreadcrumbItem, Column, Dropdown

  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import "../../../css/index.css";

  import AcceptReject from "../../../components/nominations/AcceptReject.svelte";
  import NominationInformation from "../../../components/nominations/NominationInformation.svelte";
  import NominationOverview from "../../../components/nominations/NominationOverview.svelte";

  import fuzzysort from "fuzzysort";
  import PleaseSelect from "../../../components/nominations/PleaseSelect.svelte";
  import { writable } from "svelte/store";
  import { onDestroy } from "svelte";

  export let data;
  export let { nominations, nominees, cohorts, currentCohort } = data.props;
  export let reviewCount: number = 0;
  export let artCount: number = 0;
  export let athleticsCount: number = 0;
  export let eduCount: number = 0;
  export let businessCount: number = 0;
  export let humanitiesCount: number = 0;
  export let govCount: number = 0;
  export let stemCount: number = 0;
  export let otherCount: number = 0;

  const selectedLocalCohort = writable(localStorage.getItem("localCohort") || null);
  const unsubscribe = selectedLocalCohort.subscribe(val => localStorage.setItem("localCohort", val || ''));
  onDestroy(unsubscribe);

  let selectedRowIds: string[] = [];
  let selectedCohort: string = $selectedLocalCohort || `${currentCohort.ID}`;
  let cohortList: any[] = [];
  for (let i = 0; i < cohorts.length; i++) {
    cohortList.push({ id: `${cohorts[i].ID}`, text: cohorts[i].startDate.split('T')[0] });
  }
  $:{
    selectedLocalCohort.set(selectedCohort);
    selectedRowIds = [];
  }

  $: mergeCandidates = generateMergeCandidates(selectedRowIds, selectedCohort);

  const generateMergeCandidates = (selectedIds: string[], cohortID: string) => {
    if (selectedIds.length === 0) return [];
    const selectedNomination = nominations.find(n => n.ID == selectedRowIds[0].substring(2))
    if (!selectedNomination) return [];
    let fullName: string = `${selectedNomination.nomFirst} ${selectedNomination.nomLast}`;
    let filteredNominees = nominees.filter((n: any) => n.cohort == cohortID);
    const sorted = fuzzysort.go(fullName, filteredNominees, {
        all: false,
        key: 'fullName',
        threshold: -Infinity
    });
    
    return sorted.map(a => a.obj);
  } 

  const populateRows = (nominations: any[], cohortID: string) => {
    let rowsReviewed: any[] = [];
    let rowsCreated: any[] = [];
    artCount = 0;
    athleticsCount = 0;
    businessCount = 0;
    eduCount = 0;
    humanitiesCount = 0;
    govCount = 0;
    stemCount = 0;
    otherCount = 0;
    reviewCount = 0;
    Object.entries(nominations).forEach(([key, nomination], index) => {
      if (nomination.cohort == cohortID) {
        let subCat = nomination.subcategory;
        if (subCat === null)
          subCat = `${nomination.subcategoryOther}`;
          
        if (nomination.nomStatus == "Created" ){ 
          rowsCreated.push({
              id: `a-${nomination.ID}`,
              nomination: `${nomination.nomFirst} ${nomination.nomLast}`,
              category: `${nomination.category}`,
              subcategory: subCat,
              nominator: `${nomination.authorFirst} ${nomination.authorLast}`,
              date: new Date(nomination.date).toLocaleDateString('es-pa')
            });
        } else if (nomination.nomStatus != "Created") {
          reviewCount++;
          rowsReviewed.push(
            {
              id: reviewCount,
              nomID: `a-${nomination.ID}`,
              nominee: `${nomination.nomFirst} ${nomination.nomLast}`,
              category: `${nomination.category}`,
              subcategory: subCat,
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
      }
      
    });
    var rows = [rowsCreated, rowsReviewed]
    return rows;
  };

  $: rows = populateRows(nominations, selectedCohort);
  $: rowsReviewed = rows[1];
  $: rowsCreated = rows[0];
</script>

<main>
  <div id="container">
    <Breadcrumb>
      <BreadcrumbItem href="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>Nominations</BreadcrumbItem>
    </Breadcrumb>    
  </div>
  <div class="half-container">
    <div id="half-left">
      <h3>Submitted Nominations</h3>
      <Dropdown type="inline" titleText="Selected cohort starting" bind:selectedId={selectedCohort} items={cohortList} />
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
  <div id="container">
    <Accordion size="sm">
      <AccordionItem>
        <svelte:fragment slot="title">
        <h4>Reviewed Nominations</h4>
        </svelte:fragment>
        <NominationInformation reviewed={true} rows={rowsReviewed} bind:selectedRowIds/>
      </AccordionItem>
    </Accordion>
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
