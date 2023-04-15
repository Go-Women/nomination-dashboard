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
    Grid,
    Checkbox,
  } from "carbon-components-svelte";
  import MultiSelect from "svelte-multiselect";
  import Edit from "carbon-icons-svelte/lib/Edit.svelte";
  import Save from "carbon-icons-svelte/lib/Save.svelte";
  import Cancel from "carbon-icons-svelte/lib/Close.svelte";
  export let judge: any;

  const categories = [
    { value: "c100", label: "Art" },
    { value: "c200", label: "Athletics" },
    { value: "c300", label: "Business" },
    { value: "c400", label: "Education" },
    { value: "c500", label: "Humanities" },
    { value: "c600", label: "Public Service / Government" },
    { value: "c700", label: "STEM" },
    { value: "c800", label: "Other" },
  ];


  const subcategories = [
    { value: "s100", label: "General" },
    { value: "s101", label: "Architecture" },
    { value: "s102", label: "Art History" },
    { value: "s103", label: "Cinema" },
    { value: "s104", label: "Design" },
    { value: "s105", label: "Literature" },
    { value: "s106", label: "Music" },
    { value: "s107", label: "Painting / Drawing" },
    { value: "s108", label: "Sculpting" },
    { value: "s109", label: "Theater / Dance" },

    { value: "s201", label: "Competition Sports" },
    { value: "s202", label: "Individual Sports" },
    { value: "s203", label: "Team Sports" },
    { value: "s204", label: "Sports / Team Management" },

    { value: "s301", label: "CEO / Corporate Leadership" },
    { value: "s302", label: "Entrepreneurship" },
    { value: "s303", label: "Inventing / Patent Holding" },

    { value: "s401", label: "Early Education" },
    { value: "s402", label: "Higher Education" },
    { value: "s403", label: "Research" },

    { value: "s501", label: "Ancient / Modern Languages" },
    { value: "s502", label: "Literature" },
    { value: "s503", label: "Philosophy / Religion" },
    { value: "s504", label: "Social Reformation" },

    { value: "s601", label: "Activism" },
    { value: "s602", label: "Legal / Judicial" },
    { value: "s603", label: "Military" },
    { value: "s604", label: "Politics" },

    { value: "s701", label: "Astronomy" },
    { value: "s702", label: "Architecture" },
    { value: "s703", label: "Biology" },
    { value: "s704", label: "Chemistry" },
    { value: "s705", label: "Climate / Earth Sciences" },
    { value: "s706", label: "Computer Science" },
    { value: "s707", label: "Mathematics" },
    { value: "s708", label: "Medicine" },
    { value: "s709", label: "Engineering" },
    { value: "s710", label: "Physics" },
    { value: "s711", label: "Technology" },
  ];

  const selectedCategories: {
    value: string;
    label: string;
  }[] = [];
  setCategory();

  const selectedSubcategories: {
    value: string;
    label: string;
  }[] = [];
  setSubcategory();
  
  function setCategory() {
    let cat = judge.info.category;
    if (cat.includes(",")) {
        Object.entries(categories).forEach((data, value) => {
          let items = data[1];
          let split = cat.split(',');
          for (const i in split) {
              if (items.label == split[i]) {
                let item = { value: items.value, label: items.label };
                selectedCategories.push(item);
              }    
          }
          return selectedCategories;   
        });
    } else {
        Object.entries(categories).forEach((data, value) => {
          if (data[1].label == judge.info.category) {
            let item = { value: data[1].value, label: data[1].label };
            selectedCategories.push(item);
          }
        });
    }
    return selectedCategories;
  };

  function setSubcategory() {
    let cat = judge.info.subcategory;
    if (cat.length > 4) {
        Object.entries(subcategories).forEach((data, value) => {
          let items = data[1];
          let split = cat.split(',');
          for (const i in split) {
              if (items.label == split[i]) {
                let item = { value: items.value, label: items.label };
                selectedSubcategories.push(item);
              }    
          }
          return selectedSubcategories;   
        });
    } else {
        Object.entries(subcategories).forEach((data, value) => {
          if (data[1].label == judge.info.subcategory) {
            let item = { value: data[1].value, label: data[1].label };
            selectedSubcategories.push(item);
          }
        });
    }
    return selectedSubcategories;
  };

  // Form sections
  let name = judge.fullName;
  let bio = judge.info.bio || "";
  let conflicts = judge.info.conflicts || "";
  let phoneNumber = judge.info.phoneNumber;
  let pronoun = judge.info.pronouns;
  let email = judge.email;
  let capacity = judge.info.matchesAssigned + "/" + judge.info.capacity;
  let previousJudge = (judge.info.previousJudge == true || judge.info.previousJudge == "1");
  let deadline = (judge.info.deadline == true || judge.info.deadline == "1");
  let active = (judge.active == true || judge.info.active == "1");
  let linkedin = judge.info.linkedin || "";
  let addInfo = judge.info.addInfo || "";

  let pronouns = ["She/Her", "He/Him", "They/Them", "Other"];

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

  const pronounID = function (): string {
    let pn = "Other";
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
                  bind:checked={previousJudge}
                  value={previousJudge}
                  labelText="Previous Judge"
                />
                <Checkbox
                  name="deadline"
                  bind:checked={deadline}
                  value={deadline}
                  labelText="Can Meet Deadline?"
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
            <Grid style="padding-top: 1rem">
              <MultiSelect
                name="category"
                options={categories}
                selected={selectedCategories}
                label="label"
                value="value"
              />
            </Grid>

            <br /><strong>Subcategories</strong>
            <Grid style="padding-top: 1rem">
              <MultiSelect
                name="subcategory"
                options={subcategories}
                selected={selectedSubcategories}
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
                    bind:checked={previousJudge}
                    value={previousJudge}
                    labelText="Previous Judge"
                    disabled
                  />
                  <Checkbox
                    name="deadline"
                    bind:checked={deadline}
                    value={deadline}
                    labelText="Can Meet Deadline?"
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
                ><strong>Subcategory</strong></StructuredListCell
              >
              <MultiSelect
                name="subcategory"
                options={subcategories}
                selected={selectedSubcategories}
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