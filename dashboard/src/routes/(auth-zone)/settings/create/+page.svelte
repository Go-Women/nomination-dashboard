<script lang="ts">
  import { auth } from "$lib/firebase/clientApp";
  import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    setPersistence,
    signOut,
    updateProfile,
    type UserCredential,
  } from "firebase/auth";
    import { Button, FormGroup, InlineNotification, PasswordInput, Select, SelectItem, TextInput } from "carbon-components-svelte";
    import { Login } from "carbon-icons-svelte";


  let pronoun = "She/Her";
  let pronouns = ["She/Her", "He/Him", "They/Them", "Other"];

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

  let data: { authError: { code: string; message: string } | null } = {
    authError: null,
  };

  let firstName = '';
  let lastName = '';
  let email = '';
  let password = '';
  let firebaseID = '';
  
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
    }).then(() => signOut(auth))
    .catch((error) => {
      data.authError = {
        code: error.code,
        message: error.message
      };
    });
  }
  </script>
  
  <main>
    <div id="login-form">
      <div id="login-label">Create an Administrator</div>
      <form method="POST" id="registerForm">
        <FormGroup>
          <TextInput name="firstName" labelText="First Name" bind:value={firstName} required />
          <TextInput name="lastName" labelText="Last Name" bind:value={lastName} required />
          <TextInput name="email" type="email" labelText="Email" bind:value={email} placeholder="example@example.com" required />
          <TextInput name="phoneNumber" type="tel" labelText="Phone Number" placeholder="(555) - 555 - 5555" required />
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
          <PasswordInput name="password" labelText="Please set a password for this account." bind:value={password} placeholder="Password" required />
          <input type="hidden" name="firebaseID" bind:value={firebaseID} />
        </FormGroup>
        <Button type="submit" icon={Login} on:click={(e) => { e.preventDefault(); register(); }}>Create Administrator</Button>
        <br />You will be logged out.
      </form>
      {#if data.authError}
        <InlineNotification
          title={data.authError.code}      
        />
      {/if}
    </div>
    <div id="back">
      <Button size="small" href="/settings">Back to Settings</Button>
    </div>
  </main>
  
  <style>
    main {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 25vh auto;
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

    #back {
      width: 100%;
      grid-column: 1;
      grid-row: 1;
      margin-top: 5em;
      margin-left: 10em;
    }
  </style>
  