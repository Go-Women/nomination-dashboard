<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import { Content, DataTable, OverflowMenu, OverflowMenuItem } from "carbon-components-svelte";
  import NominationInformation from "../../components/nominations/NominationInformation.svelte";

  export let data;
  export let { nominations } = data.props;

  var headers = [
      { key: "data.id", empty: true},
      { key: "nominee", value: "Nominee" },
      { key: "nominator", value: "Nominated By" },
      { key: "date", value: "Date" },
    ]

  var populateRows = (nominations) => {
    let rows = [];
    let rowID = 1;
    Object.entries(nominations).forEach(([key, nomination], index) => {
      let data = {
        data: {
          id: rowID
        },
        id: rowID++,
        nominee: nomination["nom-first"] + " " + nomination["nom-last"],
        nominator: nomination["author-first"] + " " + nomination["author-last"],
        date: nomination.date,
      }
      rows.push(data);
    });
    return rows;
  }

  export const rows = populateRows(nominations);
</script>

<main>
  <header><Navigation /></header>
  <Content>
    <h1>Nominations</h1>
    <NominationInformation {rows}/>
  </Content>
</main>
