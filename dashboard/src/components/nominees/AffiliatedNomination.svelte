<script lang="ts">
  import { Checkbox, Column, Form, FormGroup, Grid, Row, TextArea } from "carbon-components-svelte";
    import { text } from "svelte/internal";
    import type Nomination from "../nominations/Nomination.svelte";

  export let nomination: Nomination;
  export let keys: any;

  let ckboxCkr = (question: string, key: string): boolean => {
    return nomination[question].includes(key);
  };

  /**
   * Transforms a comma-separated list of codes to their full values
   * @param input String to transform
   */
  let kg = (input: string): string => {
    let result = "";
    let splits = input.split(",");
    for (let split of splits) {
      result += `${keys[split]}, `;
    }
    return result.substring(0, result.length - 2);
  }

</script>

<main>
  <div id="grid-body">
    <Grid>
      <Row>
        <Column>Nominator</Column>
        <Column>{`${nomination['author-first']} ${nomination['author-last']}`}</Column>
      </Row>
      <Row>
        <Column>Nominator Email</Column>
        <Column>{nomination['author-email']}</Column>
      </Row>
      <Row>
        <Column>Nomination Date</Column>
        <Column>{nomination['date']}</Column>
      </Row>
      <Row style="margin-top: 1em;">
        <Column style="font-weight: bold;">Responses</Column>
      </Row>
      <Row>
        <Column>Contribution Areas</Column>
        <Column>{kg(nomination['nom-contrib-area'])}</Column>
      </Row>
      {#if nomination['nom-contrib-area-description']}
      <Row>
        <Column>User-Submitted Area</Column>
        <Column>{kg(nomination['nom-contrib-area-description'])}</Column>
      </Row>
      {/if}
      <Row>
        <Column>Contribution Subcategories</Column>
        <Column>{kg(nomination['nom-contrib-area-sub'])}</Column>
      </Row>
      {#if nomination['nom-deceased'] == 'no'}
        <Row>
          <Column>Nominee is alive?</Column>
          <Column>Yes, nominee is alive.</Column>
        </Row>
        <Row>
          <Column>Nominee will be influential?</Column>
          <Column>{nomination['nom-alive-achieve']}</Column>
        </Row>
      {:else}
        <Row>
          <Column>Nominee is alive?</Column>
          <Column>No, nominee is deceased.</Column>
        </Row>
        <Row>
          <Column>Nominee has been / is influential?</Column>
          <Column>{nomination['nom-deceased-achieve']}</Column>
        </Row>
      {/if}
      <Row style="margin-top: 1em;"><Column style="font-weight: bold;">Question 1</Column></Row>
      <Row>
        <Column>
          <Form>
            <Checkbox checked={ckboxCkr('nom-q1', 'q101')} labelText={keys['q101']} />
            <Checkbox checked={ckboxCkr('nom-q1', 'q102')} labelText={keys['q102']} />
            <Checkbox checked={ckboxCkr('nom-q1', 'q103')} labelText={keys['q103']} />
            <Checkbox checked={ckboxCkr('nom-q1', 'q104')} labelText={keys['q104']} />
            <Checkbox checked={ckboxCkr('nom-q1', 'q105')} labelText={keys['q105']} />
          </Form>
        </Column>
        <Column>
          <TextArea style="color: black" rows={3} value={nomination['nom-q1-description']} disabled />
        </Column>
      </Row>
      <Row style="margin-top: 1em;"><Column style="font-weight: bold;">Question 2</Column></Row>
      <Row>
        <Column>
          <Form>
            <Checkbox checked={ckboxCkr('nom-q2', 'q201')} labelText={keys['q201']} />
            <Checkbox checked={ckboxCkr('nom-q2', 'q202')} labelText={keys['q202']} />
            <Checkbox checked={ckboxCkr('nom-q2', 'q203')} labelText={keys['q203']} />
          </Form>
        </Column>
        <Column>
          <TextArea style="color: black" rows={3} value={nomination['nom-q2-description']} disabled />
        </Column>
      </Row>
      <Row style="margin-top: 1em;"><Column style="font-weight: bold;">Question 3</Column></Row>
      <Row>
        <Column>
          <Form>
            <Checkbox checked={ckboxCkr('nom-q3', 'q301')} labelText={keys['q301']} />
            <Checkbox checked={ckboxCkr('nom-q3', 'q302')} labelText={keys['q302']} />
          </Form>
        </Column>
        <Column>
          <TextArea style="color: black" rows={3} value={nomination['nom-q3-description']} disabled />
        </Column>
      </Row>
      {#if nomination['nom-additional-info-description'].length > 0}
        <Row style="margin-top: 1em;">
          <Column>Additional Information</Column>
          <Column>
            <TextArea style="color: black" rows={3} value={nomination['nom-additional-info-description']} disabled />
          </Column>
        </Row>
      {/if}
    </Grid>
  </div>
</main>

<style>
  #grid-body {
    border: 0.25em solid lightgray;
    border-radius: 1em;
    margin-bottom: 1.5em;
    padding: 0.5em;
    font-size: 12pt;
  }  
</style>