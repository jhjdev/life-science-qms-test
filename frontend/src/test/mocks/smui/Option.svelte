<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let { value = null, ...rest } = ($props() as any);
</script>

<div class="mdc-deprecated-list-item" data-value={value} {...rest}>
  <slot />
</div>
