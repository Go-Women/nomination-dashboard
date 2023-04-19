<script lang="ts">
  import { auth } from "$lib/firebase/clientApp";
  import { goto } from "$app/navigation";
  import { loggedInUser } from "../../stores";
  import LoginForm from "../../components/auth/LoginForm.svelte";
  import {
    browserLocalPersistence,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
  } from "firebase/auth";

  let data: { authError: { code: string; message: string } | null } = {
    authError: null,
  };

  const signIn = async (
    event: CustomEvent<{ email: string; password: string }>
  ) => {
    setPersistence(auth, browserLocalPersistence);
    signInWithEmailAndPassword(auth, event.detail.email, event.detail.password)
      .then(async (userCredential) => {
        $loggedInUser = userCredential.user;
        await goto("/home");
      })
      .catch((error) => {
        data.authError = {
          code: error.code,
          message: error.message,
        };
      });
  };
</script>

<main>
  <LoginForm on:login={signIn} {data} />
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    justify-items: center;
  }
</style>
