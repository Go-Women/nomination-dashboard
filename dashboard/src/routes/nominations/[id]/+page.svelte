<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../../css/index.css";
  import Nomination from "../../../components/nominations/Nomination.svelte";
  import { Breadcrumb, BreadcrumbItem, Column, Content, Grid, Row} from "carbon-components-svelte";
  import AffiliatedNomination from "../../../components/nominees/AffiliatedNomination.svelte";
  export let data;
  export let { n, keys } = data.props;
</script>

<main>
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
            <h2>{n['nomFirst']} {n['nomLast']}</h2>
            <!-- <Nomination nom={n} /> -->
            <AffiliatedNomination nomination={n} {keys} />
          </Column>
        </Grid>
      </Column>
    </Content>
  </body>
</main>
