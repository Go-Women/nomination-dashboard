<script lang="ts">  
  import { onMount } from "svelte";
  import Navigation from "../../components/Navigation.svelte";
  import { loggedInUser } from "../../stores";
  import { onAuthStateChanged, type User } from "firebase/auth";
  import { auth } from "$lib/firebase/clientApp";

  export let data;
  export let { userType } = data.props;

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
  <header><Navigation name={name} userType={userType}/></header>
  <slot />
{:else}
  <div>Unauthorized.</div>
{/if}
