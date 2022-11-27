<script lang="ts">
  import { Avatar } from "flowbite-svelte";

  import type { Player } from "../models/models"

  export let player: Player;
  export let left: boolean = false;

  const IMG_ROUTE = "useravatar"
</script>

<div class="flex flex-row items-center" class:justify-end="{left}">
  {#if !left}
    <div class="flex justify-end items-center w-1/3 min-w-fit max-w-fit pr-1">
        <Avatar src={`${IMG_ROUTE}/${player.id}.jpg`} alt={`${player.name} ${player.surname} avatar`} size="xs"/>
    </div>
  {/if}

  <div class="flex flex-row flex-wrap w-full px-1" class:justify-end="{left}">
    <span class="font-normal">{player.name}</span>
    &nbsp;
    <span class="font-bold">{player.surname}</span>
  </div>

  {#if left}
    <div class="flex justify-begin items-center w-1/3 min-w-fit max-w-fit pl-1">
      <Avatar src={`${IMG_ROUTE}/${player.id}.jpg`} alt={`${player.name} ${player.surname} avatar`} size="xs"/>
    </div>
  {/if}
</div>