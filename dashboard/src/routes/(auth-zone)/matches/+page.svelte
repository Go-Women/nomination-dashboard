<script lang="ts">
  import {
    Content,
    Breadcrumb,
    BreadcrumbItem,
    Grid,
    Button,
    InlineNotification,
    Accordion,
    AccordionItem,
    Row,
    Column,
  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import "../../../css/index.css";
  import Matches from "../../../components/matches/Matches.svelte";
  import OverviewMatches from "../../../components/matches/OverviewMatches.svelte";
  import ManualMatches from "../../../components/matches/ManualMatches.svelte";

  export let data;
  // matches --> confirmed matches
  // suggestions --> visible when clicking on generate matches (shows match suggestions)
  // judges --> any judges that can be selected to match
  // nominees --> that can be selected to match
  // manual --> any nominees with an other category or ones marked for manual review/unmatched
  export let { matches, suggestions, judges, nominees, manual } = data.props;

  export let reviewCount: number = 0;
  export let manualCount: number = Object.keys(manual).length;
  export let matchedCount: number = 0;
  // export let unmatchedCount: number = 0;

  var getMatchesSuggestions = (suggestions: JSON) => {
    let rows = new Array();
    reviewCount = 0;
    Object.entries(suggestions).forEach(([key, match], index) => {
      let subCat = match.subcategory;
      if (subCat == "" || subCat == null) {
        subCat = match.subcategoryOther;
      }

      let data = {
        id: index + 1,
        matchID: match.ID,
        matchStatus: match.matchStatus,
        nomineeID: match.nomID,
        judgeID: match.judgeID,
        nomineeName: match.nomFullName,
        nomineeCategory: match.category,
        nomineeSubcategory: subCat,
        judgeName: match.judgeFullName,
        judgeCategory: match.judgeCategory,
        judgeSubcategory: match.judgeSubcategory,
        judgeCapacity: match.judgeMatchesAssigned + "/" + match.judgeCapacity,
        action: [match.nomID, match.judgeID]
      };

      if (generatedMatches)
        reviewCount++;

      rows.push(data);
    });
    return rows;
  };
  export const suggestedMatches = getMatchesSuggestions(suggestions);

  var getMatches = (matches: JSON) => {
    let rows = new Array();
    Object.entries(matches).forEach(([key, match], index) => {
      let subCat = match.subcategory;
      if (subCat == "" || subCat == null) {
        subCat = match.subcategoryOther;
      }

      let data = {
        id: index + 1,
        matchStatus: match.matchStatus,
        nomineeID: match.nomineeID,
        judgeID: match.judgeID,
        nomineeName: match.nomFullName,
        nomineeCategory: match.category,
        nomineeSubcategory: subCat,
        nomineeCapacity: match.matchesAssigned + "/" + match.capacity,
        judgeName: match.judgeFullName,
        judgeCategory: match.judgeCategory,
        judgeSubcategory: match.judgeSubcategory,
        judgeCapacity: match.judgeMatchesAssigned + "/" + match.judgeCapacity,
        action: [match.ID, match.nomineeID, match.judgeID, match.category]
      };

      rows.push(data);
    });
    return rows;
  };
  export const confirmedMatches = getMatches(matches);

  var getManualInformation = (manual: JSON) => {
    let rows = new Array();
    Object.entries(manual).forEach(([key, nominee], index) => {
      let subCat = nominee.subcategory;
      if (subCat == "" || subCat == null) {
        subCat = nominee.subcategoryOther;
      }

      let data = {
        id: nominee.nomineeID,
        nomineeID: nominee.nomineeID,
        nomineeName: nominee.fullName,
        nomineeCategory: nominee.category,
        nomineeSubcategory: subCat,
        nomineeStatus: nominee.nomStatus,
        nomineeCapacity: nominee.matchesAssigned + "/" + nominee.capacity
      };

      if (nominee.nomStatus != "None")
        if (nominee.nomStatus == "m200")
          manualCount += 1;
      
      rows.push(data);
    });
    return rows;
  }
  export const manualMatches = getManualInformation(manual);

  var getJudgesAvailable = (judges: JSON) => {
    let rows = new Array();
    
    Object.entries(judges).forEach(([key, judge], index) => {
      let data = {
        rowID: index,
        id: judge.judgeID,
        judgeName: judge.fullName,
        judgeCategory: judge.category,
        judgeSubcategory: judge.subcategory,
        judgeStatus: judge.judgeStatus,
        judgeCapacity: judge.judgeMatchesAssigned + "/" + judge.judgeCapacity,
        bio: (judge.bio == "null") ? null : judge.bio,
        linkedin: (judge.linkedin == "null") ? null : judge.linkedin,
        addInfo: (judge.addInfo == "null") ? null : judge.addInfo,
        previousJudge: judge.previousJudge
      };

      rows.push(data);
    });
    return rows;
  }

  export const judgesAvailable = getJudgesAvailable(judges);
  // console.log(judgesAvailable);

  let pageSize = 25;
  let page = 1;
  var getPageSizes = (totalItems: number) => {
    let pages = Math.ceil(totalItems / 25);
    let pageArray = Array.from({ length: pages }).map((_, i) => (i + 1) * 25);
    return pageArray;
  };

  var generatedMatches = false;   // todo how to make this not reset on refresh maybe using local storage
  function generateMatches() {
    generatedMatches = true;
    getMatchesSuggestions(suggestions);
  };

  function setMatchedCount() {
    matchedCount = Object.keys(matches).length;
    return matchedCount;
  };

  const reviewStatus = suggestions[0].matchStatus;  // default 'Unmatched' otherwise 'Review'
  const manualStatus = manual[0].nomStatus; // this is automatically updated when a nominee has a subcategory of other default 'None' otherwise 'Manual Review'
  const matchStatus = matches[0].matchStatus; // default 'Unmatched' once a match is created 'Matched'
</script>

<main>
  <Content class="bx--content--main">
    <Grid>
      <Breadcrumb>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem>Matching</BreadcrumbItem>
      </Breadcrumb>

      <Row>
        <Column>
          <h1>Matches</h1>
        </Column>
        <Column>
          <!-- <form method="POST" action="?/generate"> -->
            <!-- <input name="judgeStatus" type="hidden" value='m100' /> -->
            <Button iconDescription="View" on:click={() => (generateMatches())} type="submit" style="float: right">Generate New Matches</Button>
          <!-- </form> -->
        </Column>
      </Row>

      {#if matchStatus == "Unmatched"}
          <InlineNotification
          lowContrast
          kind="warning"
          subtitle="Click match button to generate matches."
        />
      {/if}
      
      <div id="container">
          <OverviewMatches {reviewCount} {manualCount} {matchedCount} />
      </div>
      
      {#if generatedMatches}
        {#if reviewStatus === 'Review'}
          <div id="container">
            <Accordion size="sm">
              <AccordionItem open>
                <svelte:fragment slot="title">
                  <h4>Suggested Matches Review</h4>
                </svelte:fragment>
                  <Matches rows={suggestedMatches} review={true}/>
              </AccordionItem>
              </Accordion>
          </div>
        {/if}
      {/if}
      {#if matchStatus === 'Matched' && setMatchedCount() > 0}
        <div id="container">
          <Accordion size="sm">
            <AccordionItem>
              <svelte:fragment slot="title">
                <h4>Matches</h4>
              </svelte:fragment>
              <Matches rows={confirmedMatches}  review={false}/>
            </AccordionItem>
            </Accordion>
        </div>
      {/if}
      {#if manualStatus === 'Manual Review'}
        <!-- {#if manualMatches[0].nomineeStatus != "None" } -->
          <br>
          <div id="container">
            <Accordion size="sm">
              <AccordionItem>
                <svelte:fragment slot="title">
                  <h4>Manual Assignment</h4>
                </svelte:fragment>
                <ManualMatches rows={manualMatches} judges={judgesAvailable}/>
              </AccordionItem>
              </Accordion>
          </div>
        <!-- {/if} -->
        
      {/if}
    </Grid>
  </Content>
</main>
<style>
  main {
    padding-top: 4rem;
    padding-left: 2rem;
  }
  
  /* .half-container {
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
  } */
</style>