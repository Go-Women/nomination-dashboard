<script lang="ts">
  import { Breadcrumb, BreadcrumbItem, Column, Content, Grid, Row } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
    import NomineeInfo from "../../../components/nominees/NomineeInfo.svelte";
  import Navigation from "../../../components/Navigation.svelte";
  import "../../../css/index.css";

  export let data;
  export let { n, nominations, keys } = data.props;
  export let review: boolean = false;

  let fullName = `${n.firstName} ${n.lastName}`;
</script>

<main>
  <header><Navigation /></header>
  <body>
    <Content>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/home">Home</BreadcrumbItem>
          <BreadcrumbItem href="/nominees">Nominees</BreadcrumbItem>
          <BreadcrumbItem>{fullName}</BreadcrumbItem>
        </Breadcrumb>
        <NomineeInfo nominee={n} {nominations} {keys} {review}/>
      </Column>
    </Content>
  </body>
</main>