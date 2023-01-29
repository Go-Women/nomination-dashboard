<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import { Content, Grid, Column, Row } from "carbon-components-svelte";

  export let data;
  export let { judges } = data.props;
</script>

<main>
  <header><Navigation /></header>
  <Content>
    <Grid>
      <ui>
        <h1>Judges</h1>
        {#each Object.entries(judges) as [id, judge]}
          <li>
            <a href="/judges/{id}"
              >({id}) {judge.firstName}
              {judge.lastName}.</a
            >
          </li>
        {/each}
      </ui>
    </Grid>
  </Content>
</main>
