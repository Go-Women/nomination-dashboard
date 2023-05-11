<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../../css/index.css";
  import {
    Content,
    Grid,
    Column,
    Row,
    Breadcrumb,
    BreadcrumbItem,
    Dropdown,
  } from "carbon-components-svelte";
  import NomineesOverview from "../../../components/nominees/NomineesOverview.svelte";
  import { writable } from "svelte/store";
  import { onDestroy } from "svelte";

  export let data;
  export let { nominees, cohorts, currentCohort } = data.props;

  const selectedLocalCohort = writable(localStorage.getItem("localCohort") || null);
  const unsubscribe = selectedLocalCohort.subscribe(val => localStorage.setItem("localCohort", val || ''));
  onDestroy(unsubscribe);

  let selectedCohort: string = $selectedLocalCohort || `${currentCohort.ID}`;
  let cohortList: any[] = [];
  for (let i = 0; i < cohorts.length; i++) {
    cohortList.push({ id: `${cohorts[i].ID}`, text: cohorts[i].inductionYear });
  }
  $: selectedLocalCohort.set(selectedCohort);

  var getInformation = (nominees: JSON, cohortID) => {
    let rows = new Array();
    Object.entries(nominees).forEach(([key, nominee], index) => {
      if (nominee.cohort == cohortID) {
        let subcategory = nominee.subcategory;
        if (subcategory == null) {
          subcategory = nominee.subcategoryOther;
        }
        let data = {
          id: nominee.ID,
          name: nominee.firstName + " " + nominee.lastName,
          status: nominee.nomStatus,
          yob: nominee.yob,
          category: nominee.category,
          subcategory: subcategory,
          subcategoryOther: nominee.subcategoryOther
        };
        rows.push(data);
      }
    });

    return rows;
  };
  $: rowsData = getInformation(nominees, selectedCohort);
</script>

<main>
  <Content class="bx--content--main">
    <Grid>
      <Breadcrumb>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem>Nominees</BreadcrumbItem>
      </Breadcrumb>

      <Column>
        <Row><h1>Nominees</h1></Row>
        <Dropdown type="inline" titleText="Selected cohort for Induction Year" bind:selectedId={selectedCohort} items={cohortList} />
        <NomineesOverview rows={rowsData} />
      </Column>
    </Grid>
  </Content>
</main>
