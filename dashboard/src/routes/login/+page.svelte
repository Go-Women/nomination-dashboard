<script lang="ts">
  import { auth } from "$lib/firebase/clientApp";
  import { goto } from "$app/navigation";
  import { loggedInUser } from "../../stores";
  import {
    browserLocalPersistence,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    type UserCredential,
  } from "firebase/auth";
    import { Button, Form, FormGroup, InlineNotification, Link, PasswordInput, TextInput } from "carbon-components-svelte";
    import { Login } from "carbon-icons-svelte";

  let data: { authError: { code: string; message: string } | null } = {
    authError: null,
  };

  let email = '';
  let password = '';
  let firebaseID = '';

  const signIn = async () => {
    setPersistence(auth, browserLocalPersistence);
    signInWithEmailAndPassword(
      auth,
      email,
      password
    ).then(async (userCredential: UserCredential) => {
      $loggedInUser = userCredential.user;
      firebaseID = userCredential.user.uid;
      password = '';
    }).then(() => {
      (document.getElementById('loginForm') as HTMLFormElement).submit();
    }).catch((error) => {
      data.authError = {
        code: error.code,
        message: error.message,
      };
    });
  };
</script>

<main>
  <div id="login-form">
    <div id="login-label">Portal Login</div>
    <form method="POST" id="loginForm">
      <FormGroup>
        <TextInput name="email" type="email" bind:value={email} labelText="Email" placeholder="Enter Email..." />
        <PasswordInput name="password" bind:value={password} labelText="Password" placeholder="Enter Password..." />
        <input type="hidden" name="firebaseID" bind:value={firebaseID} />
      </FormGroup>
      <Button type="submit" icon={Login} on:click={(e) => { e.preventDefault(); signIn(); }}>Login</Button>
    </form>
    {#if data.authError}
      <InlineNotification
        title={data.authError.code}      
      />
    {/if}
    <a id="forgor" href="/login/reset">Forgot Password?</a>
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

  #forgor {
    text-align: right;
    float: right;
    color: blue;
  }

  #forgor:visited {
    color: blue;
  }
</style>
