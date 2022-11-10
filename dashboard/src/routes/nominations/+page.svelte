<script>
  export let data;
  export let {nominations} = data.props;
</script>

<ul>
  {#each nominations as {userId, id, title}}
    <li>
      #{id} by {userId}: "{title}"
    </li>
  {/each}
</ul>