<script lang="ts">
  import { Avatar } from "flowbite-svelte";

  import type { Player } from "../models/models"

  export let player: Player;
  export let left: boolean = false;
</script>

<div class="flex flex-row" class:justify-end="{left}">
  {#if !left}
    <div class="flex justify-end items-center w-1/3 min-w-fit max-w-fit pr-1">
        <Avatar src={player.avatar} alt={`${player.name} ${player.surname} avatar`} size="xs"/>
    </div>
  {/if}

  <div class="flex flex-row flex-wrap w-full" class:justify-end="{left}">
    <span class="px-1 font-normal">{player.name}</span>
    <span class="px-1 font-bold">{player.surname}</span>
  </div>

  {#if left}
    <div class="flex justify-begin items-center w-1/3 max-w-fit pl-1">
      <Avatar src={player.avatar} alt={`${player.name} ${player.surname} avatar`} size="xs"/>
    </div>
  {/if}
</div>