<script lang="ts">
  import { onMount } from "svelte";

  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { Button } from "flowbite-svelte";

  import { DataLoadingStatus, type Match } from "../models/models";
  import type { StandingsPlayer } from "./standings/StandingPlayer";

  import PlayerComponent from "../components/player-component.svelte";
  import GameCard from "../components/game-card.svelte";
	import LoadableContent from "../components/loadableContent.svelte";

  let standings: StandingsPlayer[] = [];
  let matches: Match[] = [];

  let shortStandingsDataLoadingStatus:DataLoadingStatus = DataLoadingStatus.Loading;
  let shortMatchesDataLoadingStatus:DataLoadingStatus = DataLoadingStatus.Loading;


  async function reloadData(){
    shortStandingsDataLoadingStatus = DataLoadingStatus.Loading;
    shortMatchesDataLoadingStatus = DataLoadingStatus.Loading;

    await fetch('https://matches.dondanndy.workers.dev')
          .then(response =>
            response.json() as Promise<any>
          )
          .then(
            (response: any) =>
              { 
                matches = response["matches"].slice(0,4);
                shortMatchesDataLoadingStatus = DataLoadingStatus.Complete;
              }
            );

        await fetch('https://standings.dondanndy.workers.dev')
          .then(response =>
            response.json() as Promise<StandingsPlayer[]>
          )
          .then(
            (response: any) =>
              { 
                standings = response.standings.slice(0,10);
                shortStandingsDataLoadingStatus = DataLoadingStatus.Complete;
              }
            );
  }

  onMount(async () => { await reloadData(); });
</script>



<div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-3">
  <div>
    <div class="px-2">
      <p class="text-2xl font-bold dark:text-white">Próximos partidos</p>
    </div>
    <LoadableContent dataLoadingStatus={shortMatchesDataLoadingStatus}>
      <div class="flex flex-row flex-wrap justify-evenly justify-self-center py-3">
        {#each matches as match}
        <div class="p-2 w-full">
          <GameCard {match} on:gameInfoChanged={reloadData}/>
        </div>
        {/each}
      </div>
      
      <div class="flex justify-center">
        <Button href='/matches'>Ver todos</Button>
      </div>
    </LoadableContent>
  </div>

  <div>
    <div class="px-2">
      <p class="text-2xl font-bold dark:text-white">Clasificación</p>
    </div>

    <LoadableContent dataLoadingStatus={shortStandingsDataLoadingStatus}>
      <div class="py-3">
        <Table divClass="relative overflow-x-auto rounded-lg">
          <TableHead theadClass="uppercase text-right text-xs">
            <TableHeadCell></TableHeadCell>
            <TableHeadCell class="text-center">Jugador</TableHeadCell>
            <TableHeadCell>Puntos</TableHeadCell>
            <TableHeadCell>P. Ganados </TableHeadCell>
            <TableHeadCell>P. Perdidos</TableHeadCell>
          </TableHead>
          <TableBody class="divide-y">
            {#each standings as standingsPlayer}
              <TableBodyRow trClass="text-right">
                <TableBodyCell> <span class="font-bold text-current">{standingsPlayer.position} </span></TableBodyCell>
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
    </LoadableContent>
  </div>
</div>