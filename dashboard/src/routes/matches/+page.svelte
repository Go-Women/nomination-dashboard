<script lang="ts">
  import {
    Content,
    Breadcrumb,
    BreadcrumbItem,
    Grid,
    Button,
    InlineNotification,
  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import Matches from "../../components/matches/Matches.svelte";

  export let data;
  export let { matches } = data.props;

  let buttonClicked = false;
  function showMatches() {
    buttonClicked = !buttonClicked;
  }

  var getInformation = (matches: JSON) => {
    let rows = new Array();
    Object.entries(matches).forEach(([key, match], index) => {
      let subCat = match.subcategory;
      if (subCat == "" || subCat == null) {
        subCat = match.subcategoryOther;
      }

      let judgeSubCat = match.judgeSubcategory;
      if (judgeSubCat == "" || judgeSubCat == null) {
        judgeSubCat = match.judgeSubcategoryOther;
      }

      let data = {
        id: index + 1,
        nomineeID: match.nomineeID,
        judgeID: match.judgeID,
        nomineeName: match.nomFullName,
        nomineeCategory: match.category,
        nomineeSubcategory: subCat,
        judgeName: match.judgeFullName,
        judgeCategory: match.judgeCategory,
        judgeSubcategory: judgeSubCat,
        judgeCapacity: match.judgeCapacity,
        // status: match.status, TODO: implement status
      };

      rows.push(data);
    });
    return rows;
  };
  export const rows = getInformation(matches);

  let pageSize = 25;
  let page = 1;
  var getPageSizes = (totalItems: number) => {
    let pages = Math.ceil(totalItems / 25);
    let pageArray = Array.from({ length: pages }).map((_, i) => (i + 1) * 25);
    return pageArray;
  };
</script>

<main>
  <header><Navigation /></header>
  <Content class="bx--content--main">
    <Grid>
      <Breadcrumb>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem>Matching</BreadcrumbItem>
      </Breadcrumb>

      <h1>Matching</h1>
      {#if buttonClicked === false}
        <InlineNotification
          lowContrast
          kind="error"
          subtitle="There aren't any potential matches yet. Click below to generate new matches."
        />
      {/if}
      <Button iconDescription="View" on:click|once={showMatches}
        >Generate New Matches</Button
      >

      {#if buttonClicked === true}
        <Matches {rows} />
      {/if}
    </Grid>
  </Content>
</main>
