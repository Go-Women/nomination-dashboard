<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import { Content, Grid, Button, Breadcrumb, BreadcrumbItem, Form } from "carbon-components-svelte";


  let tempStartDate = "2023-01-01";

</script>

<main>
  <header><Navigation /></header>
  <Content class="bx--content--main">
    <h1>Settings</h1>
    <div class="cohorts">
      <h3>Cohorts</h3>
      The current cohort started on {tempStartDate}.
      <form action="POST" method="?/cohort">
        <Button type="submit" kind="danger">Start new cohort</Button>
      </form>
    </div>
  </Content>
</main>
