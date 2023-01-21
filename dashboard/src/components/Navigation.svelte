<script lang="ts">
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'sveltestrap';

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/">The National Women's Hall of Fame</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      <NavItem>
        <NavLink href="/">Dashboard</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/nominations">Nominees</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/nominations">Judges</NavLink>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>