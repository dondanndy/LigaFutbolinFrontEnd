<script>
  import '../app.postcss';

  import { fade } from 'svelte/transition';

  import Navbar from "../components/navbar.svelte";
</script>

<div class="w-full md:h-24 dark:bg-slate-800">
  <div class="lg:max-w-screen-xl mx-auto md:pt-4">
      <Navbar/>
    </div>
</div>

<div class="max-w-full lg:max-w-screen-xl mx-auto py-4"
  in:fade="{{ duration: 2500 }}"
  out:fade="{{ duration: 2500 }}" 
>
  <slot/>
</div>
