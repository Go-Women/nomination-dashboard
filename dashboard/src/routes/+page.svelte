<script lang="ts">
  import JudgeProgress from "../components/dash/JudgeProgress.svelte";
  import NominationOverview from "../components/dash/NominationOverview.svelte";
  import Navigation from "../components/Navigation.svelte";
  import NominationCategory from "../components/dash/NominationCategory.svelte";

  import { Card, Row, Col } from "sveltestrap";
  import { object_without_properties } from "svelte/internal";

  export let data;
  export let { nominations } = data.props;

  export let totalCount = Object.keys(nominations).length;
  export let valid = 25;
  export let unique = 11;

  export let judgeNotOpen = 19;
  export let judgeInProgress = 11;
  export let judgeCompleted = 3;

  export let categories = new Map();
  let categoryNum = 1;

  // TODO: make sure data is first parsed and cleaned beforehand
  Object.entries(nominations).forEach(([key, value], index) => {
    let val = value.nominee.category;
    if (categories.has(val)) {
      let count = categories.get(val) + 1;
      categories.set(val, count);
    } else {
      categories.set(val, 1);
    }
  });
</script>

<main>
  <header>
    <Navigation />
  </header>
  <body>
    <Card>
      <Row>
        <Col>
          <NominationOverview
            totalNominations={totalCount}
            validNominations={valid}
            uniqueNominations={unique}
          />
        </Col>
        <Col>
          <JudgeProgress
            notOpen={judgeNotOpen}
            inProgress={judgeInProgress}
            completed={judgeCompleted}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <NominationCategory {categories} />
        </Col>
      </Row>
    </Card>
  </body>
</main>
