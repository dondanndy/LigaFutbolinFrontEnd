<script lang="ts">
	import { Spinner } from "flowbite-svelte";
  import { DataLoadingStatus } from "../models/models";

  export let dataLoadingStatus: DataLoadingStatus;
</script>


{#if dataLoadingStatus == DataLoadingStatus.Loading}
  <div class="flex flex-col justify-center items-center h-48">
    <Spinner color="white"></Spinner>
  </div>
{:else}
  <slot/>
{/if}