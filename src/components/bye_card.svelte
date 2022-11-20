<script lang="ts">
  import { Card} from "flowbite-svelte";

  import PlayerComponent from "./player-component.svelte";
  import type { Player } from "../models/models"
  
  export let bye_players: Player[];
</script>


<Card size="xl">
  <div class="flex flex-row justify-center">
    <span class="italic px-3">
      Descansa:
    </span>
    
    {#each bye_players as player}
    <span>
      <PlayerComponent {player}/>
    </span>
    {/each}
  </div>
</Card>