<script lang="ts">
  import { Form, FormGroup, Row, StructuredList, StructuredListBody, StructuredListCell, StructuredListRow, TextInput, Tile, Toggle } from 'carbon-components-svelte'
  export let nom;

  let nomEdit = false;
  function handleEdit() {
    nomEdit = !nomEdit;
  }

  let firstName = nom['nom-first'];
  let lastName = nom['nom-last'];
  let name = firstName + ' ' + lastName;
  let nomBy = nom['author-first'] + ' ' + nom['author-last'];
  let date = nom.date;
  let matched = false;
</script>

<div class="bx--content--overview">
  <Row><h2>{name}</h2></Row>
  <div class="bx--content--info">
    <Row><h3>Information</h3></Row>
    <Tile>
        <StructuredList flush>
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
              <StructuredListCell>Placeholder</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap><strong>Subcategory</strong></StructuredListCell>
              <StructuredListCell>Placeholder</StructuredListCell>
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