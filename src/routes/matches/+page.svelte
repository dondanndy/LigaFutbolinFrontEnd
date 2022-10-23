<script lang="ts">
  import { onMount } from "svelte";

  import GameCard from "../../components/game-card.svelte";
  import type { Match } from "../../models/models";

  let matches: Match[] = [];

  onMount(async () => {
        await fetch('/matches.json')
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
    );
</script>

<div class="flex flex-row flex-wrap justify-evenly justify-self-center">
  {#each matches as match}
    <div class="p-2 w-full md:w-1/2">
      <GameCard {match}/>
    </div>
  {/each}
</div>