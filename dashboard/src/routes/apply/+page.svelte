<script lang="ts">
  import {
      Button, Checkbox, ComboBox, Dropdown, Form,
      FormGroup, InlineNotification, NumberInput, PasswordInput, RadioButton, RadioButtonGroup, Select, SelectItem, SideNavItems, Slider, TextArea, TextInput
  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import Login from "carbon-icons-svelte/lib/Login.svelte";
  import "../../css/index.css";
  import { browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, updateProfile, type UserCredential } from "firebase/auth";
  import { auth } from "$lib/firebase/clientApp";

  let firstName = '';
  let lastName = '';
  let email = '';
  let password = '';
  let firebaseID = '';

  let cohort = 2025;
  let age = 53;
  let inductees = 302;

  // Form sections
  let sec_art = false;
  let sec_athletics = false;
  let sec_business = false;
  let sec_edu = false;
  let sec_humanities = false;
  let sec_gov = false;
  let sec_stem = false;

  let contribs: string[] = [];
  let contribsSub: string[] = [];
  
  let pronoun = "She/Her";
  let pronouns = ["She/Her", "He/Him", "They/Them", "Other"];

  let data: { authError: { code: string; message: string } | null } = {
    authError: null,
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


  export let form;

  const register = async () => {
    setPersistence(auth, browserLocalPersistence);
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then(async (userCredential: UserCredential) => {
      password = '';
      firebaseID = userCredential.user.uid;
      await updateProfile(
        userCredential.user,
        { displayName: `${firstName} ${lastName}` }
      ).then(() => {
        (document.getElementById('registerForm') as HTMLFormElement).submit();
      });
    }).catch((error) => {
      data.authError = {
        code: error.code,
        message: error.message
      };
    });
  }
</script>

<main>
  <div id="header-box">
    <h1>National Women's Hall of Fame Judge Application</h1>
  </div>

  <div id="form-container">
    <form method="POST" id="registerForm">
      <div id="form-blurb">
        <p>
          <strong>
            Thank you for your interest in becoming a judge for the National Women's Hall of Fame!
          </strong>
          Over the past {age} years, the National Women's Hall of Fame has inducted {inductees} incredible American women
          whose contributions are enduring and of national or global impact.
          We rely on nominations from the public and a National Panel of Judges to select our Inductees.
          Thank you for considering participating in this important process.
        </p>
        <p>
          The National Women's Hall of Fame is committed to reducing opportunities for bias within
          the nominations review process and ask judges to review nominations with this commitment in mind.
        </p>
        <p>
          <strong>Please note: judges whose expertise aligns with our nomination pool will be contacted
          in April to begin the judging process.
          <br />All nominations for the {cohort} Induction class will be judged between May 1 and June 15, {cohort-1}.</strong>
        </p>
        <hr />
        {#if form?.success} 
          <InlineNotification
            lowContrast
            kind="success"
            title="Success:"
            subtitle="Your application has been submitted successfully."
          />
        {/if}
      </div>
      <h3>About You</h3>
      <FormGroup>
        <TextInput name="firstName" labelText="First Name" bind:value={firstName} required />
        <TextInput name="lastName" labelText="Last Name" bind:value={lastName} required />
        <TextInput name="email" type="email" labelText="Your Email" bind:value={email} placeholder="example@example.com" required />
        <TextInput name="phoneNumber" type="tel" labelText="Your Phone Number" placeholder="(555) - 555 - 5555" required />
        <PasswordInput name="password" labelText="Please set a password for your account." bind:value={password} placeholder="Password" required />
        {#if data.authError}
          <InlineNotification
            title={data.authError.code}      
          />
        {/if}
        <input type="hidden" name="firebaseID" bind:value={firebaseID} />
        <br />
        <Select
          labelText="Pronouns"
          name="pronouns"
          bind:value={pronouns[pronoun]}
          selected={pronounID()}
          on:change={(e) => setPronoun(e.target.value)}
        >
          {#each pronouns as noun, index}
            <SelectItem value={index.toString()} text={noun} />
          {/each}
        </Select>
      </FormGroup>
      <FormGroup>
        <h4>Have you been a Nomination judge before?</h4>
        <RadioButtonGroup>
          <RadioButton name="previousJudge" value=1 labelText="Yes" required />
          <RadioButton name="previousJudge" value=0 labelText="No" />
        </RadioButtonGroup>
      </FormGroup>
      <FormGroup>
        <h4>The deadline for reviewing nominations will be June 15, {cohort - 1}</h4>
        <RadioButtonGroup>
          <RadioButton name="deadline" value=1 labelText="I am comfortable with this deadline." required />
          <RadioButton name="deadline" value=0 labelText="I am not comfortable with this deadline." />
        </RadioButtonGroup>
      </FormGroup>
      <FormGroup>
        <h4>How many nominations would you be comfortable reviewing?</h4>
        <p>Previous judges have reported spending 20-60 minutes reviewing each nomination.</p>
        <Slider
          name="capacity"
          min={1}
          max={20}
          value={5}
        />
      </FormGroup>
      <TextArea name="potentialJudges" labelText="Please provide names and email addresses for other individuals you know who should be considered for the Panel of Judges. (Optional)" placeholder="Type here..." />
      <hr />
      <!-- TODO: make questions be values from database that way when they update database the form would also update the questions? -->
      <h4>I have the expertise/experience needed to be considered as a judge for the following areas:</h4>
      <FormGroup>
        <Checkbox name="category" bind:group={contribs} value="c100" labelText="Art" bind:checked={sec_art} />
        <Checkbox name="category" bind:group={contribs} value="c200" labelText="Athletics" bind:checked={sec_athletics} />
        <Checkbox name="category" bind:group={contribs} value="c300" labelText="Business" bind:checked={sec_business} />
        <Checkbox name="category" bind:group={contribs} value="c400" labelText="Education" bind:checked={sec_edu} />
        <Checkbox name="category" bind:group={contribs} value="c500" labelText="Humanities" bind:checked={sec_humanities} />
        <Checkbox name="category" bind:group={contribs} value="c600" labelText="Public Service / Government" bind:checked={sec_gov} />
        <Checkbox name="category" bind:group={contribs} value="c700" labelText="STEM" bind:checked={sec_stem} />
        <input type="hidden" name="category" bind:value={contribs}>
      </FormGroup>
      {#if sec_art}
        <FormGroup legendText="I have expertise/experience that allows me to effectively and fairly evaluate the national scope and impact of contributions made within the following sub-categories: Art">
          <Checkbox name="subcategory" bind:group={contribsSub} value="s101" labelText="Architecture" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s102" labelText="Art History" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s103" labelText="Cinema" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s104" labelText="Design" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s105" labelText="Literature" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s106" labelText="Music" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s107" labelText="Painting / Drawing" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s108" labelText="Sculpting" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s109" labelText="Theater / Dance" />
        </FormGroup>
      {/if}
      {#if sec_athletics}
        <FormGroup legendText="I have expertise/experience that allows me to effectively and fairly evaluate the national scope and impact of contributions made within the following sub-categories: Athletics">
          <Checkbox name="subcategory" bind:group={contribsSub} value="s201" labelText="Competition Sports" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s202" labelText="Individual Sports" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s203" labelText="Team Sports" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s204" labelText="Sports / Team Management" />
        </FormGroup>
      {/if}
      {#if sec_business}
        <FormGroup legendText="I have expertise/experience that allows me to effectively and fairly evaluate the national scope and impact of contributions made within the following sub-categories: Business">
          <Checkbox name="subcategory" bind:group={contribsSub} value="s301" labelText="CEO / Corporate Leadership" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s302" labelText="Entrepreneurship" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s303" labelText="Inventing / Patent Holding" />
        </FormGroup>
      {/if}
      {#if sec_edu}
        <FormGroup legendText="I have expertise/experience that allows me to effectively and fairly evaluate the national scope and impact of contributions made within the following sub-categories: Education">
          <Checkbox name="subcategory" bind:group={contribsSub} value="s401" labelText="Early Education" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s402" labelText="Higher Education" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s403" labelText="Research" />
        </FormGroup>
      {/if}
      {#if sec_humanities}
        <FormGroup legendText="I have expertise/experience that allows me to effectively and fairly evaluate the national scope and impact of contributions made within the following sub-categories: Humanities">
          <Checkbox name="subcategory" bind:group={contribsSub} value="s501" labelText="Ancient / Modern Languages" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s502" labelText="Literature" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s503" labelText="Philosophy / Religion" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s504" labelText="Social Reformation" />
        </FormGroup>
      {/if}
      {#if sec_gov}
        <FormGroup legendText="I have expertise/experience that allows me to effectively and fairly evaluate the national scope and impact of contributions made within the following sub-categories: Public Service / Government">
          <Checkbox name="subcategory" bind:group={contribsSub} value="s601" labelText="Activism" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s602" labelText="Legal / Judicial" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s603" labelText="Military" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s604" labelText="Politics" />
        </FormGroup>
      {/if}
      {#if sec_stem}
        <FormGroup legendText="I have expertise/experience that allows me to effectively and fairly evaluate the national scope and impact of contributions made within the following sub-categories: STEM">
          <Checkbox name="subcategory" bind:group={contribsSub} value="s701" labelText="Astronomy" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s702" labelText="Architecture" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s703" labelText="Biology" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s704" labelText="Chemestry" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s705" labelText="Climate / Earch Science" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s706" labelText="Computer Science" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s707" labelText="Mathematics" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s708" labelText="Medicine" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s709" labelText="Engineering" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s710" labelText="Physics" />
          <Checkbox name="subcategory" bind:group={contribsSub} value="s711" labelText="Technology" />
        </FormGroup>
      {/if}
      <input type="hidden" name="subcategory" bind:value={contribsSub}>
      <hr />
      <h4>All prospective judges are asked to please provide one or both of the following:</h4>
      <TextInput name="linkedin" type="url" labelText="Link to your LinkedIn profile, or another online resource that provides information about your background" placeholder="https://linkedin.com/in/example" />
      <TextArea name="bio" labelText="Your bio or a short description of your areas of expertise" placeholder="Type here..." />
      <hr />
      <h4>Additional Information</h4>
      <p>
        If the National Women's Hall of Fame should be aware of any conflicts of interest
        you may have in judging certain nominees or categories of nominees, please note them here.
      </p>
      <TextArea name="conflicts" labelText="Conflicts (optional)" placeholder="Type here..." />
      <TextArea name="additionalInfo" labelText="Is there anything else you'd like to share with Hall staff? (optional)" placeholder="Type here..." />
      <div id="submit-button">
        <Button type="submit" on:click={(e) => { e.preventDefault(); register(); }}>Submit</Button>
      </div>
      {#if data.authError}
        <InlineNotification
          title={data.authError.code}      
        />
      {/if}
    </form>
  </div>

  <div id="col-3">
    <div id="login-button">
      <Button kind="tertiary" size="small" icon={Login} href="/login">Portal Login</Button>
    </div>
  </div>

</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 50% 1fr;
    grid-template-rows: 1 1fr;
    justify-items: center;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  p {
    margin-bottom: 0.5em;
  }

  #header-box {
    grid-column: 2;
    grid-row: 1;
    text-align: justify;
  }

  #form-container {
    grid-column: 2;
    grid-row: 2;
    padding: 1em;
    outline: 0.125em solid darkgray;
    border-radius: 0.5em;
  }

  #form-blurb {
    text-align: justify;
  }

  #submit-button {
    margin-top: 1em;
  }

  #col-3 {
    grid-column: 3;
    align-content: right;
    width: 100%;
  }

  #login-button {
    position: absolute;
    right: 1em;
    top: 1em;
  }

  @media(max-width: 75em) {
    main {
      grid-template-columns: 1fr;
      margin: 1em;
    }
  }
</style>
