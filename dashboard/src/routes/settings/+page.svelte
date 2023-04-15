<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import { Content, Grid, Button, Breadcrumb, BreadcrumbItem, Form } from "carbon-components-svelte";

  export let data;
  export let { cohorts } = data.props;

  let recentCohort = cohorts[cohorts.length - 1].startDate;
</script>

<main>
  <header><Navigation /></header>
  <Content class="bx--content--main">
    <Form method="POST">
    <Grid>
      <Button type="submit">Go Next</Button>
      <Breadcrumb>
        <BreadcrumbItem>{recentCohort}</BreadcrumbItem>
      </Breadcrumb>
    </Grid>
  </Form>
  </Content>
</main>
