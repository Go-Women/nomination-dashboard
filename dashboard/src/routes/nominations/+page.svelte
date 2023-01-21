<script>
  import DashNominationOverview from "../../components/dash/NominationOverview.svelte";
  import Navigation from "../../components/Navigation.svelte";
  export let data;
  export let { nominations } = data.props;
</script>

<main>
  <header><Navigation /></header>
  <body>
    <ul>
      {#each Object.entries(nominations) as [id, nomination]}
        <li>
          <a href="/nominations/{id}"
            >({id}) {nomination.nominee.firstName}
            {nomination.nominee.lastName}.</a
          >
        </li>
      {/each}
    </ul>
  </body>
</main>
