<script lang="ts">
  import { Header, HeaderNavItem, HeaderUtilities, SideNav, SideNavItems, SideNavLink, SkipToContent } from "carbon-components-svelte";
  import { Home, Result, UserMultiple, Compare, UserCertification } from "carbon-icons-svelte";

  export let name: string;
  let isSideNavOpen = false;
</script>

<Header
  company={"National Women's Hall of Fame"}
  platformName="Nomination Portal"
  href="/home"
  bind:isSideNavOpen
>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderUtilities>
    <HeaderNavItem text={`Logout ${name}`} />
    <!-- <HeaderNavItem href="/" text="Nomination Form"/> -->
  </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen} rail>
  <SideNavItems>
    <SideNavLink icon={Home} text="Dashboard" href="/home" isSelected />
    <SideNavLink icon={Result} text="Nominations" href="/nominations" />
    <SideNavLink icon={UserCertification} text="Nominees" href="/nominees" />
    <SideNavLink icon={UserMultiple} text="Judges" href="/judges" />
    <SideNavLink icon={Compare} text="Matching" href="/matches" />
  </SideNavItems>
</SideNav>
