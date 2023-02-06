<script lang="ts">
  import {
      Button, Checkbox, Form,
      FormGroup, NumberInput, RadioButton, RadioButtonGroup, TextArea, TextInput
  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import Login from "carbon-icons-svelte/lib/Login.svelte";
  import "../../css/index.css";

  // let theme = "g90";

  let cohort = "2025";
  let deadline = "2023/12/31";

  // Form sections
  let sec_art = false;
  let sec_athletics = false;
  let sec_business = false;
  let sec_edu = false;
  let sec_humanities = false;
  let sec_gov = false;
  let sec_stem = false;
  let sec_other = false;
  let sec_deceased = false;
  let sec_alive = false;

  let contribs: string[] = [];
  let contribsSub: string[] = [];
  let q1ck: string[] = [];
  let q2ck: string[] = [];
  let q3ck: string[] = [];
</script>

<main>
  <!-- <Theme bind:theme persist persistKey="__carbon-theme" />

  <RadioButtonGroup legendText="Color Theme" bind:selected={theme}>
    <RadioButton labelText="White" value="white" />
    <RadioButton labelText="Dark" value="g90" />
  </RadioButtonGroup> -->

  <div id="header-box">
    <h1>Nominate a Woman</h1>
    <p>
      <strong>
        Thank you for your interest in nominating a great American woman to be considered for induction
        into the National Women's Hall of Fame!
      </strong>
      We are currently collecting nominations in anticipation of an Induction Ceremony in {cohort}.
      Nominations submitted on or before {deadline} will be considered for Induction {cohort}. 
    </p>
    <p>
      Below is additional information about our eligibility and judging process. If you have any questions
      about nominations, please email us at <a href="mailto:admin@womenofthehall.org">admin@womenofthehall.org</a>.
    </p>
    <p><em>All submitted materials become property of the National Women's Hall of Fame.</em></p>
  </div>

  <div id="form-container">
    <Form method="POST">
      <div id="form-blurb">
        <h2>General Criteria</h2>
        <p>
          Nominees may be contemporary or historical, but must be citizens of the United States,
          either by birth or by naturalization. Their contributions should be of value to society,
          be of national and/or global importance, and of enduring value.
        </p>
        <h2>Judging Information</h2>
        <p>
          Hall staff will review nominations for accuracy and compliance and will send complete nominations
          to a panel of National Judges. The scoring is based on the value of the nominee's contributions
          to society, the significant national or global impact of their achievements, and the enduring value
          of their achievements.
        </p>
        <p>
          The panel of National Judges consists of distinguished citizens and representatives from respected
          national organizations. Your completed form is the only tool used to determine the merits of each
          nominee for induction into the Hall of Fame.
        </p>
        <p><em>Please refrain from sending petitions, photos, books, etc. References to websites are not acceptable nominations.</em></p>
        <hr />
      </div>
      <h3>About You</h3>
      <FormGroup>
        <TextInput name="author-first" labelText="First Name" required />
        <TextInput name="author-last" labelText="Last Name" required />
        <TextInput name="author-email" type="email" labelText="Your Email" placeholder="example@example.com" required />
      </FormGroup>
      <h3>About the Nominee</h3>
      <FormGroup>
        <TextInput name="nom-first" labelText="First Name" required />
        <TextInput name="nom-last" labelText="Last Name" required />
        <div id="yob-container">
          <NumberInput name="nom-yob" label="Year of Birth" required value={2023} />
        </div>
      </FormGroup>
      <h4>What area did your nominee primarily make contributions in?</h4>
      <FormGroup>
        <Checkbox name="nom-contrib-area" bind:group={contribs} value="c100" labelText="Art" bind:checked={sec_art} />
        <Checkbox name="nom-contrib-area" bind:group={contribs} value="c200" labelText="Athletics" bind:checked={sec_athletics} />
        <Checkbox name="nom-contrib-area" bind:group={contribs} value="c300" labelText="Business" bind:checked={sec_business} />
        <Checkbox name="nom-contrib-area" bind:group={contribs} value="c400" labelText="Education" bind:checked={sec_edu} />
        <Checkbox name="nom-contrib-area" bind:group={contribs} value="c500" labelText="Humanities" bind:checked={sec_humanities} />
        <Checkbox name="nom-contrib-area" bind:group={contribs} value="c600" labelText="Public Service / Government" bind:checked={sec_gov} />
        <Checkbox name="nom-contrib-area" bind:group={contribs} value="c700" labelText="STEM" bind:checked={sec_stem} />
        <Checkbox name="nom-contrib-area" bind:group={contribs} value="c800" labelText="Other" bind:checked={sec_other} />
        <input type="hidden" name="nom-contrib-area" bind:value={contribs}>
      </FormGroup>
      {#if sec_art}
        <FormGroup legendText="My nominee made contributions within this subcategory: Art">
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s101" labelText="Architecture" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s102" labelText="Art History" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s103" labelText="Cinema" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s104" labelText="Design" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s105" labelText="Literature" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s106" labelText="Music" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s107" labelText="Painting / Drawing" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s108" labelText="Sculpting" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s109" labelText="Theater / Dance" />
        </FormGroup>
      {/if}
      {#if sec_athletics}
        <FormGroup legendText="My nominee made contributions within this subcategory: Athletics">
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s201" labelText="Competition Sports" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s202" labelText="Individual Sports" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s203" labelText="Team Sports" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s204" labelText="Sports / Team Management" />
        </FormGroup>
      {/if}
      {#if sec_business}
        <FormGroup legendText="My nominee made contributions within this subcategory: Business">
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s301" labelText="CEO / Corporate Leadership" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s302" labelText="Entrepreneurship" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s303" labelText="Inventing / Patent Holding" />
        </FormGroup>
      {/if}
      {#if sec_edu}
        <FormGroup legendText="My nominee made contributions within this subcategory: Education">
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s401" labelText="Early Education" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s402" labelText="Higher Education" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s403" labelText="Research" />
        </FormGroup>
      {/if}
      {#if sec_humanities}
        <FormGroup legendText="My nominee made contributions within this subcategory: Humanities">
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s501" labelText="Ancient / Modern Languages" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s502" labelText="Literature" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s503" labelText="Philosophy / Religion" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s504" labelText="Social Reformation" />
        </FormGroup>
      {/if}
      {#if sec_gov}
        <FormGroup legendText="My nominee made contributions within this subcategory: Public Service / Government">
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s601" labelText="Activism" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s602" labelText="Legal / Judicial" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s603" labelText="Military" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s604" labelText="Politics" />
        </FormGroup>
      {/if}
      {#if sec_stem}
        <FormGroup legendText="My nominee made contributions within this subcategory: STEM">
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s701" labelText="Astronomy" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s702" labelText="Architecture" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s703" labelText="Biology" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s704" labelText="Chemestry" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s705" labelText="Climate / Earch Science" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s706" labelText="Computer Science" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s707" labelText="Mathematics" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s708" labelText="Medicine" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s709" labelText="Engineering" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s710" labelText="Physics" />
          <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="s711" labelText="Technology" />
        </FormGroup>
      {/if}
      <input type="hidden" name="nom-contrib-area-sub" bind:value={contribsSub}>
      {#if sec_other}
        <FormGroup legendText="My nominee made contributions within this subcategory: Other">
          <TextInput name="nom-contrib-area-sub-description" placeholder="Please type another option here" required />
        </FormGroup>
      {/if}
      <h4>Question 1: Have the nominee's contributions been of the greatest value to society and/or the empowerment of women?</h4>
      <FormGroup legendText="Check the boxes if you agree with the statements.">
        <Checkbox name="nom-q1" bind:group={q1ck} value="q101" labelText="The nominee is a leader in their field of achievement" />
        <Checkbox name="nom-q1" bind:group={q1ck} value="q102" labelText="The nominee created significant change within their field" />
        <Checkbox name="nom-q1" bind:group={q1ck} value="q103" labelText="The nominee's contributions have significant and lasting impact" />
        <Checkbox name="nom-q1" bind:group={q1ck} value="q104" labelText="The nominee's contributions significantly impacts/inspires others" />
        <Checkbox name="nom-q1" bind:group={q1ck} value="q105" labelText="The nominee contributed to the empowerment of women and/or contributed to the empowerment of women nationally" />
        <TextArea name="nom-q1-description" labelText="Please briefly explain how your nominee meets this requirement" placeholder="Type here..." required />
        <input type="hidden" name="nom-q1" bind:value={q1ck}>
      </FormGroup>
      <h4>Question 2: Has the nominee's achievements had significicant national and/or global impact? (Local/Regional achievements do not qualify)</h4>
      <FormGroup legendText="Check the boxes if you agree with the statements.">
        <Checkbox name="nom-q2" bind:group={q2ck} value="q201" labelText="The nominee had a significant impact on their field of accomplishment" />
        <Checkbox name="nom-q2" bind:group={q2ck} value="q202" labelText="The nominee's contributions inspired change, either within their field or for society as a whole" />
        <Checkbox name="nom-q2" bind:group={q2ck} value="q203" labelText="The nominee's contributions created national and/or global change/impact" />
        <TextArea name="nom-q2-description" labelText="Please briefly explain how your nominee meets this requirement" placeholder="Type here..." required />
        <input type="hidden" name="nom-q2" bind:value={q2ck}>
      </FormGroup>
      <h4>Question 3: Present evidence that the nominee's achievements have (will have) enduring value. Focus your narrative on change that has been (or will be) created, and how that change is expected to last over time.</h4>
      <FormGroup legendText="Check the boxes if you agree with the statements.">
        <Checkbox name="nom-q3" bind:group={q3ck} value="q301" labelText="The nominee's achievements created a change that has (or will) endure over time" />
        <Checkbox name="nom-q3" bind:group={q3ck} value="q302" labelText="The nominee's achievements created and maintained historical changes for society at large" />
        <TextArea name="nom-q3-description" labelText="Please briefly explain how your nominee meets this requirement" placeholder="Type here..." required />
        <input type="hidden" name="nom-q3" bind:value={q3ck}>
      </FormGroup>
      <h4>Is the nominee deceased?</h4>
      <FormGroup>
        <RadioButtonGroup name="nom-deceased-rb-group">
          <RadioButton name="nom-deceased" value="yes" labelText="Yes" bind:checked={sec_deceased} required />
          <RadioButton name="nom-deceased" value="no" labelText="No" bind:checked={sec_alive} />
        </RadioButtonGroup>
      </FormGroup>
      {#if sec_deceased}
        <FormGroup legendText="The nominee's achievements are (or will be) felt at least two generations after their death" required>
          <RadioButtonGroup name="nom-deceased-achieve-rb-group">
            <RadioButton name="nom-deceased-achieve" value="yes" labelText="Yes" required />
            <RadioButton name="nom-deceased-achieve" value="no" labelText="No" />
            <RadioButton name="nom-deceased-achieve" value="unsure" labelText="Unsure" />
          </RadioButtonGroup>
        </FormGroup>
      {/if}
      {#if sec_alive}
        <FormGroup legendText="The nominee's achievements are currently influencing and inspiring the next generation">
          <RadioButtonGroup name="nom-alive-achieve-rb-group" required>
            <RadioButton name="nom-alive-achieve" value="yes" labelText="Yes" />
            <RadioButton name="nom-alive-achieve" value="no" labelText="No" />
            <RadioButton name="nom-alive-achieve" value="unsure" labelText="Unsure" />
          </RadioButtonGroup>
        </FormGroup>
      {/if}
      <TextArea name="nom-additional-info-description" labelText="Please use this space to communicate any additional information about this nomination. (Optional)" placeholder="Type here..." />
      <div id="submit-button">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
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
    grid-template-columns: 1fr 45% 1fr;
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

  #yob-container {
    width: 16em;
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