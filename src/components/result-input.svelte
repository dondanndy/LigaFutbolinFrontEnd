<script lang="ts">
  import { Input, NumberInput } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
	import { text } from "svelte/internal";

  const dispatch = createEventDispatcher();

  export let value: string|number|undefined;

  let textValue: string | undefined = value?.toString();
  let numericValue: number = 0;

  function isNumeric(value: string) {
    return /^\d+$/.test(value);
  }

  $:{
    if (textValue && !textValue.includes(".") && isNumeric(textValue))
      numericValue = parseInt(textValue);

    textValue = numericValue?.toString();
    value = numericValue ?? 0;
  }
</script>

<Input bind:value={textValue} type="number"></Input>