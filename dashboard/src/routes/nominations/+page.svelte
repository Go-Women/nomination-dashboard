<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import { Content, Grid, Column, Row } from "carbon-components-svelte";

  export let data;
  export let { nominations } = data.props;
</script>

<main>
  <header><Navigation /></header>
  <Content>
    <Grid>
      <ui>
        <h1>Nominees</h1>
        {#each Object.entries(nominations) as [id, nomination]}
          <li>
            <a href="/nominations/{id}"
              >({id}) {nomination.nominee.firstName}
              {nomination.nominee.lastName}.</a
            >
          </li>
        {/each}
      </ui>
    </Grid>
  </Content>
</main>
