<script lang="ts">
  import { auth } from "$lib/firebase/clientApp";
  import {
    sendPasswordResetEmail,
    type UserCredential,
  } from "firebase/auth";
  import {
    Button,
    Form,
    FormGroup,
    InlineNotification,
    PasswordInput,
    TextInput,
  } from "carbon-components-svelte";
  import { Login } from "carbon-icons-svelte";

  let data: { authError: { code: string; message: string } | null } = {
    authError: null,
  };

  let email = "";

  const initiateReset = async () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      (document.getElementById('resetForm') as HTMLFormElement).submit();
    });
  };
</script>

<main>
  <div id="login-form">
    <div id="login-label">Send Password Reset Email</div>
    <form method="POST" id="resetForm">
      <FormGroup>
        <TextInput
          name="email"
          type="email"
          bind:value={email}
          labelText="Email"
          placeholder="Enter Email..."
        />
      </FormGroup>
      <Button
        type="submit"
        icon={Login}
        on:click={(e) => {
          e.preventDefault();
          initiateReset();
        }}>Send Email</Button
      >
    </form>
    {#if data.authError}
      <InlineNotification title={data.authError.code} />
    {/if}
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    justify-items: center;
  }

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
