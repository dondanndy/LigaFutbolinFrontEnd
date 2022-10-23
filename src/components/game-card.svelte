<script lang="ts">
  import { Card } from "flowbite-svelte";

  import PlayerComponent from "./player-component.svelte";
  import type { Match } from "../models/models"
  
  export let match: Match;

</script>

<div class="w-full">
<Card size="xl" class="{match.result ? 'dark:bg-slate-900' : 'dark:bg-slate-800'}">
  <div class="flex flex-row items-center">
    <div class="flex flex-col justify-items-start w-2/5">
      <div class="py-1">
        <PlayerComponent player={match.team1.player1}/>
      </div>
      
      <div class="py-1">
        <PlayerComponent player={match.team1.player2}/>
      </div>
    </div>
    
    <div class="text-3xl font-bold min-w-fit w-1/5 flex justify-center">
      {#if match.result}
      <div class="break-keep">
        {match.result.team1} - {match.result.team2}
      </div>
      {:else}
      vs
      {/if}
    </div>
    
    <div class="flex flex-col justify-items-end w-2/5">
      <div class="py-1">
        <PlayerComponent player={match.team2.player1} left={true}/>
      </div>
      
      <div class="py-1">
        <PlayerComponent player={match.team2.player2} left={true}/>
      </div>
    </div>
  </div>
</Card>
</div>
