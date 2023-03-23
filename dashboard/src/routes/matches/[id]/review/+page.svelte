<script lang="ts">
  import NomineeInfo from "../../../../components/nominees/NomineeInfo.svelte";
  import Navigation from "../../../../components/Navigation.svelte";
  import { Breadcrumb, BreadcrumbItem, Button, Checkbox, Column, Content, Form, FormGroup, RadioButton, RadioButtonGroup, TextArea } from "carbon-components-svelte";
  import "../../../../css/index.css";
  import { enhance } from "$app/forms";

  export let data;
  export let { ID, match, nominee, nominations, keys }: any = data.props;

  let q1ck: string[] = [];
  let q2ck: string[] = [];
  let q3ck: string[] = [];
</script>

<main>
  <header><Navigation /></header>

  <body>
    <Content>
      <Column>
        <div class="split-container">
          <div class="left-side">
            <NomineeInfo {nominee} {nominations} {keys} />
          </div>
          <div class="right-side">
            <h2>Evaluate</h2>
            <hr />
            <p class="head">Please evaluate the nominee to the left on the following criteria:</p>
            <form method="POST">
              <input type="hidden" name="matchId" value={ID} />
              <h4>Question 1: The nominee's contributions have been of the greatest value to society and/or the empowerment of women?</h4>
              <FormGroup legendText="Check the boxes if you agree with the statements.">
                <Checkbox name="nomQ1" bind:group={q1ck} value="q101" labelText="The nominee is a leader in their field of achievement" />
                <Checkbox name="nomQ1" bind:group={q1ck} value="q102" labelText="The nominee created significant change within their field" />
                <Checkbox name="nomQ1" bind:group={q1ck} value="q103" labelText="The nominee's contributions have significant and lasting impact" />
                <Checkbox name="nomQ1" bind:group={q1ck} value="q104" labelText="The nominee's contributions significantly impacts/inspires others" />
                <Checkbox name="nomQ1" bind:group={q1ck} value="q105" labelText="The nominee contributed to the empowerment of women and/or contributed to the empowerment of women nationally" />
                <input type="hidden" name="nomQ1" bind:value={q1ck}>
              </FormGroup>
              <h4>Question 2: The nominee's achievements had (will have) significicant national and/or global impact? (Local/Regional achievements do not qualify)</h4>
              <FormGroup legendText="Check the boxes if you agree with the statements.">
                <Checkbox name="nomQ2" bind:group={q2ck} value="q201" labelText="The nominee had a significant impact on their field of accomplishment" />
                <Checkbox name="nomQ2" bind:group={q2ck} value="q202" labelText="The nominee's contributions inspired change, either within their field or for society as a whole" />
                <Checkbox name="nomQ2" bind:group={q2ck} value="q203" labelText="The nominee's contributions created national and/or global change/impact" />
                <input type="hidden" name="nomQ2" bind:value={q2ck}>
              </FormGroup>
              <h4>Question 3: The nominee's achievements have (will have) enduring value?</h4>
              <FormGroup legendText="Check the boxes if you agree with the statements.">
                <Checkbox name="nomQ3" bind:group={q3ck} value="q301" labelText="The nominee's achievements created a change that has (or will) endure over time" />
                <Checkbox name="nomQ3" bind:group={q3ck} value="q302" labelText="The nominee's achievements created and maintained historical changes for society at large" />
                <input type="hidden" name="nomQ3" bind:value={q3ck}>
              </FormGroup>
              <TextArea name="nomAdditionalInfo" labelText="Please use this space to communicate questions/comments/concerns about this nomination. (Optional)" placeholder="Type here..." />
              <FormGroup legendText="In your opinion, does this nominee's achievements qualify them for Induction into the National Women's Hall of Fame?">
                <RadioButtonGroup name="verdict-rb-group">
                  <RadioButton name="verdict" value=1 labelText="Yes" required />
                  <RadioButton name="verdict" value=0 labelText="No" />
                </RadioButtonGroup>
              </FormGroup>
              <div id="submit-button">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </Column>
    </Content>
  </body>
</main>

<style>
  .split-container {
    display: grid;
    grid-template-columns: 75% 25%;
    grid-template-rows: 1fr;
  }

  .left-side {
    grid-column: 1;
    grid-row: 1;
    margin-left: -15%; /* NomineeInfo has 15% padding both sides */
  }

  .right-side {
    grid-column: 2;
    grid-row: 1;
    margin-left: -45%;
  }

  .head {
    margin-bottom: 1em;
  }
</style>
