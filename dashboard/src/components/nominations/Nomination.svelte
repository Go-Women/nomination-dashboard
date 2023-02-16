<script lang="ts">
  import { Row, SkeletonText, StructuredList, StructuredListBody, StructuredListCell, StructuredListRow, Tile, Toggle } from 'carbon-components-svelte'
  export let nom;
  export let showHeader = true;

  let firstName = nom['nom-first'];
  let lastName = nom['nom-last'];
  let name = firstName + ' ' + lastName;
  let nomBy = nom['author-first'] + ' ' + nom['author-last'];
  let date = nom.date;
  let matched = false;  // TODO: replace with backend value
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
              <StructuredListCell><SkeletonText /></StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap><strong>Subcategory</strong></StructuredListCell>
              <StructuredListCell><SkeletonText /></StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell>
                <Toggle bind:toggled={matched}>
                  <span slot="labelA" style="color: red">Not Matched</span>
                  <span slot="labelB" style="color: green">Matched</span>
                </Toggle>
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredList>
    </Tile>
  </div>
</div>