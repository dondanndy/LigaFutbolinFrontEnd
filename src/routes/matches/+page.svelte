<script lang="ts">
  import { onMount } from "svelte";

  import PlayerPicker from "../../components/player-picker.svelte";
  import GameCard from "../../components/game-card.svelte";
  import type { Match } from "../../models/models";

  let matches: Match[] = [];
  let filteredMatches: Match[] = [];

  let selectedPlayerID: string;

  async function reloadData(){
    await fetch('https://matches.dondanndy.workers.dev')
          .then(response =>
            response.json() as Promise<any>
          )
          .then(
            (response: any) =>
              { 
                matches = response["matches"];
              }
            );
  }

  onMount(async () => { await reloadData(); });

  $:
      if (selectedPlayerID){
        filteredMatches = matches.filter(
          (match: Match) =>
            match.team1.player1.id === selectedPlayerID ||
            match.team1.player2.id === selectedPlayerID ||
            match.team2.player1.id === selectedPlayerID ||
            match.team2.player2.id === selectedPlayerID
          )
      }
      else
        filteredMatches = matches;
</script>

<div class="flex justify-center">
  <span class="w-1/2">
    <PlayerPicker on:selectedPlayer={(event) => selectedPlayerID = event.detail.id} />
  </span>
</div>

<div class="flex flex-row flex-wrap justify-evenly justify-self-center">
  {#each filteredMatches as match}
    <div class="p-2 w-full md:w-1/2">
      <GameCard {match} on:gameInfoChanged={reloadData}/>
    </div>
  {/each}
</div>