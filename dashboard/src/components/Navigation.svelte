<script>
  import {
    Header,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent,
  } from "carbon-components-svelte";
  import Home from "carbon-icons-svelte/lib/Home.svelte";
  import Result from "carbon-icons-svelte/lib/Result.svelte";
  import UserMultiple from "carbon-icons-svelte/lib/UserMultiple.svelte";

  let isSideNavOpen = false;
</script>

<Header
  company={"Women's Nation Hall of Fame"}
  platformName="Nomination Selection Process"
  href="/home"
  bind:isSideNavOpen
>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
</Header>

<SideNav bind:isOpen={isSideNavOpen} rail>
  <SideNavItems>
    <SideNavLink icon={Home} text="Dashboard" href="/home" isSelected />
    <SideNavLink icon={Result} text="Nominees" href="/nominations" />
    <SideNavLink icon={UserMultiple} text="Judges" href="/" />
  </SideNavItems>
</SideNav>
