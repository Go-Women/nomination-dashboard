<script lang="ts">
  import {
    Tile,
    SelectItem,
    Select,
    Button,
    Row,
    Column,
    StructuredList,
    StructuredListCell,
    StructuredListRow,
    StructuredListBody,
    TextInput,
    Form,
    FormGroup,
    NumberInput,
    Grid,
    Checkbox,
  } from "carbon-components-svelte";
  import MultiSelect from "svelte-multiselect";
  import Edit from "carbon-icons-svelte/lib/Edit.svelte";
  import Save from "carbon-icons-svelte/lib/Save.svelte";
  import Cancel from "carbon-icons-svelte/lib/Close.svelte";
  export let judge;

  const categories = [
    { value: "c100", label: "Art" },
    { value: "c200", label: "Athletics" },
    { value: "c300", label: "Business" },
    { value: "c400", label: "Education" },
    { value: "c500", label: "Humanities" },
    { value: "c600", label: "Public Service/Government" },
    { value: "c700", label: "STEM" },
    { value: "c800", label: "Other" },
  ];
  const selectedCategories: {
    value: string;
    label: string;
  }[] = [];
  setCategory();

  function setCategory() {
    // console.log(categories);
    Object.entries(categories).forEach((data, value) => {
      if (data[1].label == judge.info.category) {
        let item = { value: data[1].value, label: data[1].label };
        selectedCategories.push(item);
        // console.log(data[1].label)
      }
    });
    return selectedCategories;
  }

  // Form sections
  let firstName = judge.firstName;
  let lastName = judge.lastName;
  let name = firstName + " " + lastName;
  let bio = judge.info.bio || "";
  let conflicts = judge.info.conflicts || "";
  let phoneNumber = judge.info.phoneNumber;
  let pronoun = judge.info.pronouns;
  let email = judge.email;
  // let subcategory = judge.info.subcategory;
  let capacity = judge.info.capacity;
  let previousCheck = judge.info.previousJudge;
  let interested = judge.info.interested;
  let active = judge.active;
  let linkedin = judge.linkedin || "";
  let addInfo = judge.info.additionalInfo || "";

  let pronouns = ["she/her", "he/him", "they/them"];

  const categoryValues = function (categories: string[]): string {
    let vals = "";
    categories.forEach((cat, index) => {
      vals.concat(cat.toString());
    });
    return vals;
  };

  function setPronoun(id: string) {
    pronoun = pronouns[parseInt(id)];
  }

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

  let judgeEdit = false;
  function handleEdit() {
    judgeEdit = !judgeEdit;
  }
</script>

<div class="bx--content--overview">
  <Row><h2>{name}</h2></Row>
  <div class="bx--content--info">
    <Row><h3>Information</h3></Row>
    <Tile>
      {#if judgeEdit === true}
        <Form method="POST">
          <FormGroup>
            <Grid>
              <Row>
                <Checkbox
                  name="previousJudge"
                  bind:checked={previousCheck}
                  value={previousCheck}
                  labelText="Previous Judge"
                />
                <Checkbox
                  name="interested"
                  bind:checked={interested}
                  value={interested}
                  labelText="Interested"
                />
                <Checkbox
                  name="active"
                  bind:checked={active}
                  value={active}
                  labelText="Active"
                />
              </Row>
            </Grid>
          </FormGroup>
          <FormGroup>
            <br /><strong>Pronouns</strong>
            <Select
              name="pronouns"
              bind:value={pronouns[pronoun]}
              selected={pronounID()}
              on:change={(e) => setPronoun(e.target.value)}
            >
              {#each pronouns as noun, index}
                <SelectItem value={index.toString()} text={noun} />
              {/each}
            </Select>

            <br /><strong>Bio</strong>
            <TextInput type="text" name="bio" bind:value={bio} />

            <br /><strong>Phone Number</strong>
            <TextInput type="tel" name="phoneNumber" bind:value={phoneNumber} />

            <br /><strong>Email</strong>
            <TextInput type="email" name="email" bind:value={email} />
          </FormGroup>
          <FormGroup>
            <br /><strong>Categories</strong>
            <Grid>
              <MultiSelect
                name="category"
                options={categories}
                selected={selectedCategories}
                label="label"
                value="value"
              />
            </Grid>
          </FormGroup>
          <FormGroup>
            <br /><strong>Capacity</strong>
            <NumberInput
              min={4}
              name="capacity"
              bind:value={capacity}
              invalidText="Number must be greater than 4."
              label="minimum of 4"
            />
            <br /><strong>Conflicts</strong>
            <TextInput type="text" name="conflicts" bind:value={conflicts} />

            <br /><strong>LinkedIn</strong>
            <TextInput type="test" name="linkedin" bind:value={linkedin} />

            <br /><strong>Additional Information</strong>
            <TextInput type="text" name="additionalInfo" bind:value={addInfo} />
          </FormGroup>
          <Button
            kind="danger"
            iconDescription="Cancel"
            icon={Cancel}
            on:click|once={handleEdit}>Cancel</Button
          >
          <!-- <Button type="submit">Save</Button> -->
          <Button iconDescription="Save" type="submit" icon={Save}>Save</Button>
        </Form>
      {:else}
        <StructuredList flush>
          <StructuredListBody>
            <StructuredListRow>
              <Grid>
                <Row>
                  <Checkbox
                    name="previousJudge"
                    bind:checked={previousCheck}
                    value={previousCheck}
                    labelText="Previous Judge"
                    disabled
                  />
                  <Checkbox
                    name="interested"
                    bind:checked={interested}
                    value={interested}
                    labelText="Interested"
                    disabled
                  />
                  <Checkbox
                    name="active"
                    bind:checked={active}
                    value={active}
                    labelText="Active"
                    disabled
                  />
                </Row>
              </Grid>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap
                ><strong>Pronouns</strong></StructuredListCell
              >
              <StructuredListCell>{pronoun}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap
                ><strong>Phone Number</strong></StructuredListCell
              >
              <StructuredListCell>{phoneNumber}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap
                ><strong>Bio</strong></StructuredListCell
              >
              <StructuredListCell>{bio}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap
                ><strong>Email</strong></StructuredListCell
              >
              <StructuredListCell>{email}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap
                ><strong>Category</strong></StructuredListCell
              >
              <MultiSelect
                name="category"
                options={categories}
                selected={selectedCategories}
                label="label"
                value="value"
                disabled
              />
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap
                ><strong>Capacity</strong></StructuredListCell
              >
              <StructuredListCell>{capacity}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap
                ><strong>Conflicts</strong></StructuredListCell
              >
              <StructuredListCell>{conflicts}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap
                ><strong>LinkedIn</strong></StructuredListCell
              >
              <StructuredListCell>{linkedin}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap
                ><strong>Additional Information</strong></StructuredListCell
              >
              <StructuredListCell>{addInfo}</StructuredListCell>
            </StructuredListRow>
            <div id="edit-button">
              <Button iconDescription="Edit" icon={Edit} on:click|once={handleEdit}
              >Edit</Button
            >
            </div>
          </StructuredListBody>
        </StructuredList>
      {/if}
    </Tile>
  </div>
</div>

<style>
  #edit-button {
    padding-top: 1rem;
  }
</style>