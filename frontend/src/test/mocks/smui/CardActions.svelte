<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let { class: klass = '', style = '', ...rest } = ($props() as any);
</script>

<div class={klass} style={style} {...rest}>
  <slot />
</div>
