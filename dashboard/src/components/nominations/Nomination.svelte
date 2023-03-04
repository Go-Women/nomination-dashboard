<script lang="ts">
  import { Row, StructuredList, StructuredListBody, StructuredListCell, StructuredListRow, Tile, Toggle } from 'carbon-components-svelte'
  export let nom;
  export let showHeader = true;

  let firstName = nom['nomFirst'];
  let lastName = nom['nomLast'];
  let name = firstName + ' ' + lastName;
  let nomBy = nom['authorFirst'] + ' ' + nom['authorLast'];
  let date = new Date(nom.date).toLocaleDateString('es-pa');
  let category = nom.category;
  let subcategory = nom.subcategory;
  let status = nom.nomStatus;
</script>

<div class="bx--content--overview">
  {#if showHeader}
    <Row><h2>{name}</h2></Row>
  {/if}
  <div class="bx--content--info">
    {#if showHeader}
      <Row><h3>Information</h3></Row>
    {/if}
    <Tile>
        <StructuredList condensed>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell noWrap><strong>Nominated By</strong></StructuredListCell>
              <StructuredListCell>{nomBy}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap><strong>Submitted</strong></StructuredListCell>
              <StructuredListCell>{date}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap><strong>Category</strong></StructuredListCell>
              <StructuredListCell>{category}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap><strong>Subcategory</strong></StructuredListCell>
              <StructuredListCell>{subcategory}</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
                <StructuredListCell noWrap><strong>Status</strong></StructuredListCell>
                <StructuredListCell>{status}</StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredList>
    </Tile>
  </div>
</div>