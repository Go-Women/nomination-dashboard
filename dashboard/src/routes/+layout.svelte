<script lang="ts">  
  import Navigation from "../components/Navigation.svelte";
  import { auth, logOut } from '$lib/firebase/clientApp';
  import { onAuthStateChanged, type User } from 'firebase/auth';
  import { onMount } from 'svelte';
  import { error } from "@sveltejs/kit";

  let email: string;
  onMount(async () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) throw error(401, "Unauthorized");
      else email = user.email!;
    });
  });
</script>

<header><Navigation name={email} /></header>
<slot />