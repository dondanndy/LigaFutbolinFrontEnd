<script lang="ts">
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

  import {onMount} from 'svelte';
  import type { StandingsPlayer } from "./StandingPlayer";

  import PlayerComponent from "../../components/player-component.svelte";

	import LoadableContent from '../../components/loadableContent.svelte';
	import { DataLoadingStatus } from '../../models/models';

  interface StandingsResponse {
    standings: StandingsPlayer[]
  }

  let standings: StandingsPlayer[] = [];

  let dataLoadingStatus = DataLoadingStatus.Loading;

  onMount(async () => {
    dataLoadingStatus = DataLoadingStatus.Loading;

        await fetch('https://standings.dondanndy.workers.dev')
          .then(response =>
            response.json() as Promise<StandingsResponse>
          )
          .then(
            (response: StandingsResponse) =>
              { 
                standings = response.standings;
                dataLoadingStatus = DataLoadingStatus.Complete;
              }
            );
      }
    );
</script>

<LoadableContent {dataLoadingStatus}>  
  <Table divClass="relative overflow-x-auto rounded-lg">
    <TableHead theadClass="uppercase text-right text-xs">
      <TableHeadCell></TableHeadCell>
      <TableHeadCell class="text-center">Jugador</TableHeadCell>
      <TableHeadCell>Puntos</TableHeadCell>
      <TableHeadCell>P. Jugados </TableHeadCell>
      <TableHeadCell>P. Ganados </TableHeadCell>
      <TableHeadCell>P. Perdidos</TableHeadCell>
      <TableHeadCell>Goles Favor</TableHeadCell>
      <TableHeadCell>Goles Contra</TableHeadCell>
      <TableHeadCell>Diferencia goles</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
      {#each standings as standingsPlayer}
      <TableBodyRow trClass="text-right">
        <TableBodyCell> <span class="font-bold text-lg">{standingsPlayer.position} </span></TableBodyCell>
        <TableBodyCell><PlayerComponent player={standingsPlayer.player}/></TableBodyCell>
        <TableBodyCell> {standingsPlayer.points } </TableBodyCell>
        <TableBodyCell> {standingsPlayer.games_played }</TableBodyCell>
        <TableBodyCell> {standingsPlayer.games_won } </TableBodyCell>
        <TableBodyCell> {standingsPlayer.games_lost } </TableBodyCell>
        <TableBodyCell> {standingsPlayer.goals_for } </TableBodyCell>
        <TableBodyCell> {standingsPlayer.goals_against } </TableBodyCell>
        <TableBodyCell> {standingsPlayer.goals_difference } </TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</LoadableContent>
