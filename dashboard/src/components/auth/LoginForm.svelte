<script lang="ts">
  import { Button, Form, FormGroup, InlineNotification, PasswordInput, TextInput } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import Login from "carbon-icons-svelte/lib/Login.svelte";
  import { createEventDispatcher } from "svelte";

  export let data: {authError: {code:string, message:string}|null}

  let dispatch = createEventDispatcher<{login:{email:string,password:string}}>();
  let email: string;
  let password: string;

  const login = () => {
    dispatch("login", {
      email, password
    });
  };
</script>

<div id="login-form">
  <div id="login-label">Portal Login</div>
  <Form>
    <FormGroup>
      <TextInput name="email" type="email" bind:value={email} labelText="Email" placeholder="Enter Email..." />
      <PasswordInput name="password" bind:value={password} labelText="Password" placeholder="Enter Password..." />
    </FormGroup>
    <Button type="submit" icon={Login} on:click={(e) => { e.preventDefault(); login(); }}>Login</Button>
  </Form>
  {#if data.authError}
    <InlineNotification
      title={data.authError.code}      
    />
  {/if}
</div>

<style>
  #login-form {
    width: 100%;
    grid-column: 2;
    grid-row: 2;
  }

  #login-label {
    font-size: 2.5em;
    margin-bottom: 1em;
  }
</style>