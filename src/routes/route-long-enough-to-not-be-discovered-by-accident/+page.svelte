<script lang="ts">
	import { onMount } from "svelte";

  onMount(async () => { 
    window.localStorage.setItem("edit", "true");
  });
</script>

<div class="flex flex-col justify-around text-center text-white h-80">
  <div class="text-2xl font-bold">
    Ahora puedes editar partidos desde este navegador.
  </div>
  
  <div>
    Recuerda que esta opción viene dada guardando una cookie en este navegador, así que la perderás si borras los datos de esta web. Deberás volver a esta página si quieres recuperarla.
  </div>

  <div>
    Usa tus poderes de forma responsable.
  </div>
</div>