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
  import NomineesOverview from "../../components/nominees/NomineesOverview.svelte";

  export let data;
  export let { nominees } = data.props;
  

  var getInformation = (nominees: JSON) => {
    let rows = new Array();
    Object.entries(nominees).forEach(([key, nominee], index) => {
      let subCat = nominee.subcategory;
      if (subCat == "") {
        subCat = nominee.subcategoryOther;
      }
      let data = {
        id: nominee.ID,
        name: nominee.firstName + " " + nominee.lastName,
        status: nominee.status,
        yob: nominee.yob,
        category: nominee.category,
        subcategory: nominee.subcategory,
        subcategoryOther: nominee.subcategoryOther,
        nominationIDs: nominee.nominations,
        nomineesSub: subCat,
      };

      rows.push(data);
    });

    return rows;
  };
  export const rowsData = getInformation(nominees);
</script>

<main>
  <header><Navigation /></header>
  <Content class="bx--content--main">
    <Grid>
      <Breadcrumb>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem>Nominees</BreadcrumbItem>
      </Breadcrumb>

      <Column>
        <Row><h1>Nominees</h1></Row>
        <NomineesOverview rows={rowsData} />
      </Column>
    </Grid>
  </Content>
</main>
