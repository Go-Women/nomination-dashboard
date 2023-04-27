<script lang="ts">
  import { Button, InlineNotification, Modal, NumberInput } from "carbon-components-svelte";

  export let data;
  export let { currentCohort } = data.props;
  let currentStartDate = new Date(currentCohort.startDate).toISOString().split('T')[0];
  let currentInductionYear = currentCohort.inductionYear;

  let cohortModalOpen = false;
  let cohortModalText: number;
  let cohortError = false;

  let modalPrimaryFunc = () => {
    cohortModalOpen = false;
    if (!cohortModalText) cohortError = true;
    else (document.getElementById('cohortStartForm') as HTMLFormElement).submit();
  }
</script>

<main>
  <div class="bx--content--main content">
    <h1>Settings</h1>
    <div class="cohorts">
      <h3>Cohorts</h3>
      The current cohort for Induction Year {currentInductionYear} started on {currentStartDate}.
      <form method="POST" action="?/cohorts" id="cohortStartForm">
        <input type="hidden" name="inductionYear" value={cohortModalText}>
      </form>
      <Button kind="danger" on:click={() => (cohortModalOpen = true)}>Start new cohort</Button>
      {#if cohortError}
        <InlineNotification
          title="Error:"
          subtitle="You must specify the Induction Year."
        />
      {/if}
    </div>
    <div class="admins">
      <h3>Administrators</h3>
      <Button href="/settings/create">Add Administrator Account</Button>
    </div>
  </div>

  <Modal
    danger
    bind:open={cohortModalOpen}
    modalHeading="Begin Cohort"
    primaryButtonText="Confirm"
    secondaryButtonText="Cancel"
    selectorPrimaryFocus="#numinput"
    on:click:button--secondary={() => (cohortModalOpen = false)}
    on:click:button--primary={() => modalPrimaryFunc()}
    >
      <p>Create a new cohort for Induction Year</p>
      <NumberInput bind:value={cohortModalText} id="numimput" />
    </Modal>
</main>

<style>
  .content {
    margin: 5em;
  }
</style>
