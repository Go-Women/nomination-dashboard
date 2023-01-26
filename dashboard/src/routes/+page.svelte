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
      <TextInput name="author-first" labelText="First Name" />
      <TextInput name="author-last" labelText="Last Name" />
      <TextInput name="author-email" labelText="Your Email" placeholder="example@example.com" />
    </FormGroup>
    <h2>About the Nominee</h2>
    <FormGroup>
      <TextInput name="nom-first" labelText="First Name" />
      <TextInput name="nom-last" labelText="Last Name" />
    </FormGroup>
    <h4>What area did your nominee primarily make contributions in?</h4>
    <FormGroup>
      <Checkbox name="nom-contrib-art" labelText="Art" bind:checked={sec_art} />
      <Checkbox name="nom-contrib-athletics" labelText="Athletics" bind:checked={sec_athletics} />
      <Checkbox name="nom-contrib-business" labelText="Business" bind:checked={sec_business} />
      <Checkbox name="nom-contrib-edu" labelText="Education" bind:checked={sec_edu} />
      <Checkbox name="nom-contrib-humanities" labelText="Humanities" bind:checked={sec_humanities} />
      <Checkbox name="nom-contrib-gov" labelText="Public Service / Government" bind:checked={sec_gov} />
      <Checkbox name="nom-contrib-stem" labelText="STEM" bind:checked={sec_stem} />
      <Checkbox name="nom-contrib-other" labelText="Other" bind:checked={sec_other} />
    </FormGroup>
    {#if sec_art}
      <FormGroup legendText="My nominee made contributions within this subcategory: Art">
        <Checkbox name="nom-contrib-art-arch" labelText="Architecture" />
        <Checkbox name="nom-contrib-art-hist" labelText="Art History" />
        <Checkbox name="nom-contrib-art-cinema" labelText="Cinema" />
        <Checkbox name="nom-contrib-art-design" labelText="Design" />
        <Checkbox name="nom-contrib-art-lit" labelText="Literature" />
        <Checkbox name="nom-contrib-art-music" labelText="Music" />
        <Checkbox name="nom-contrib-art-paint" labelText="Painting / Drawing" />
        <Checkbox name="nom-contrib-art-sculpt" labelText="Sculpting" />
        <Checkbox name="nom-contrib-art-dance" labelText="Theater / Dance" />
      </FormGroup>
    {/if}
    {#if sec_athletics}
      <FormGroup legendText="My nominee made contributions within this subcategory: Athletics">
        <Checkbox name="nom-contrib-athletics-comp" labelText="Competition Sports" />
        <Checkbox name="nom-contrib-athletics-indiv" labelText="Individual Sports" />
        <Checkbox name="nom-contrib-athletics-team" labelText="Team Sports" />
        <Checkbox name="nom-contrib-athletics-manage" labelText="Sports / Team Management" />
      </FormGroup>
    {/if}
    {#if sec_business}
      <FormGroup legendText="My nominee made contributions within this subcategory: Business">
        <Checkbox name="nom-contrib-business-ceo" labelText="CEO / Corporate Leadership" />
        <Checkbox name="nom-contrib-business-entr" labelText="Entrepreneurship" />
        <Checkbox name="nom-contrib-business-invent" labelText="Inventing / Patent Holding" />
      </FormGroup>
    {/if}
    {#if sec_edu}
      <FormGroup legendText="My nominee made contributions within this subcategory: Education">
        <Checkbox name="nom-contrib-edu-early" labelText="Early Education" />
        <Checkbox name="nom-contrib-edu-high" labelText="Higher Education" />
        <Checkbox name="nom-contrib-edu-research" labelText="Research" />
      </FormGroup>
    {/if}
    {#if sec_humanities}
      <FormGroup legendText="My nominee made contributions within this subcategory: Humanities">
        <Checkbox name="nom-contrib-humanities-lang" labelText="Ancient / Modern Languages" />
        <Checkbox name="nom-contrib-humanities-lit" labelText="Literature" />
        <Checkbox name="nom-contrib-humanities-god" labelText="Philosophy / Religion" />
        <Checkbox name="nom-contrib-humanities-reform" labelText="Social Reformation" />
      </FormGroup>
    {/if}
    {#if sec_gov}
      <FormGroup legendText="My nominee made contributions within this subcategory: Public Service / Government">
        <Checkbox name="nom-contrib-gov-act" labelText="Activism" />
        <Checkbox name="nom-contrib-gov-law" labelText="Legal / Judicial" />
        <Checkbox name="nom-contrib-gov-mil" labelText="Military" />
        <Checkbox name="nom-contrib-gov-pol" labelText="Politics" />
      </FormGroup>
    {/if}
    {#if sec_stem}
      <FormGroup legendText="My nominee made contributions within this subcategory: STEM">
        <Checkbox name="nom-contrib-stem-astro" labelText="Astronomy" />
        <Checkbox name="nom-contrib-stem-arch" labelText="Architecture" />
        <Checkbox name="nom-contrib-stem-bio" labelText="Biology" />
        <Checkbox name="nom-contrib-stem-chem" labelText="Chemestry" />
        <Checkbox name="nom-contrib-stem-earth" labelText="Climate / Earch Science" />
        <Checkbox name="nom-contrib-stem-cs" labelText="Computer Science" />
        <Checkbox name="nom-contrib-stem-math" labelText="Mathematics" />
        <Checkbox name="nom-contrib-stem-medi" labelText="Medicine" />
        <Checkbox name="nom-contrib-stem-eng" labelText="Engineering" />
        <Checkbox name="nom-contrib-stem-phys" labelText="Physics" />
        <Checkbox name="nom-contrib-stem-tech" labelText="Technology" />
      </FormGroup>
    {/if}
    {#if sec_other}
      <FormGroup legendText="My nominee made contributions within this subcategory: Other">
        <TextInput name="nom-contrib-other-description" placeholder="Please type another option here" />
      </FormGroup>
    {/if}
    <h4>Question 1: Have the nominee's contributions been of the greatest value to society and/or the empowerment of women?</h4>
    <FormGroup legendText="Check the boxes if you agree with the statements.">
      <Checkbox name="nom-q1-leader" labelText="The nominee is a leader in their field of achievement" />
      <Checkbox name="nom-q1-change" labelText="The nominee created significant change within their field" />
      <Checkbox name="nom-q1-impact" labelText="The nominee's contributions have significant and lasting impact" />
      <Checkbox name="nom-q1-inspire" labelText="The nominee's contributions significantly impacts/inspires otherzs" />
      <Checkbox name="nom-q1-empower" labelText="The nominee contributed to the empowerment of women and/or contributed to the empowerment of women nationally" />
      <TextArea name="nom-q1-description" labelText="Please briefly explain how your nominee meets this requirement" placeholder="Type here..." />
    </FormGroup>
    <h4>Question 2: Has the nominee's achievements had significicant national and/or global impact? (Local/Regional achievements do not qualify)</h4>
    <FormGroup legendText="Check the boxes if you agree with the statements.">
      <Checkbox name="nom-q2-impact" labelText="The nominee had a significant impact on their field of accomplishment" />
      <Checkbox name="nom-q2-inspire" labelText="The nominee's contributions inspired change, either within their field or for society as a whole" />
      <Checkbox name="nom-q2-impact" labelText="The nominee's contributions created national and/or global change/impact" />
      <TextArea name="nom-q2-description" labelText="Please briefly explain how your nominee meets this requirement" placeholder="Type here..." />
    </FormGroup>
    <h4>Question 3: Present evidence that the nominee's achievements have (will have) enduring value. Focus your narrative on change that has been (or will be) created, and how that change is expected to last over time.</h4>
    <FormGroup legendText="Check the boxes if you agree with the statements.">
      <Checkbox name="nom-q3-endure" labelText="The nominee's achievements created a change that has (or will) endure over time" />
      <Checkbox name="nom-q3-society" labelText="The nominee's achievements created and maintained historical changes for society at large" />
      <TextArea name="nom-q3-description" labelText="Please briefly explain how your nominee meets this requirement" placeholder="Type here..." />
    </FormGroup>
    <h4>Is the nominee deceased?</h4>
    <FormGroup>
      <RadioButtonGroup name="nom-deceased-rb-group">
        <RadioButton name="nom-deceased" value="yes" labelText="Yes" bind:checked={sec_deceased} />
        <RadioButton name="nom-deceased" value="no" labelText="No" bind:checked={sec_alive} />
      </RadioButtonGroup>
    </FormGroup>
    {#if sec_deceased}
      <FormGroup legendText="The nominee's achievements are (or will be) felt at least two generations after their death">
        <RadioButtonGroup name="nom-deceased-achieve-rb-group">
          <RadioButton name="nom-deceased-achieve" value="yes" labelText="Yes" />
          <RadioButton name="nom-deceased-achieve" value="no" labelText="No" />
          <RadioButton name="nom-deceased-achieve" value="unsure" labelText="Unsure" />
        </RadioButtonGroup>
      </FormGroup>
    {/if}
    {#if sec_alive}
      <FormGroup legendText="The nominee's achievements are currently influencing and inspiring the next generation">
        <RadioButtonGroup name="nom-alive-achieve-rb-group">
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
