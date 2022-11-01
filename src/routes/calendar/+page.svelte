<script lang="ts">
  import { onMount } from "svelte";

  import { AccordionItem, Accordion } from 'flowbite-svelte'

  import GameCard from "../../components/game-card.svelte";
  import type { Match } from "../../models/models";

  interface MatchDay {
    matchday: number,
    matches: Match[]
  }

  let calendar: MatchDay[] = [];

  onMount(async () => {
        await fetch('/calendar.json')
          .then(response =>
            response.json() as Promise<any>
          )
          .then(
            (response: any) =>
              { 
                calendar = response["matchdays"];
              }
            );
      }
    );
</script>

<Accordion multiple>
  {#each calendar as matchday}
    <AccordionItem>
      <span slot="header">Jornada {matchday.matchday}</span>
      
      <div id={`matches-${matchday.matchday}`} class="flex flex-row flex-wrap justify-evenly justify-self-center">
        {#each matchday.matches as match}
          <div class="p-2 w-full md:w-1/2">
            <GameCard {match}/>
          </div>
        {/each}
      </div>
    </AccordionItem>
  {/each}
</Accordion>


