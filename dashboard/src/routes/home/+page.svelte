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
  import NomineeCategories from "../../components/dashHome/NomineeCategories.svelte";
  import NomineeSubcategories from "../../components/dashHome/NomineeSubcategories.svelte";

  let logo =
    "https://www.womenofthehall.org/wp-content/themes/NWHoF/assets/imgs/logo-nwhof.png";
</script>

<main>
  <header><Navigation /></header> 
  <Row style="justify-content: center; background-color:#0068b3; padding-top: 2rem;">
    <ClickableTile href="/" style="background-color: #0068b3; width: 100%;">
      <ImageLoader style="height: 8rem; width: 28rem;" src={logo} class="logo-home" />
    </ClickableTile>
  </Row>
  <Content class="bx--content--main">
    <Grid>
      <Row>
        <Column><NominationOverview /></Column>
        <Column><JudgeProcess /></Column>
      </Row>
      <Row>
        <Column><NomineeCategories /></Column>
        <Column><NomineeSubcategories /></Column>
      </Row>
    </Grid>
  </Content>
</main>
