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
    </Grid>
  </Content>
</main>
