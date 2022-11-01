<script lang="ts">
  import { onMount } from "svelte";

  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { Button } from "flowbite-svelte";

  import type { Match } from "../models/models";
  import type { StandingsPlayer } from "./standings/StandingPlayer";

  import PlayerComponent from "../components/player-component.svelte";
  import GameCard from "../components/game-card.svelte";

  let standings: StandingsPlayer[] = [];
  let matches: Match[] = [];

  onMount(async () => {
        await fetch('/matches.json')
          .then(response =>
            response.json() as Promise<any>
          )
          .then(
            (response: any) =>
              { 
                matches = response["matches"].slice(0,5);
              }
            );

        await fetch('/standings.json')
          .then(response =>
            response.json() as Promise<StandingsPlayer[]>
          )
          .then(
            (response: StandingsPlayer[]) =>
              { 
                standings = response.slice(0,5);
              }
            );
      }
    );
</script>



<div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-3">
  <div>
    <div class="px-2">
      <p class="text-2xl font-bold dark:text-white">Próximos partidos</p>
    </div>
    
    <div class="flex flex-row flex-wrap justify-evenly justify-self-center py-3">
      {#each matches as match}
        <div class="p-2 w-full">
          <GameCard {match}/>
        </div>
      {/each}
    </div>

    <div class="flex justify-center">
      <Button href='/matches'>Ver todos</Button>
    </div>
  </div>

  <div>
    <div class="px-2">
      <p class="text-2xl font-bold dark:text-white">Clasificación</p>
    </div>

    <div class="py-3">
      <Table>
        <TableHead theadClass="uppercase text-right text-xs">
          <TableHeadCell class="text-center">Jugador</TableHeadCell>
          <TableHeadCell>Puntos</TableHeadCell>
          <TableHeadCell>P. Ganados </TableHeadCell>
          <TableHeadCell>P. Perdidos</TableHeadCell>
        </TableHead>
        <TableBody class="divide-y">
          {#each standings as standingsPlayer}
            <TableBodyRow trClass="text-right">
              <TableBodyCell><PlayerComponent player={standingsPlayer.player}/></TableBodyCell>
              <TableBodyCell> {standingsPlayer.points } </TableBodyCell>
              <TableBodyCell> {standingsPlayer.games_won } </TableBodyCell>
              <TableBodyCell> {standingsPlayer.games_lost } </TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    </div>

    <div class="flex justify-center">
      <Button href='/standings'>Ver clasificación completa</Button>
    </div>
  </div>
</div>