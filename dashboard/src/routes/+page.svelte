<script lang="ts">
  import {
    Content,
    Grid,
    Row,
    Column,
    ImageLoader,
    Theme,
    RadioButtonGroup,
    RadioButton,
    Form,
    FormGroup,
    TextInput,
    Checkbox,
    Button,
    TextArea,
  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
    import { prevent_default } from "svelte/internal";
  import "../css/index.css";

  let theme = "g90";

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
  <Theme bind:theme persist persistKey="__carbon-theme" />

  <RadioButtonGroup legendText="Color Theme" bind:selected={theme}>
    <RadioButton labelText="White" value="white" />
    <RadioButton labelText="Dark" value="g90" />
  </RadioButtonGroup>

  <Form method="POST">
    <h2>About You</h2>
    <FormGroup>
      <TextInput name="author-first" labelText="First Name" required />
      <TextInput name="author-last" labelText="Last Name" required />
      <TextInput name="author-email" labelText="Your Email" placeholder="example@example.com" required />
    </FormGroup>
    <h2>About the Nominee</h2>
    <FormGroup>
      <TextInput name="nom-first" labelText="First Name" required />
      <TextInput name="nom-last" labelText="Last Name" required />
    </FormGroup>
    <h4>What area did your nominee primarily make contributions in?</h4>
    <FormGroup>
      <Checkbox name="nom-contrib-area" bind:group={contribs} value="art" labelText="Art" bind:checked={sec_art} />
      <Checkbox name="nom-contrib-area" bind:group={contribs} value="athletics" labelText="Athletics" bind:checked={sec_athletics} />
      <Checkbox name="nom-contrib-area" bind:group={contribs} value="business" labelText="Business" bind:checked={sec_business} />
      <Checkbox name="nom-contrib-area" bind:group={contribs} value="edu" labelText="Education" bind:checked={sec_edu} />
      <Checkbox name="nom-contrib-area" bind:group={contribs} value="humanities" labelText="Humanities" bind:checked={sec_humanities} />
      <Checkbox name="nom-contrib-area" bind:group={contribs} value="gov" labelText="Public Service / Government" bind:checked={sec_gov} />
      <Checkbox name="nom-contrib-area" bind:group={contribs} value="stem" labelText="STEM" bind:checked={sec_stem} />
      <Checkbox name="nom-contrib-area" bind:group={contribs} value="other" labelText="Other" bind:checked={sec_other} />
      <input type="hidden" name="nom-contrib-area" bind:value={contribs}>
    </FormGroup>
    {#if sec_art}
      <FormGroup legendText="My nominee made contributions within this subcategory: Art">
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="arch-art" labelText="Architecture" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="hist" labelText="Art History" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="cinema" labelText="Cinema" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="design" labelText="Design" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="lit" labelText="Literature" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="music" labelText="Music" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="paint" labelText="Painting / Drawing" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="sculpt" labelText="Sculpting" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="dance" labelText="Theater / Dance" />
      </FormGroup>
    {/if}
    {#if sec_athletics}
      <FormGroup legendText="My nominee made contributions within this subcategory: Athletics">
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="comp" labelText="Competition Sports" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="indiv" labelText="Individual Sports" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="team" labelText="Team Sports" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="manage" labelText="Sports / Team Management" />
      </FormGroup>
    {/if}
    {#if sec_business}
      <FormGroup legendText="My nominee made contributions within this subcategory: Business">
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="ceo" labelText="CEO / Corporate Leadership" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="entr" labelText="Entrepreneurship" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="invent" labelText="Inventing / Patent Holding" />
      </FormGroup>
    {/if}
    {#if sec_edu}
      <FormGroup legendText="My nominee made contributions within this subcategory: Education">
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="edu-early" labelText="Early Education" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="edu-high" labelText="Higher Education" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="research" labelText="Research" />
      </FormGroup>
    {/if}
    {#if sec_humanities}
      <FormGroup legendText="My nominee made contributions within this subcategory: Humanities">
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="lang" labelText="Ancient / Modern Languages" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="lit" labelText="Literature" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="religion" labelText="Philosophy / Religion" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="reform" labelText="Social Reformation" />
      </FormGroup>
    {/if}
    {#if sec_gov}
      <FormGroup legendText="My nominee made contributions within this subcategory: Public Service / Government">
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="act" labelText="Activism" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="law" labelText="Legal / Judicial" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="mil" labelText="Military" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="pol" labelText="Politics" />
      </FormGroup>
    {/if}
    {#if sec_stem}
      <FormGroup legendText="My nominee made contributions within this subcategory: STEM">
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="astro" labelText="Astronomy" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="arch" labelText="Architecture" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="bio" labelText="Biology" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="chem" labelText="Chemestry" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="earth" labelText="Climate / Earch Science" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="cs" labelText="Computer Science" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="math" labelText="Mathematics" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="medi" labelText="Medicine" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="eng" labelText="Engineering" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="phys" labelText="Physics" />
        <Checkbox name="nom-contrib-area-sub" bind:group={contribsSub} value="tech" labelText="Technology" />
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
      <Checkbox name="nom-q1" bind:group={q1ck} value="leader" labelText="The nominee is a leader in their field of achievement" />
      <Checkbox name="nom-q1" bind:group={q1ck} value="change" labelText="The nominee created significant change within their field" />
      <Checkbox name="nom-q1" bind:group={q1ck} value="impact" labelText="The nominee's contributions have significant and lasting impact" />
      <Checkbox name="nom-q1" bind:group={q1ck} value="inspire" labelText="The nominee's contributions significantly impacts/inspires otherzs" />
      <Checkbox name="nom-q1" bind:group={q1ck} value="empower" labelText="The nominee contributed to the empowerment of women and/or contributed to the empowerment of women nationally" />
      <TextArea name="nom-q1-description" labelText="Please briefly explain how your nominee meets this requirement" placeholder="Type here..." required />
      <input type="hidden" name="nom-q1" bind:value={q1ck}>
    </FormGroup>
    <h4>Question 2: Has the nominee's achievements had significicant national and/or global impact? (Local/Regional achievements do not qualify)</h4>
    <FormGroup legendText="Check the boxes if you agree with the statements.">
      <Checkbox name="nom-q2" bind:group={q2ck} value="impact" labelText="The nominee had a significant impact on their field of accomplishment" />
      <Checkbox name="nom-q2" bind:group={q2ck} value="inspire" labelText="The nominee's contributions inspired change, either within their field or for society as a whole" />
      <Checkbox name="nom-q2" bind:group={q2ck} value="global-impact" labelText="The nominee's contributions created national and/or global change/impact" />
      <TextArea name="nom-q2-description" labelText="Please briefly explain how your nominee meets this requirement" placeholder="Type here..." required />
      <input type="hidden" name="nom-q2" bind:value={q2ck}>
    </FormGroup>
    <h4>Question 3: Present evidence that the nominee's achievements have (will have) enduring value. Focus your narrative on change that has been (or will be) created, and how that change is expected to last over time.</h4>
    <FormGroup legendText="Check the boxes if you agree with the statements.">
      <Checkbox name="nom-q3" bind:group={q3ck} value="endure" labelText="The nominee's achievements created a change that has (or will) endure over time" />
      <Checkbox name="nom-q3" bind:group={q3ck} value="society" labelText="The nominee's achievements created and maintained historical changes for society at large" />
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
    <Button type="submit">Submit</Button>
  </Form>

</main>

<style>
  main {
    margin: 1rem;
  }
</style>