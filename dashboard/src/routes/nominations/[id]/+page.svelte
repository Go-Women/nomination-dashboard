<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../../css/index.css";
  import Navigation from "../../../components/Navigation.svelte";
  import { Content } from "carbon-components-svelte";
  export let data;
  export let { n } = data.props;
</script>

<main>
  <header><Navigation /></header>
  <Content>
    <h1>Nomination</h1>
  </Content>
</main>
