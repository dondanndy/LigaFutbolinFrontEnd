<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Chevron, Dropdown, DropdownItem } from 'flowbite-svelte'
</script>

<Navbar let:hidden let:toggle color="none">
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Liga Futbolín
    </span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/matches">Próximos partidos</NavLi>
    <NavLi href="/calendar">Calendario</NavLi>
    <NavLi href="/standings">Clasificación</NavLi>
    <NavLi id="nav-menu1" class="cursor-pointer"><Chevron aligned>Reglas</Chevron></NavLi>
    <Dropdown triggeredBy="#nav-menu1" class="w-44 z-20">
      <DropdownItem href="/game-rules">Reglas de juego</DropdownItem>
      <DropdownItem href="/draw-rules">Reglas de sorteo</DropdownItem>
    </Dropdown>
  </NavUl>
</Navbar>

