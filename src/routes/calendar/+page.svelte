<script lang="ts">
  import { onMount } from "svelte";

  import { AccordionItem, Accordion } from 'flowbite-svelte'

  import GameCard from "../../components/game-card.svelte";
	import ByeCard from "../../components/bye_card.svelte";
  import type { MatchDay } from "../../models/models";

  let calendar: MatchDay[] = [];

  async function reloadCalendar(){
    await fetch('https://calendar.dondanndy.workers.dev')
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

  onMount(async () => { await reloadCalendar(); });
</script>

<Accordion multiple>
  {#each calendar as matchday}
    <AccordionItem>
      <span slot="header">Jornada {matchday.matchday} - {(new Date(matchday.date)).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      
      <div id={`matches-${matchday.matchday}`} class="flex flex-row flex-wrap justify-evenly justify-self-center">
        {#each matchday.matches as match}
          <div class="p-2 w-full md:w-1/2">
            <GameCard {match} on:gameInfoChanged={reloadCalendar}/>
          </div>
        {/each}
      </div>

      {#if matchday.bye_players}
        <div class="p-2 flex justify-center">
          <span class="w-full md:w-4/5">
            <ByeCard bye_players={matchday.bye_players}/>
          </span>
        </div>
      {/if}
    </AccordionItem>
  {/each}
</Accordion>


