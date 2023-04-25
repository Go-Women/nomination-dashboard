<script lang="ts">
    import { Button } from "carbon-components-svelte";


  let tempStartDate = "2023-01-01";

</script>

<main>
  <div class="bx--content--main content">
    <h1>Settings</h1>
    <div class="cohorts">
      <h3>Cohorts</h3>
      The current cohort started on {tempStartDate}.
      <form action="POST" method="cohorts">
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
