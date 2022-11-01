<script lang="ts">
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

  import {onMount} from 'svelte';
  import type { StandingsPlayer } from "./StandingPlayer";

  import PlayerComponent from "../../components/player-component.svelte";


  let standings: StandingsPlayer[] = [];

  onMount(async () => {
        await fetch('/standings.json')
          .then(response =>
            response.json() as Promise<StandingsPlayer[]>
          )
          .then(
            (response: StandingsPlayer[]) =>
              { 
                standings = response;
              }
            );
      }
    );
</script>

<Table>
  <TableHead theadClass="uppercase text-right text-xs">
    <TableHeadCell class="text-center">Jugador</TableHeadCell>
    <TableHeadCell>Puntos</TableHeadCell>
    <TableHeadCell>P. Jugados </TableHeadCell>
    <TableHeadCell>P. Ganados </TableHeadCell>
    <TableHeadCell>P. Perdidos</TableHeadCell>
    <TableHeadCell>Goles Favor</TableHeadCell>
    <TableHeadCell>Goles Contra</TableHeadCell>
  </TableHead>
  <TableBody class="divide-y">
    {#each standings as standingsPlayer}
      <TableBodyRow trClass="text-right">
        <TableBodyCell><PlayerComponent player={standingsPlayer.player}/></TableBodyCell>
        <TableBodyCell> {standingsPlayer.points } </TableBodyCell>
        <TableBodyCell> {standingsPlayer.games_played }</TableBodyCell>
        <TableBodyCell> {standingsPlayer.games_won } </TableBodyCell>
        <TableBodyCell> {standingsPlayer.games_lost } </TableBodyCell>
        <TableBodyCell> {standingsPlayer.goals_for } </TableBodyCell>
        <TableBodyCell> {standingsPlayer.goals_against } </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
