<script lang="ts">
  import { Button } from "carbon-components-svelte";

  export let data;
  export let { currentCohort } = data.props;
  let currentStartDate = new Date(currentCohort.startDate).toISOString().split('T')[0];
</script>

<main>
  <div class="bx--content--main content">
    <h1>Settings</h1>
    <div class="cohorts">
      <h3>Cohorts</h3>
      The current cohort started on {currentStartDate}.
      <form method="POST" action="?/cohorts">
        <Button type="submit" kind="danger">Start new cohort</Button>
      </form>
    </div>
    <div class="admins">
      <h3>Administrators</h3>
      <Button href="/settings/create">Add Administrator Account</Button>
    </div>
  </div>
</main>

<style>
  .content {
    margin: 5em;
  }
</style>
