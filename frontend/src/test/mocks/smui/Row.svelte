<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let { class: klass = '', ...rest } = ($props() as any);
</script>

<tr class={klass} role="row" {...rest}>
  <slot />
</tr>
