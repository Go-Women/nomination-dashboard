<script lang="ts">
  interface Nomination {id: string; firstName: string; lastName: string; category: string};

  export let data; // API call is in +page.server.ts
  export let { nomination }: {nomination: Nomination} = data;
</script>

<main>
  <h2>Nomination {nomination.id}</h2>
  <p>{nomination.firstName} {nomination.lastName} is a {nomination.category}.</p>
</main>
