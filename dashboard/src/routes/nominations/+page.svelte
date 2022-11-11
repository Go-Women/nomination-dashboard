<script>
  export let data;
  export let {nominations} = data.props;
</script>

<ul>
  {#each Object.entries(nominations) as [id, nomination]}
    <li>
      <a href="/nominations/{id}">({id}) {nomination.nominee.firstName} {nomination.nominee.lastName}.</a>
    </li>
  {/each}
</ul>