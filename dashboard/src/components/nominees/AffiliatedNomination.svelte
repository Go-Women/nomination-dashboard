<script lang="ts">
  import { Checkbox, Column, Form, FormGroup, Grid, Row, TextArea, Button, TextInput } from "carbon-components-svelte";
    import { text } from "svelte/internal";
    import Edit from "carbon-icons-svelte/lib/Edit.svelte";
    import Save from "carbon-icons-svelte/lib/Save.svelte";
    import Cancel from "carbon-icons-svelte/lib/Close.svelte";
    import type Nomination from "../nominations/Nomination.svelte";

  export let nomination: Nomination;
  export let keys: any;
  export let review: boolean;

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
      result += keys[split] + ", ";
    }
    return result.substring(0, result.length - 2);
  }

  let nominationEdit = false;
  function handleEdit() {
    nominationEdit = !nominationEdit;
  }

</script>

<main>
  <div id="grid-body">
    {#if nominationEdit === true}
    <Form method = "POST" action="?updateNomination">
      <FormGroup>
      <Grid>
        {#if !review}
          <Row>
            <Column>Nominator</Column>
            <Column>{`${nomination.authorFirst} ${nomination.authorLast}`}</Column>
          </Row>
          <Row>
            <Column>Nominator Email</Column>
            <Column>{nomination.authorEmail}</Column>
          </Row>
          <Row>
            <Column>Nomination Date</Column>
            <Column>{new Date(nomination.date).toLocaleDateString('es-pa')}</Column>
          </Row>
        {/if}
        <Row style="margin-top: 1em;">
          <Column style="font-weight: bold;">Responses</Column>
        </Row>
        <Row>
          <Column>Contribution Areas</Column>
          <Column>{nomination.category}</Column>
        </Row>
        {#if nomination.subcategoryOther}
        <Row>
          <Column>User-Submitted Area</Column>
          <Column>{nomination.subcategoryOther}</Column>
        </Row>
        {/if}
        {#if nomination.subcategory}
        <Row>
          <Column>Contribution Subcategories</Column>
          <Column>{nomination.subcategory}</Column>
        </Row>
        {/if}
        {#if nomination.nomDeceased == 1}
          <Row>
            <Column>Nominee is alive?</Column>
            <Column>Yes, nominee is alive.</Column>
          </Row>
          <Row>
            <Column>Nominee will be influential?</Column>
            <Column>{nomination.nomAchieved == 0 ? "Yes" : "No"}</Column>
          </Row>
        {:else}
          <Row>
            <Column>Nominee is alive?</Column>
            <Column>No, nominee is deceased.</Column>
          </Row>
          <Row>
            <Column>Nominee has been / is influential?</Column>
            <Column>{nomination.nomAchieved == 0 ? "Yes" : "No"}</Column>
          </Row>
        {/if}
        <Row style="margin-top: 1em;"><Column style="font-weight: bold;">Question 1</Column></Row>
        <Row>
          <Column>
            <Form>
              <Checkbox disabled checked={ckboxCkr('nomQ1', 'q101')} labelText={keys['q101']} />
              <Checkbox disabled checked={ckboxCkr('nomQ1', 'q102')} labelText={keys['q102']} />
              <Checkbox disabled checked={ckboxCkr('nomQ1', 'q103')} labelText={keys['q103']} />
              <Checkbox disabled checked={ckboxCkr('nomQ1', 'q104')} labelText={keys['q104']} />
              <Checkbox disabled checked={ckboxCkr('nomQ1', 'q105')} labelText={keys['q105']} />
            </Form>
          </Column>
          <Column>
            <TextArea name='nomQ1Description' style="color: black" rows={3} value={nomination. nomQ1Description}/>
          </Column>
        </Row>
        <Row style="margin-top: 1em;"><Column style="font-weight: bold;">Question 2</Column></Row>
        <Row>
          <Column>
            <Form>
              <Checkbox disabled checked={ckboxCkr('nomQ2', 'q201')} labelText={keys['q201']} />
              <Checkbox disabled checked={ckboxCkr('nomQ2', 'q202')} labelText={keys['q202']} />
              <Checkbox disabled checked={ckboxCkr('nomQ2', 'q203')} labelText={keys['q203']} />
            </Form>
          </Column>
          <Column>
            <TextArea name='nomQ2Description' style="color: black" rows={3} value={nomination. nomQ2Description} />
          </Column>
        </Row>
        <Row style="margin-top: 1em;"><Column style="font-weight: bold;">Question 3</Column></Row>
        <Row>
          <Column>
            <Form>
              <Checkbox disabled checked={ckboxCkr('nomQ3', 'q301')} labelText={keys['q301']} />
              <Checkbox disabled checked={ckboxCkr('nomQ3', 'q302')} labelText={keys['q302']} />
            </Form>
          </Column>
          <Column>
            <TextArea name='nomQ3Description' type='Q3Desc' style="color: black" rows={3} value={nomination. nomQ3Description} />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextArea hidden name='nomID' type='nomID' style="color: black" rows={3} value={nomination.ID} />
          </Column>
        </Row>
        {#if nomination.nomAdditionalInfo && nomination.nomAdditionalInfo.length > 0}
          <Row style="margin-top: 1em;">
            <Column>Additional Information</Column>
            <Column>
              <TextArea style="color: black" rows={3} value={nomination.nomAdditionalInfo} />
            </Column>
          </Row>
        {/if}
    </Grid>
  </FormGroup>
  <Button
            kind="danger"
            iconDescription="Cancel"
            icon={Cancel}
            on:click|once={handleEdit}>Cancel</Button
          >
          <Button iconDescription="Save" type="submit" icon={Save}>Save</Button>
  </Form>
  {:else}
  <Grid>
    {#if !review}
      <Row>
        <Column>Nominator</Column>
        <Column>{`${nomination.authorFirst} ${nomination.authorLast}`}</Column>
      </Row>
      <Row>
        <Column>Nominator Email</Column>
        <Column>{nomination.authorEmail}</Column>
      </Row>
      <Row>
        <Column>Nomination Date</Column>
        <Column>{nomination.date}</Column>
      </Row>
    {/if}
    <Row style="margin-top: 1em;">
      <Column style="font-weight: bold;">Responses</Column>
    </Row>
    <Row>
      <Column>Contribution Areas</Column>
      <Column>{nomination.category}</Column>
    </Row>
    {#if nomination.subcategoryOther}
    <Row>
      <Column>User-Submitted Area</Column>
      <Column>{nomination.subcategoryOther}</Column>
    </Row>
    {/if}
    {#if nomination.subcategory}
    <Row>
      <Column>Contribution Subcategories</Column>
      <Column>{nomination.subcategory}</Column>
    </Row>
    {/if}
    {#if nomination.nomDeceased == 1}
      <Row>
        <Column>Nominee is alive?</Column>
        <Column>Yes, nominee is alive.</Column>
      </Row>
      <Row>
        <Column>Nominee will be influential?</Column>
        <Column>{nomination.nomAchieved == 0 ? "Yes" : "No"}</Column>
      </Row>
    {:else}
      <Row>
        <Column>Nominee is alive?</Column>
        <Column>No, nominee is deceased.</Column>
      </Row>
      <Row>
        <Column>Nominee has been / is influential?</Column>
        <Column>{nomination.nomAchieved == 0 ? "Yes" : "No"}</Column>
      </Row>
    {/if}
    <Row style="margin-top: 1em;"><Column style="font-weight: bold;">Question 1</Column></Row>
    <Row>
      <Column>
        <Form>
          <Checkbox disabled checked={ckboxCkr('nomQ1', 'q101')} labelText={keys['q101']} />
          <Checkbox disabled checked={ckboxCkr('nomQ1', 'q102')} labelText={keys['q102']} />
          <Checkbox disabled checked={ckboxCkr('nomQ1', 'q103')} labelText={keys['q103']} />
          <Checkbox disabled checked={ckboxCkr('nomQ1', 'q104')} labelText={keys['q104']} />
          <Checkbox disabled checked={ckboxCkr('nomQ1', 'q105')} labelText={keys['q105']} />
        </Form>
      </Column>
      <Column>
        <TextArea style="color: black" rows={3} value={nomination. nomQ1Description} disabled />
      </Column>
    </Row>
    <Row style="margin-top: 1em;"><Column style="font-weight: bold;">Question 2</Column></Row>
    <Row>
      <Column>
        <Form>
          <Checkbox disabled checked={ckboxCkr('nomQ2', 'q201')} labelText={keys['q201']} />
          <Checkbox disabled checked={ckboxCkr('nomQ2', 'q202')} labelText={keys['q202']} />
          <Checkbox disabled checked={ckboxCkr('nomQ2', 'q203')} labelText={keys['q203']} />
        </Form>
      </Column>
      <Column>
        <TextArea style="color: black" rows={3} value={nomination. nomQ2Description} disabled />
      </Column>
    </Row>
    <Row style="margin-top: 1em;"><Column style="font-weight: bold;">Question 3</Column></Row>
    <Row>
      <Column>
        <Form>
          <Checkbox disabled checked={ckboxCkr('nomQ3', 'q301')} labelText={keys['q301']} />
          <Checkbox disabled checked={ckboxCkr('nomQ3', 'q302')} labelText={keys['q302']} />
        </Form>
      </Column>
      <Column>
        <TextArea style="color: black" rows={3} value={nomination. nomQ3Description} disabled />
      </Column>
    </Row>
    {#if nomination.nomAdditionalInfo && nomination.nomAdditionalInfo.length > 0}
      <Row style="margin-top: 1em;">
        <Column>Additional Information</Column>
        <Column>
          <TextArea style="color: black" rows={3} value={nomination.nomAdditionalInfo} disabled />
        </Column>
      </Row>
    {/if}
  {#if !review}
    <div id="edit-button">
      <Button iconDescription="Edit" icon={Edit} on:click|once={handleEdit}
      >Edit</Button>
    </div>
  {/if}
</Grid>
  {/if}
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
