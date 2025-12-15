<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let { class: klass = '', disabled = false, ...rest } = ($props() as any);
</script>

<button
  class={klass}
  disabled={disabled}
  {...rest}
  on:click={(e) => dispatch('click', e)}
>
  <slot />
</button>
