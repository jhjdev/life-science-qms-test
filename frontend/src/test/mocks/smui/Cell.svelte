<script lang="ts">
  import { createEventDispatcher, getContext } from 'svelte';

  const dispatch = createEventDispatcher();
  const inHead = getContext<boolean>('smui:data-table:inHead') ?? false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let { class: klass = '', ...rest } = ($props() as any);
</script>

{#if inHead}
  <th
    class={klass}
    role="columnheader"
    {...rest}
    on:click={(e) => dispatch('click', e)}
  >
    <slot />
  </th>
{:else}
  <td class={klass} role="cell" {...rest} on:click={(e) => dispatch('click', e)}>
    <slot />
  </td>
{/if}
