<script lang="ts">
  // import "carbon-components-svelte/css/all.css";
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
      if (judge.type === "judge") {
        let data = {
          id: rowID++,
          type: judge.type,
          name: judge.firstName + " " + judge.lastName,
          email: judge.email,
          active: judge.active,
          data: {
            id: judge.data.id,
            User: judge.data.User,
            skill: judge.data.skill,
            weight: judge.data.weight,
          },
          activityLog: {
            id: judge.activityLog.id,
            user: judge.activityLog.user,
            nominee: judge.activityLog.nominee,
            type: judge.activityLog.type,
          },
        };

        if (judge.active === true) {
          incrementActiveCount();
        }
        rows.push(data);
      }
    });

    return rows;
  };
  export const rowsData = getInformation(judges);
  export const active = activeCount;
</script>

<main>
  <header><Navigation /></header>
  <Content>
    <Breadcrumb>
      <BreadcrumbItem href="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>Judges</BreadcrumbItem>
    </Breadcrumb>
    <Grid>
      <Column>
        <Row><h1>Judges</h1></Row>
        <JudgeOverview {activeCount} />

        <JudgesInformation {rowsData} />
      </Column>
    </Grid>
  </Content>
</main>
