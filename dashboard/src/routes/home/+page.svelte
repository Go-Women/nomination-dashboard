<script lang="ts">
  import {
    Content,
    Grid,
    Row,
    Column,
    ImageLoader,
    ClickableTile,
  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import NominationOverview from "../../components/dashHome/NominationOverview.svelte";
  import JudgeProcess from "../../components/dashHome/JudgeProcess.svelte";
  import NominationsCategories from "../../components/dashHome/NominationsCategories.svelte";
  import Matches from "../../components/dashHome/Matches.svelte";

  let logo =
    "https://www.womenofthehall.org/wp-content/themes/NWHoF/assets/imgs/logo-nwhof.png";

  export let data;
  export let { nominations, nominees, judges, matches } = data.props;

  export let artCount: number = 0;
  export let athleticsCount: number = 0;
  export let eduCount: number = 0;
  export let businessCount: number = 0;
  export let humanitiesCount: number = 0;
  export let govCount: number = 0;
  export let stemCount: number = 0;
  export let otherCount: number = 0;
  export let createdCount: number = 0;
  export let reviewCount: number = 0;

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
      if (nomination.nomStatus === 'Created')
        createdCount++;
      else reviewCount++;
      
      switch(nomination.category) {
        case 'Art':
          artCount++;
          break;
        case 'Athletics':
          athleticsCount++;
          break;
        case 'Business':
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
  export const totalNominations: number = nominations.length;
</script>

<main>
  <header><Navigation /></header> 
  <Row style="justify-content: center; background-color:#0068b3; padding-top: 2rem;">
    <ClickableTile href="/" style="background-color: #0068b3; width: 100%;">
      <ImageLoader style="height: 8rem; width: 20rem;" src={logo} class="logo-home" />
    </ClickableTile>
  </Row>
  <Content class="bx--content--main">
    <Grid>
      <Row>
        <Column><NominationOverview {totalNominations} {reviewCount} {createdCount}/></Column>
        <Column><JudgeProcess {judges}/></Column>
      </Row>
      <Row>
        <Column>
          <NominationsCategories 
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
        <Column><Matches {nominees} {judges} {matches}/></Column>
      </Row>
    </Grid>
  </Content>
</main>
