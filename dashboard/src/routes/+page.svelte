<script lang="ts">
  import JudgeProgress from "../components/dash/JudgeProgress.svelte";
  import NominationOverview from "../components/dash/NominationOverview.svelte";
  import Navigation from "../components/Navigation.svelte";
  import NominationCategory from "../components/dash/NominationCategory.svelte";
  import NominationSubCategory from "../components/dash/NominationSubCategory.svelte";

  import { Card, Row, Col, Container } from "sveltestrap";

  export let data;
  export let { nominations } = data.props;

  export let totalCount = Object.keys(nominations).length;
  export let valid = 25;
  export let unique = 11;

  export let judgeNotOpen = 19;
  export let judgeInProgress = 11;
  export let judgeCompleted = 3;

  var getCategories = (nominations) => {
    let categories = new Map();

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

    return categories;
  };
  export let categories = getCategories(nominations);

  var getSubCategories = (nominations) => {
    let subCategories = new Map();

    // TODO: make sure data is first parsed and cleaned beforehand
    // will get sub categories names and values later on will be easier with DB query
    Object.entries(nominations).forEach(([key, value], index) => {
      let val = value.nominee.subcategory;
      Object.entries(val).forEach(([key, value], index) => {
        let subVal = key;
        if (subCategories.has(subVal) && value != "") {
          let count = subCategories.get(subVal) + 1;
          subCategories.set(subVal, count);
        } else if (value != "") {
          subCategories.set(subVal, 1);
        }
      });
    });

    return subCategories;
  };
  export let subCategories = getSubCategories(nominations);

</script>

<main>
  <header>
    <Navigation />
  </header>
  <body>
    <Container class="mt-4">
      <Row cols={2}>
        <Col class="d-flex justify-content-center align-items-start">
          <NominationOverview
            totalNominations={totalCount}
            validNominations={valid}
            uniqueNominations={unique}
          />
        </Col>
        <Col class="d-flex justify-content-center align-items-start">
          <JudgeProgress
            notOpen={judgeNotOpen}
            inProgress={judgeInProgress}
            completed={judgeCompleted}
          />
        </Col>
 
        <Col class="d-flex justify-content-center align-items-start">
          <NominationCategory {categories} />
        </Col>
        <Col class="d-flex justify-content-center align-items-start">
          <NominationSubCategory {subCategories} />
        </Col>
      </Row>
  </Container>
  </body>
</main>

<!-- TODO: Custom css file to make sure all text is responsive and adjust color scheme and layouts -->