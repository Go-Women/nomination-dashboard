<script lang="ts">
  import { Button, Checkbox, NumberInput, RadioButton, RadioButtonGroup, TextArea, TextInput } from "carbon-components-svelte";
  import { text } from "svelte/internal";
  import MultiSelect from "svelte-multiselect";
  
  export let incomingRowIds: string[];
  export let judges: any[];
  $: judge = judges.find(n => n.ID == incomingRowIds[0].substring(2)) || {};

</script>

<main>
  <div class="split-container">
    <div class="split-left">
      <div class="information">
        <h5>Basic Information</h5>
        <ul class="no-style">
          <TextInput labelText="Name" value={`${judge.firstName} ${judge.lastName}`} readonly />
          <TextInput labelText="Email" value={judge.email} readonly />
          <TextInput labelText="Phone" value={judge.info.phoneNumber} readonly />
          <TextInput labelText="Pronouns" value={judge.info.pronouns} readonly />
          <li class="break">
            <Checkbox labelText="Previous Judge" checked={judge.info.previousJudge == true || judge.info.previousJudge == "1"} />
            <Checkbox labelText="OK with deadline" checked={judge.info.deadline == true || judge.info.deadline == "1"} />
          </li>
          <li>Nomination capacity: <span class="underline">{judge.info.capacity}</span></li>
        </ul>
      </div>
    </div>
    <div class="split-right">
      <div class="information">
        <ul class="no-style">
          <h5>Credentials</h5>
          <li class="btm-break">Category</li>
          <MultiSelect
            options={[{value: '0', label: judge.info.category}]}
            selected={[{value: '0', label: judge.info.category}]}
            disabled
          />
          <li class="btm-break">Subcategory</li>
          <MultiSelect
            options={[{value: '0', label: judge.info.subcategory}]}
            selected={[{value: '0', label: judge.info.subcategory}]}
            disabled
          />
          <li class="break btm-break">
            <TextInput labelText="LinkedIn" value={judge.info.linkedin} readonly />
          </li>
          <TextArea labelText="Biography" rows={5} value={judge.info.bio} readonly />
        </ul>
      </div>
    </div>
    <div class="split-bottom">
      {#if judge.info.recommendations && judge.info.recommendations.length > 0}
      <TextArea labelText="People I think should be considered for the Panel" rows={2} value={judge.info.recommendations} readonly />
      {/if}
      {#if judge.info.conflicts && judge.info.conflicts.length > 0}
      <TextArea labelText="Conflicts" rows={2} value={judge.info.conflicts} readonly />
      {/if}
      {#if judge.info.addInfo && judge.info.addInfo.length > 0}
      <TextArea labelText="Additional Information" rows={5} value={judge.info.addInfo} readonly />
      {/if}
      <div class="action-zone">
        <div class="button-area">
          <Button kind="tertiary">Accept Judge</Button>
          <Button kind="danger-tertiary">Deny Judge</Button>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
.split-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 0.5em;
}
.split-left {
  grid-column: 1;
  grid-row: 1;
}
.split-right {
  grid-column: 2;
  grid-row: 1;
}
.split-bottom {
  margin-top: 2em;
  grid-column: span 2;
  grid-row: 2;
}
.information {
  font-size: 14pt;
}
.no-style {
  list-style: none;
}
.no-style > li {
  margin-left: 0;
}
.break {
  margin-top: 1em;
}
.underline {
  text-decoration: underline;
}
.btm-break {
  margin-bottom: 0.5em;
}
.action-zone {
  display: grid;
  grid-template-columns: 75% 25%;
  grid-template-rows: 1fr;
  gap: 0.5em;
  margin-top: 0.5em;
}
.button-area {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>