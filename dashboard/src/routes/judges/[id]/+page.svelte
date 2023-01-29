<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../../css/index.css";
  import Navigation from "../../../components/Navigation.svelte";
  import {
    Content,
    Column,
  } from "carbon-components-svelte";
  export let data;
  export let { j } = data.props;
</script>

<main>
  <header><Navigation /></header>
  <body>
    <Content style="padding-left: $spacing-05">
      <Column>
        <h1>Judge</h1>
        <h2>{j.firstName} {j.lastName}</h2>

        <h3>
          Information
        </h3>

        <p>Skill: <b>{j.data.skill}</b></p>

        <p>
          Capacity: <b>{j.data.weight}</b>
        </p>
      </Column>
    </Content>
  </body>
</main>
