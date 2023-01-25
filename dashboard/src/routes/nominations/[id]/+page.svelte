<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../../css/index.css";
  import Navigation from "../../../components/Navigation.svelte";
  import {
    Content,
    SideNavDivider,
    Column,
    Row,
  } from "carbon-components-svelte";
  export let data;
  export let { n } = data.props;
</script>

<main>
  <header><Navigation /></header>
  <body>
    <Content style="padding-left: $spacing-05">
      <Column>
        <h1>Nomination</h1>

        <h2>{n.nominee.firstName} {n.nominee.lastName}</h2>

        <h3>
          Nominated by {n.nominator.firstName}
          {n.nominator.lastName} on {n.date}.
        </h3>

        <p>Nomination Category: <b>{n.nominee.category}</b></p>

        <p>
          This nominee is{n.nominee.deceased ? " " : " not "}dead.
        </p>

        <form method="POST" action="?/createNomination">
          <input type="text" name="title" placeholder="Title" />
          <input type="text" name="body" placeholder="Body" />
          <input type="number" name="userId" value="6" />
          <input type="submit" value="Create!" />
        </form>
      </Column>
    </Content>
  </body>
</main>
