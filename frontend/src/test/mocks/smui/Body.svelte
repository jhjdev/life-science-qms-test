<script lang="ts">
  import { setContext } from 'svelte';
  setContext('smui:data-table:inHead', false);
</script>

<tbody>
  <slot />
</tbody>
