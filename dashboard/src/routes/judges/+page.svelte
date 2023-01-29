<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import "../../css/index.css";
  import Navigation from "../../components/Navigation.svelte";
  import {
    Content,
    Grid,
    Breadcrumb,
    BreadcrumbItem,
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
    Button,
  } from "carbon-components-svelte";

  import View from "carbon-icons-svelte/lib/View.svelte";
  import { CellTower } from "carbon-icons-svelte";

  export let data;
  export let { judges } = data.props;

  let getDataTable = () => {
    let rows = [];
    Object.entries(judges).forEach(([key, judge], index) => {
      if (judge.type == "judge") {
        let data = {
          id: judge.id,
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
        rows.push(data);
      }
    });

    return rows;
  };

  let pageSize = 10;
  let page = 1;
</script>

<main>
  <header><Navigation /></header>
  <Content>
    <Breadcrumb>
      <BreadcrumbItem href="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>Judges</BreadcrumbItem>
    </Breadcrumb>
    <Grid>
      <h1>Judges</h1>
      <DataTable
        style="justify-text: center;"
        sortable
        headers={[
          { key: "id", value: "#" },
          { key: "name", value: "Name" },
          { key: "email", value: "Email" },
          { key: "active", value: "Active" },
          { key: "data.id", empty: true },
        ]}
        rows={getDataTable()}
        {pageSize}
        {page}
      >
        <Toolbar>
          <ToolbarContent>
            <ToolbarSearch persistent shouldFilterRows />
          </ToolbarContent>
        </Toolbar>
        <svelte:fragment slot="cell" let:cell>
          {#if cell.key === "data.id"}
            <Button
              iconDescription="View"
              icon={View}
              href="/judges/{cell.value}"
            />
          {:else}{cell.value}{/if}
        </svelte:fragment>
      </DataTable>

      <Pagination
        bind:pageSize
        bind:page
        totalItems={getDataTable().length}
        pageSizeInputDisabled
      />
    </Grid>
  </Content>
</main>
