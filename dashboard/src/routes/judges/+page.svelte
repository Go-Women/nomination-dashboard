<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import {
    Content,
    Grid,
    Column,
    Row,
    Breadcrumb,
    BreadcrumbItem,
    Accordion,
    AccordionItem,
  } from "carbon-components-svelte";
  import JudgesInformation from "../../components/judges/JudgesInformation.svelte";
  import JudgeOverview from "../../components/judges/JudgeOverview.svelte";
  import JudgeAcceptReject from "../../components/judges/JudgeAcceptReject.svelte";
    import PleaseSelect from "../../components/nominations/PleaseSelect.svelte";

  export let data;
  export let { judges } = data.props;

  let selectedRowIds: string[] = [];
  
  let activeCount = 0;
  var incrementActiveCount = () => {
    return activeCount++;
  };

  var getInformation = (judges: JSON) => {
    let rows = new Array();
    Object.entries(judges).forEach(([key, judge], index) => {
      let data = {
        id: `j-${judge.ID}`,
        name: judge.firstName + " " + judge.lastName,
        pronouns: judge.info.pronouns,
        email: judge.email,
        phoneNumber: judge.info.phoneNumber,
        active: judge.active,
        category: judge.info.category,
        subcategory: judge.info.subcategory,
        capacity: judge.info.capacity,
        
      };

      if (judge.active === 1) {
        incrementActiveCount();
      }
      rows.push(data);
    });

    return rows;
  };
  export const rowsData = getInformation(judges);
  export const active = activeCount;
</script>

<main>
  <header><Navigation /></header>

  <div id="container">
    <Breadcrumb>
      <BreadcrumbItem href="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>Judges</BreadcrumbItem>
    </Breadcrumb>
  </div>
  <div class="half-container">
    <div id="half-left">
      <h3>Judges</h3>
      <Accordion size="sm">
        <AccordionItem>
          <svelte:fragment slot="title">
            <h4>Overview</h4>
          </svelte:fragment>
          <Column>
            <JudgeOverview {activeCount} />
          </Column>
        </AccordionItem>
      </Accordion>
      <JudgesInformation rows={rowsData} bind:selectedRowIds />
    </div>
    <div id="half-right">
      {#if selectedRowIds.length !== 0}
      <h3>Review Judge</h3>
      <JudgeAcceptReject
        bind:incomingRowIds={selectedRowIds}
        bind:judges
      />
      {:else}
      <PleaseSelect type={"judge"} />
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