<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../../css/index.css";
  import Navigation from "../../../components/Navigation.svelte";
  import Nomination from "../../../components/nominations/Nomination.svelte";
  import { Breadcrumb, BreadcrumbItem, Column, Content, Grid, Row} from "carbon-components-svelte";
  export let data;
  export let { n } = data.props;
</script>

<main>
  <header><Navigation /></header>
  <body>
    <Content>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/home">Home</BreadcrumbItem>
          <BreadcrumbItem href="/nominations">Nominations</BreadcrumbItem>
          <BreadcrumbItem>{n['nomFirst']} {n['nomLast']}</BreadcrumbItem>
        </Breadcrumb>

        <Grid>
          <Column>
            <Row><h1>Nomination</h1></Row>
            <Nomination nom={n} />
          </Column>
        </Grid>
      </Column>
    </Content>
  </body>
</main>
