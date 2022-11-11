<script>
  export let data;
  export let {n} = data.props;
</script>

<h1>{n.nominee.firstName} {n.nominee.lastName}</h1>
<h3>Nominated by {n.nominator.firstName} {n.nominator.lastName} on {n.date}.</h3>

<p>Nomination Category: <b>{n.nominee.category}</b></p>

<p>This nominee is{n.nominee.deceased ? ' ' : ' not '}dead.</p>


<form method="POST" action="?/createNomination">
  <input type="text" name="title" placeholder="Title">
  <input type="text" name="body" placeholder="Body">
  <input type="number" name="userId" value="6">
  <input type="submit" value="Create!">
</form>