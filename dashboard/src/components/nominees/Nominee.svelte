<script lang="ts">
  import { Button, Column, Dropdown, Form, FormGroup, Grid, Row, TextInput } from "carbon-components-svelte";
  import {Edit, Group, Save} from "carbon-icons-svelte";
  import Cancel from "carbon-icons-svelte/lib/Close.svelte";

  export let nominee: any;
  export let review: boolean;

  const fullName = `${nominee.firstName} ${nominee.lastName}`;
  let firstName = `${nominee.firstName}`;
  let lastName = `${nominee.lastName}`;

  let nomineeEdit = false;
  function handleEdit() {
    nomineeEdit = !nomineeEdit;
  }

  const statuses = [
    { id: "n100", text: "Created" },  // nomination created and not approved or rejected yet
    { id: "n200", text: "Reviewed" }, // Ready to be matched/unmatched nominees
    { id: "n300", text: "Selected" }, // nominated into the hall
    { id: "n400", text: "Rejected" }, // rejected from the hall (initial nomination; nominee when a not all 3 judges say yes)
    { id: "n500", text: "Capacity" }, // nominee at capacity
    { id: "m300", text: "Matched" }, // match confirmed
    { id: "m200", text: "Manual Review" }, // when a nominee category is other or marked for manual assignment
    { id: "m500", text: "Judge Reviewed" }, // when a nominee is reviewed by 3 judges
  ];

  let nomStatus = statuses.find((item) => item.text === `${nominee.nomStatus}`)?.id ?? "N/A";
  const statusSelected = (status: string) =>
    statuses.find((item) => item.id === status)?.text ?? "N/A";

  $: status = statusSelected(nomStatus);
</script>

<main>
  <Grid>
  {#if nomineeEdit}
      <Form method = "POST" action="?/updateNominee">
        <FormGroup>
          <br /><strong>First Name</strong>
          <TextInput type="text" name="firstName" bind:value={firstName} />
          <br /><strong>Last Name</strong>
          <TextInput type="text" name="lastName" bind:value={lastName} />
          <Dropdown
            titleText="Nominee Status"
            bind:selectedId={nomStatus}
            items={statuses}
          />
          <input type="hidden" name="nomStatus" value={nomStatus} />
        </FormGroup>
      <Row>
        <Column>Year of Birth</Column>
        <Column>{nominee.yob}</Column>
      </Row>
      <Row>
        <Column>Contribution Areas</Column>
        <Column>{nominee.category}</Column>
      </Row>
      {#if nominee.subcategoryOther}
        <Row>
          <Column>User-Submitted Area</Column>
          <Column>{nominee.subcategoryOther}</Column>
        </Row>
      {/if}
      {#if nominee.subcategory}
        <Row>
          <Column>Contribution Subcategories</Column>
          <Column>{nominee.subcategory}</Column>
        </Row>
      {/if}
      <div class="btn-right">
        <Row>
          <Column>
          <Button
            kind="danger"
            iconDescription="Cancel"
            icon={Cancel}
            on:click|once={handleEdit}>Cancel</Button
          >
        </Column>
        <Column>
          <Button iconDescription="Save" type="submit" icon={Save}>Save</Button>
        </Column>
        </Row>
      </div>
    </Form>
  {:else}
    <Row>
      <Column>Full Name</Column>
      <Column>{fullName}</Column>
    </Row>
    {#if !review}
      <Row>
        <Column>Nominee Status</Column>
        <Column>{nominee.nomStatus}</Column>
      </Row>
    {/if}
    <Row>
      <Column>Year of Birth</Column>
      <Column>{nominee.yob}</Column>
    </Row>
    <Row>
      <Column>Contribution Areas</Column>
      <Column>{nominee.category}</Column>
    </Row>
    {#if nominee.subcategoryOther}
      <Row>
        <Column>User-Submitted Area</Column>
        <Column>{nominee.subcategoryOther}</Column>
      </Row>
    {/if}
    {#if nominee.subcategory}
      <Row>
        <Column>Contribution Subcategories</Column>
        <Column>{nominee.subcategory}</Column>
      </Row>
    {/if}
    {#if !nomineeEdit}
      <div class="btn-right">
        <Row>
          <Button iconDescription="Edit" icon={Edit} on:click|once={handleEdit}>Edit</Button>
        </Row>
      </div>
    {/if}
  {/if}
  </Grid>
</main>

<style>
  .btn-right {
    margin-top: 1rem;
    float: inline-end;
  }
</style>
