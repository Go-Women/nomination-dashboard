<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import {
    Content,
    Grid,
    Column,
    Row,
    Breadcrumb,
    BreadcrumbItem,
  } from "carbon-components-svelte";
  import JudgesInformation from "../../components/judges/JudgesInformation.svelte";
  import JudgeOverview from "../../components/judges/JudgeOverview.svelte";

  export let data;
  export let { judges } = data.props;
  let activeCount = 0;
  var incrementActiveCount = () => {
    return activeCount++;
  };

  var getInformation = (judges: JSON) => {
    let rows = new Array();
    let rowID = 1;
    Object.entries(judges).forEach(([key, judge], index) => {
      let data = {
        id: judge.id,
        name: judge["first-name"] + " " + judge["last-name"],
        pronouns: judge.pronouns,
        email: judge.email,
        "phone-num": judge["phone-number"],
        active: judge.interested,
        category: judge.category,
        subcategory: judge.subcategory,
      };

      if (judge.interested === true) {
        incrementActiveCount();
      }
      rows.push(data);
    });

    return rows;
  };
  export const rowsData = getInformation(judges);
  export const active = activeCount;
</script>

<main>
  <header><Navigation /></header>
  <Content>
    <Grid>
      <Breadcrumb>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem>Judges</BreadcrumbItem>
      </Breadcrumb>

      <Column>
        <Row><h1>Judges</h1></Row>
        <JudgeOverview {activeCount} />

        <JudgesInformation rows={rowsData} />
      </Column>
    </Grid>
  </Content>
</main>
