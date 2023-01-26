<script lang="ts">
  import {
    Content,
    Grid,
    Row,
    Column,
    ImageLoader,
  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import "../css/index.css";
  import Navigation from "../components/Navigation.svelte";
  import NominationOverview from "../components/dash/NominationOverview.svelte";
  import JudgeProcess from "../components/dash/JudgeProcess.svelte";
  import NomineeCategories from "../components/dash/NomineeCategories.svelte";
  import NomineeSubcategories from "../components/dash/NomineeSubcategories.svelte";

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
