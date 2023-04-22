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
    TextArea,
  } from "carbon-components-svelte";
  import Edit from "carbon-icons-svelte/lib/Edit.svelte";
  import Save from "carbon-icons-svelte/lib/Save.svelte";
  import Cancel from "carbon-icons-svelte/lib/Close.svelte";
  // import { browserLocalPersistence, updateEmail, setPersistence, updateProfile, type UserCredential } from "firebase/auth";
  // import { auth } from "$lib/firebase/clientApp";
  export let judge: any;
  
  var user = 'admin'; // TODO: replace this when auth is implemented

  let name = `${judge.firstName} ${judge.lastName}`;
  let firstName = `${judge.firstName}`; // only judges can edit this
  let lastName = `${judge.lastName}`; // only judges can edit this
  let email = `${judge.email}`;
  let active = (judge.active == true || judge.info.active == "1");
  let bio = (`${judge.info.bio}` != "null") ? `${judge.info.bio}` : "";
  let capacity = judge.info.capacity;
  let matchesAssigned = judge.info.matchesAssigned; // only admins see this
  let conflicts = (`${judge.info.conflicts}` != "null") ? `${judge.info.conflicts}`: "";
  let phoneNumber = `${judge.info.phoneNumber}`;
  let previousJudge = (`${judge.info.previousJudge}` == 'true' || `${judge.info.previousJudge}` == '1');  // only admins can edit this
  let pronoun = `${judge.info.pronouns}`;
  let category = `${judge.info.category}`;  // can't edit this at the moment
  let subcategory = `${judge.info.subcategory}`;  // can't edit this at the moment
  let deadline = (judge.info.deadline == true || judge.info.deadline == "1");
  let linkedin = (`${judge.info.linkedin}` != "null") ? judge.info.linkedin: "";
  let addInfo = (`${judge.info.additionalInfo}` != "null") ? judge.info.additionalInfo : "";
  let judgeRecs = (`${judge.info.potentialJudges}` != "null") ? judge.info.potentialJudges : "";
  let pronouns = ["She/Her", "He/Him", "They/Them", "Other"];
  let judgeStatus = `${judge.info.judgeStatus}`;

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

  // const update = async () => {
  //   setPersistence(auth, browserLocalPersistence);
  //   await updateEmail(
  //     auth.currentUser,
  //     `${email}`
  //   ).then(async (userCredential: UserCredential) => {
  //     password = '';
  //     firebaseID = userCredential.user.uid;
  //     await updateProfile(
  //       userCredential.user,
  //       { displayName: `${firstName} ${lastName}` }
  //     ).then(() => {
  //       (document.getElementById('registerForm') as HTMLFormElement).submit();
  //     });
  //   }).catch((error) => {
  //     data.authError = {
  //       code: error.code,
  //       message: error.message
  //     };
  //   });
  // }
</script>

<div class="bx--content--overview">
  <Row><h2>{name}</h2></Row>
  <div class="bx--content--info">
    <Row><h3>Information</h3></Row>
    <Tile>
      {#if judgeEdit === true}
        <StructuredListRow>
          <StructuredListCell 
            ><strong><h4>Categories</h4></strong></StructuredListCell
          >
          <StructuredListCell>{category}</StructuredListCell>
          <StructuredListCell 
            ><strong><h4>Subcategories</h4></strong></StructuredListCell
          >
          <StructuredListCell>{subcategory}</StructuredListCell>
        </StructuredListRow>
        <Form method="POST" action="?/edit">
          <input type="hidden" name="category" value={category} />
          <input type="hidden" name="subcategory" value={subcategory} />
          <input type="hidden" name="judgeStatus" value={judgeStatus} />
          <FormGroup>
            {#if user === 'judge'}
              <br /><strong>First Name</strong>
              <TextInput type="text" name="firstName" bind:value={firstName} />
              <br /><strong>Last Name</strong>
              <TextInput type="text" name="lastName" bind:value={lastName} />
              <br /><strong>Email</strong>
              <TextInput type="email" name="email" bind:value={email} />
            {:else if user === 'admin'}
              <input type="hidden" name="firstName" value={firstName} />
              <input type="hidden" name="lastName" value={lastName} />
              <input type="hidden" name="email" value={email} />
            {/if}
          </FormGroup>
          <FormGroup>
            {#if user === 'admin'}
              <Grid>
                <Row>
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
                  <Checkbox
                      name="previousJudge"
                      bind:checked={previousJudge}
                      value={previousJudge}
                      labelText="Previous Judge"
                    /> 
                </Row>
              </Grid>
            {:else if user === 'judge'}
              <input type="hidden" name="deadline" value={deadline} />
              <input type="hidden" name="active" value={active} />
              <input type="hidden" name="previousJudge" value={previousJudge} />
            {/if}
          </FormGroup>
          <FormGroup>
            <strong>Pronouns</strong>
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
            <TextArea type="text" name="bio" bind:value={bio} />

            <br /><strong>Phone Number</strong>
            <TextInput type="tel" name="phoneNumber" bind:value={phoneNumber} />
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
            <input type="hidden" name="matchesAssigned" value={matchesAssigned}/>

            <br /><strong>Conflicts</strong>
            <TextArea type="text" name="conflicts" bind:value={conflicts} />

            <br /><strong>LinkedIn</strong>
            <TextInput type="url" name="linkedin" bind:value={linkedin} />

            <br /><strong>Additional Information</strong>
            <TextArea type="text" name="additionalInfo" bind:value={addInfo} />
            <br /><strong>Recommendations</strong>
            <TextArea type="text" name="potentialJudges" bind:value={judgeRecs} />
          </FormGroup>
          <Button
            kind="danger"
            iconDescription="Cancel"
            icon={Cancel}
            on:click|once={handleEdit}>Cancel</Button
          >
          {#if user === 'admin'}
            <Button iconDescription="Save" type="submit" icon={Save}>Save</Button>
          {:else if user === 'judge'}
            <!-- TODO: implement this with auth -->
            <Button iconDescription="Save" type="submit" icon={Save}>Save</Button>
            <!-- <Button iconDescription="Save" type="submit" icon={Save} on:click={(e) => { e.preventDefault(); update(); }}>Save</Button> -->
          {/if}
        </Form>
      {:else}
        <StructuredListRow>
          <StructuredListCell 
            ><strong><h4>Category</h4></strong></StructuredListCell
          >
          <StructuredListCell>{category}</StructuredListCell>
          <StructuredListCell 
            ><strong><h4>Subcategory</h4></strong></StructuredListCell
          >
          <StructuredListCell>{subcategory}</StructuredListCell>
        </StructuredListRow>
        <StructuredList flush>
          <StructuredListBody>
            <StructuredListRow>
              {#if user === 'admin'}
                <Grid>
                  <Row>
                    <Checkbox
                      name="deadline"
                      bind:checked={deadline}
                      value={deadline}
                      labelText="Can Meet Review Deadline?"
                      disabled
                    />
                    <Checkbox
                      name="active"
                      bind:checked={active}
                      value={active}
                      labelText="Active"
                      disabled
                    /> 
                    <Checkbox
                      name="previousJudge"
                      bind:checked={previousJudge}
                      value={previousJudge}
                      labelText="Previous Judge"
                      disabled
                    />                                   
                  </Row>
                </Grid>
              {/if} 
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell 
                ><strong>Email</strong></StructuredListCell
              >
              <StructuredListCell>{email}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell
                ><strong>Pronouns</strong></StructuredListCell
              >
              <StructuredListCell>{pronoun}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell 
                ><strong>Phone Number</strong></StructuredListCell
              >
              <StructuredListCell>{phoneNumber}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell 
                ><strong>Bio</strong></StructuredListCell
              >
              <StructuredListCell>{bio}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell 
                ><strong>Capacity</strong></StructuredListCell
              >
              {#if user === 'admin'}
                <StructuredListCell>{matchesAssigned + '/' + capacity}</StructuredListCell>
              {:else if user === 'judge'}
                <StructuredListCell>{capacity}</StructuredListCell>
              {/if}
              </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell 
                ><strong>Conflicts</strong></StructuredListCell
              >
              <StructuredListCell>{conflicts}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell 
                ><strong>LinkedIn</strong></StructuredListCell
              >
              <StructuredListCell><a href={linkedin} target="_blank">{linkedin}</a></StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell 
                ><strong>Additional Information</strong></StructuredListCell
              >
              <StructuredListCell>{addInfo}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell 
                ><strong>Recommendations</strong></StructuredListCell
              >
              <StructuredListCell>{judgeRecs}</StructuredListCell>
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