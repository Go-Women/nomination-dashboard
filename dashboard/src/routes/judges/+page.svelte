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
      // let info = JSON.parse(judge.info)[0];     // TODO: clean this on the backend instead of front end

      let data = {
        id: judge.ID,
        name: judge.firstName + " " + judge.lastName,
        pronouns: judge.info.pronouns,
        email: judge.email,
        phoneNumber: judge.info.phoneNumber,
        active: judge.info.interested,
        category: judge.info.category,
        subcategory: judge.info.subcategory,
        capacity: judge.info.capacity
      };

      if (judge.info.interested === true) {
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
  <Content class="bx--content--main">
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
