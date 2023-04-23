<script lang="ts">  
  import { onMount } from "svelte";
  import Navigation from "../../components/Navigation.svelte";
  import { loggedInUser } from "../../stores";
  import { onAuthStateChanged, type User } from "firebase/auth";
  import { auth } from "$lib/firebase/clientApp";
  let errorImg = '/error.jpg';

  let name: string;
  let currentUser: User|null;

  onMount(async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) $loggedInUser = user;
    });
  });
  
  $: {
    if ($loggedInUser !== null) {
      currentUser = $loggedInUser;
      name = currentUser.displayName || 'User';
    }
  }

</script>

{#if $loggedInUser}
  <header><Navigation name={name} /></header>
  <slot />
{:else}
  <div class="container">
    <div class="middle">
      <div class="errorCode">401</div>
      <div class="errorText">Unauthorized. <span class="allWeKnow">That's all we know.</span></div>
      <div class="errorImage"><img src={errorImg} alt="A sad girl" /></div>
      <div class="whatnext">Try using your browser's Back button, or <a href="/login">Login</a>.</div>
    </div>
  </div>
{/if}

<style>
  .container {
    display: grid;
    grid-template-columns: 25% 50% 25%;
    grid-template-rows: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .middle {
    grid-column: 2;
    grid-row: 1;
    margin-top: 5em;
  }
  .errorCode {
    font-size: 6em;
  }
  .errorText {
    font-size: 2em;
    padding: 1em;
  }
  .allWeKnow {
    font-weight: 300;
  }
  .whatnext {
    padding-top: 1em;
  }
</style>