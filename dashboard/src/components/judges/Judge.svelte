<script lang="ts">
  import {
    Tile,
    SelectItem,
    Select,
    Button,
    Row,
    StructuredList,
    StructuredListCell,
    StructuredListRow,
    StructuredListBody,
    TextInput,
    Form,
    FormGroup,
    NumberInput,
    Toggle,
    Grid,
    Content,
  } from "carbon-components-svelte";
  import Edit from "carbon-icons-svelte/lib/Edit.svelte";
  import Save from "carbon-icons-svelte/lib/Save.svelte";
  import Cancel from "carbon-icons-svelte/lib/Close.svelte";
  export let judge;

  let categories = [
    "Art",
    "Athletics",
    "Business",
    "Education",
    "Humanities",
    "Public Service/Government",
    "STEM",
    "Other",
  ];

  const skill = judge.category;
  // TODO: can be replaced later on with backend api call
  const categoryID = function (): string {
    let category = "0";
    categories.forEach((cat, index) => {
      if (cat.toString().includes(skill)) {
        category = index.toString();
      }
    });
    return category;
  };

  let pronouns = ["she/her", "he/him", "they/them"];
  const pronoun = judge.pronouns;
  
  // TODO: can be replaced later on with backend api call
  const pronounID = function (): string {
    let pn = "other";
    pronouns.forEach((noun, index) => {
      if (noun.toString().includes(pronoun)) {
        pn = index.toString();
      }
    });
    return pn;
  };

  // TODO: create this for subcategory

  let previousCheck = judge["previous-judge"];
  let active = judge.interested;

  let judgeEdit = false;
  function handleEdit() {
    judgeEdit = !judgeEdit;
  }

  // TODO: create handle save action
</script>

<div class="bx--content--overview">
  <Row><h2>{judge["first-name"]} {judge["last-name"]}</h2></Row>
  <div>
  <Row class="bx--content--info"><h3>Information</h3></Row>
  <Tile>
    {#if judgeEdit === true}
      <StructuredList flush>
        <Form on:submit>
          <FormGroup>
            <br /><strong>Pronouns</strong>
            <Select
              id="select-pronouns"
              value="pronouns"
              selected={pronounID()}
              on:change={(e) => console.log("value", e.target.value)}
            >
              {#each pronouns as noun, index}
                <SelectItem value={index.toString()} text={noun} />
              {/each}
            </Select>
            <br /><strong>Email</strong>
            
            <TextInput type="email" value={judge.email} />
            
            <br /><strong>Category</strong>
            <Select
              id="select-judge-category"
              value="categories"
              selected={categoryID()}
              on:change={(e) => console.log("value", e.target.value)}
            >
              {#each categories as category, index}
                <SelectItem value={index.toString()} text={category} />
              {/each}
            </Select>
           
            <br /><strong>Capacity</strong>
            <NumberInput
              min={4}
              value={judge.capacity}
              invalidText="Number must be greater than 4."
              label="minimum of 4"
            />
            <Grid>
              <Row>
                <Toggle
                  toggled={previousCheck}
                  on:toggle={(e) => (previousCheck = e.detail.toggled)}
                >
                  <span slot="labelA" style="color: red">Not a Previous Judge</span>
                  <span slot="labelB" style="color: green">Previous Judge</span>
                </Toggle>
                <Toggle
                  toggled={active}
                  on:toggle={(e) => (active = e.detail.toggled)}
                >
                  <span slot="labelA" style="color: red">Not Active</span>
                  <span slot="labelB" style="color: green">Active</span>
                </Toggle>
              </Row>
            </Grid>
          </FormGroup>
          <Button
            kind="danger"
            iconDescription="Cancel"
            icon={Cancel}
            on:click|once={handleEdit}>Cancel</Button>
          <Button
            iconDescription="Save"
            type="submit"
            icon={Save}
            on:click|once={handleEdit}>Save</Button>
        </Form>
      </StructuredList>
    {:else}
      <StructuredList flush>
        <StructuredListBody>
          <StructuredListRow>
            <StructuredListCell noWrap><strong>Pronouns</strong></StructuredListCell>
            <StructuredListCell>{judge.pronouns}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap><strong>Email</strong></StructuredListCell>
            <StructuredListCell>{judge.email}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap><strong>Category</strong></StructuredListCell>
            <StructuredListCell>{judge.category}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap><strong>Capacity</strong></StructuredListCell>
            <StructuredListCell>{judge.capacity}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap><strong>Email</strong></StructuredListCell>
            <StructuredListCell>{judge.email}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell>
              <Toggle bind:toggled={previousCheck} disabled>
                <span slot="labelA" style="color: red">Not a Previous Judge</span>
                <span slot="labelB" style="color: green">Previous Judge</span>
              </Toggle>
            </StructuredListCell>
            <StructuredListCell>
              <Toggle bind:toggled={active} disabled>
                <span slot="labelA" style="color: red">Not Active</span>
                <span slot="labelB" style="color: green">Active</span>
              </Toggle>
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredList>
      <Button iconDescription="Edit" icon={Edit} on:click|once={handleEdit}>Edit</Button>
    {/if}
  </Tile>
</div>
</div>
