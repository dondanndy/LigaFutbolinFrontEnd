<script lang="ts">
  import { Button, Spinner } from "flowbite-svelte";

	import { createEventDispatcher } from "svelte";
  import ResultInput from "./result-input.svelte";
  import PlayerComponent from "./player-component.svelte";
  import type { Match, MatchResult } from "../models/models"
  
  export let match: Match;

  const dispatch = createEventDispatcher();

  function emitGameInfoChanged() {
    dispatch('gameInfoChanged');
  }

  let result: MatchResult;

  let isSaving: boolean = false;
  let isRemoving: boolean = false;

  const getResultToSend = () :any =>{
    let resultToSend: any = {};

    resultToSend.result = result;
    resultToSend.matchday = match.matchday;
    resultToSend.id = match.id;

    return resultToSend;
  }

  const saveResult = () => {
    const resultToSend =  getResultToSend();

    isSaving = true;

    fetch('https://update.dondanndy.workers.dev', {
      method: 'POST',
      body: JSON.stringify(resultToSend)
    }).then((res:any) =>{
      console.log(res);
      isSaving = false;

      emitGameInfoChanged();
    });
  }

  const removeResult = () => {
    const resultToSend =  getResultToSend();

    isRemoving = true;

    fetch('https://update.dondanndy.workers.dev/remove', {
      method: 'POST',
      body: JSON.stringify(resultToSend)
    }).then((res:any) =>{
      console.log(res);
      isRemoving = false;

      emitGameInfoChanged();
    });
  }
  
  $:{
    result = match.result || { team1: null, team2: null};

    if (result.team1 == null || result.team2 == null)
      result = { team1: 0, team2: 0};

    match.result = result;
  }
</script>

<div class="flex flex-col py-3">
  <div id="title" class="flex flex-row justify-items-start">
    <p class="text-2xl font-bold">
      Editar partido
    </p>
  </div>

  <div id="game" class="flex flex-col md:flex-row items-center py-5">
    <div class="flex flex-row md:flex-col justify-items-start w-full md:w-2/5 min-w-fit">

      <div class="py-1 md:hidden px-3 md:px-0 w-1/2">
        <PlayerComponent player={match.team1.player1} left={true}/>
      </div>

      <div class="py-1 hidden md:block md:px-0">
        <PlayerComponent player={match.team1.player1}/>
      </div>
      
      <div class="py-1 px-3 md:px-0">
        <PlayerComponent player={match.team1.player2}/>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-center content-center py-3 md:py-1">
      <div class="w-20 flex">
        <ResultInput bind:value={result.team1} />
      </div>
      
      <div class="text-3xl font-bold px-2 invisible md:visible">
        -
      </div>
      
      <div class="w-20 flex">
        <ResultInput bind:value={result.team2} />
      </div>
    </div>
    
    <div class="flex flex-row md:flex-col justify-items-end w-full md:w-2/5 min-w-fit">
      <div class="py-1 px-3 md:px-0 w-1/2 md:w-full">
        <PlayerComponent player={match.team2.player1} left={true}/>
      </div>
      
      <div class="py-1 hidden md:block md:grow">
        <PlayerComponent player={match.team2.player2} left={true}/>
      </div>

      <div class="py-1 md:hidden px-3 md:px-0">
        <PlayerComponent player={match.team2.player2}/>
      </div>
    </div>
  </div>

  <div id="buttons" class="flex justify-center space-x-3 md:mt-6">
    <span on:click|stopPropagation={saveResult}>
      <Button disbled={isSaving || isRemoving}>
        {#if isSaving}
          <Spinner class="mr-3" size="4" color="white" />
        {:else}
          Guardar
        {/if}
      </Button>
    </span>
    <Button color="light" class="dark:text-white">Descartar</Button>

   {#if match.result} 
    <span on:click|stopPropagation={removeResult}>
      <Button disbled={isSaving || isRemoving} color="red">
        {#if isRemoving}
          <Spinner class="mr-3" size="4" color="white" />
        {:else}
          Eliminar
        {/if}
      </Button>
    </span>
    {/if}
  </div>
</div>