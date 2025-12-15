<script lang="ts">
  import { setContext } from 'svelte';
  setContext('smui:data-table:inHead', true);
</script>

<thead>
  <slot />
</thead>
