<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import { Content, Grid } from "carbon-components-svelte";

  export let data;
  export let { cohorts } = data.props;
</script>

<main>
  <header><Navigation /></header>
  <Content class="bx--content--main">
    <Grid>
    </Grid>
  </Content>
</main>
