<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Svelte 5 reserves `class` as a keyword in TS exports, so use $props() to read it.
  const dispatch = createEventDispatcher();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let { class: klass = '', style = '', disabled = false, ...rest } = ($props() as any);
</script>

<button
  class={klass}
  style={style}
  disabled={disabled}
  {...rest}
  on:click={(e) => dispatch('click', e)}
>
  <slot />
</button>
