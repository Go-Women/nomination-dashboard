<script lang="ts">
  import {
    Tile,
    Toolbar,
    ToolbarContent,
    SelectItem,
    Select,
    Button,
    Row,
    StructuredList,
    StructuredListCell,
    StructuredListRow,
    StructuredListBody,
    StructuredListHead,
    TextInput,
    PasswordInput,
    Form,
    FormGroup,
    NumberInput,
    Toggle,
  } from "carbon-components-svelte";
  import Edit from "carbon-icons-svelte/lib/Edit.svelte";
  import Save from "carbon-icons-svelte/lib/Save.svelte";
  import Cancel from "carbon-icons-svelte/lib/Close.svelte";
  import { dataset_dev } from "svelte/internal";
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

  const skill = judge.data.skill;
  const categoryID = function (): string {
    let category = "0";
    categories.forEach((cat, index) => {
      if (cat.toString().includes(skill)) {
        category = index.toString();
      }
    });
    return category;
  };

  let toggled = judge.active;

  let judgeEdit = false;
  function handleEdit() {
    judgeEdit = !judgeEdit;
  }

  // TODO: create handle save action
</script>

<main class="bx--content-main">
  <Row><h2>{judge.firstName} {judge.lastName}</h2></Row>
  <Row><h3>Information</h3></Row>
  <Tile>
    {#if judgeEdit === true}
      <StructuredList flush>
        <Form on:submit>
          <FormGroup>
            <Select
              id="select-judge-category"
              labelText="Category"
              value="categories"
              selected={categoryID()}
              on:change={(e) => console.log("value", e.target.value)}
            >
              {#each categories as category, index}
                <SelectItem value={index.toString()} text={category} />
              {/each}
            </Select>
            <NumberInput
              min={1}
              value={judge.data.weight}
              invalidText="Number must be greater than 0."
              helperText="Select the maximum number of Nominees for this judge."
              label="Judge Capacity (1 min)"
            />
            <TextInput labelText="email" value={judge.email} />
            <Toggle bind:toggled>
              <span slot="labelA" style="color: red">Not Active</span>
              <span slot="labelB" style="color: green">Active</span>
            </Toggle>
          </FormGroup>
          <Button
            kind="danger"
            iconDescription="Cancel"
            icon={Cancel}
            on:click|once={handleEdit}>Cancel</Button
          >
          <Button
            iconDescription="Save"
            type="submit"
            icon={Save}
            on:click|once={handleEdit}>Save</Button
          >
        </Form>
      </StructuredList>
    {:else}
      <StructuredList flush>
        <StructuredListBody>
          <StructuredListRow>
            <StructuredListCell noWrap>Skill</StructuredListCell>
            <StructuredListCell>{judge.data.skill}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Capacity</StructuredListCell>
            <StructuredListCell>{judge.data.weight}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Email</StructuredListCell>
            <StructuredListCell>{judge.email}</StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <Toggle bind:toggled disabled>
              <span slot="labelA" style="color: red">Not Active</span>
              <span slot="labelB" style="color: green">Active</span>
            </Toggle>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredList>
      <Button iconDescription="Edit" icon={Edit} on:click|once={handleEdit}
        >Edit</Button
      >
    {/if}
  </Tile>
</main>
