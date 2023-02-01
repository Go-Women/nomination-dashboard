<script lang="ts">
  import {
    Content,
    Grid,
    Row,
    Column,
    ImageLoader,
  } from "carbon-components-svelte";
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
  <Content>
    <Grid>
      <Row>
        <ImageLoader style="height: 8rem; width: 20rem;" src={logo} />
      </Row>
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
