<script lang="ts">
  import { onMount, createEventDispatcher} from 'svelte';

  import { Button, ButtonGroup, Dropdown, DropdownItem, Input } from 'flowbite-svelte'
  
  import type { Player } from '../models/models'
	import PlayerComponent from './player-component.svelte';

  const dispatch = createEventDispatcher();

  let allPlayers:  Player[] = [];
  let filteredPlayers: Player[] = [];

  let textSearched: string;
  let dropdownOpen: boolean = false;

  onMount(async () => {
        await fetch('/players.json')
          .then(response =>
            response.json() as Promise<any>
          )
          .then(
            (response: any) =>
              { 
                allPlayers = response["players"];
              }
            );
      }
    );

  function getCompletePlayerName(player: Player): string {
    return `${player.name} ${player.surname}`
  }

  function emitSelectedPlayer(selectedPlayer: Player|null) {
    dispatch('selectedPlayer', { id: selectedPlayer?.id });
  }

  function onPlayerSelected(selectedPlayer: Player|null): void {
    emitSelectedPlayer(selectedPlayer);
    
    if (selectedPlayer != null)
      textSearched = getCompletePlayerName(selectedPlayer);

    dropdownOpen = false;
  }

  $: {
    if (textSearched){
      filteredPlayers = allPlayers.filter((player : Player) => {
        return player.name.includes(textSearched) || player.surname.includes(textSearched) || getCompletePlayerName(player).includes(textSearched);
      });
    }
    else {
      filteredPlayers = allPlayers;
    }
    
    dropdownOpen = (textSearched != null && textSearched !== "") && filteredPlayers.length > 0;
  }
</script>

<div>
  <Input id="search" placeholder="Filtrar por jugador" size="md" type="text"
  bind:value={textSearched}
  on:change={(e) =>  { if (e.target?.value === "") onPlayerSelected(null); }}
  on:blur={() => { dropdownOpen = false}}
  >
    <svg slot="left" aria-hidden="true" class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  </Input>
  
  <Dropdown class="w-96 overflow-y-auto py-1 max-h-48" bind:open={dropdownOpen} on:keydown={() => {dropdownOpen}}>
    {#each filteredPlayers as player}
    <DropdownItem>
      <span on:mousedown={ () => {onPlayerSelected(player) }}>
        <PlayerComponent {player}/>
      </span>
    </DropdownItem>
    {/each}
  </Dropdown>
</div>