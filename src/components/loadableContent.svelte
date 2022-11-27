<script lang="ts">
  import { fade } from 'svelte/transition';
  import { quartInOut } from 'svelte/easing';

	import { Spinner } from "flowbite-svelte";
  import { DataLoadingStatus } from "../models/models";

  export let dataLoadingStatus: DataLoadingStatus;
</script>


{#if dataLoadingStatus == DataLoadingStatus.Loading}
  <div class="flex flex-col justify-center items-center h-48"
    out:fade="{{ duration: 150, easing:quartInOut }}" 
  >
    <Spinner color="white"></Spinner>
  </div>
{:else}
  <div
    in:fade="{{ duration: 250, delay: 150, easing:quartInOut }}"
    >
    <slot/>
  </div>
{/if}