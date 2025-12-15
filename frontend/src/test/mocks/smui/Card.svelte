<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let { class: klass = '', style = '', 'data-testid': dataTestId, ...rest } = ($props() as any);
</script>

<div class={klass} style={style} data-testid={dataTestId} {...rest}>
  <slot />
</div>
