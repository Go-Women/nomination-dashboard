<script>
  export let data;
  export let {nomination} = data.props;
</script>

<h1>{nomination.title}</h1>
<h3>#{nomination.id} by {nomination.userId}</h3>

<p>
  {nomination.body}
</p>

<form method="POST" action="?/createNomination">
  <input type="text" name="title" placeholder="Title">
  <input type="text" name="body" placeholder="Body">
  <input type="number" name="userId" value="6">
  <input type="submit" value="Create!">
</form>