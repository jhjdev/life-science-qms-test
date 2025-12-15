<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // Bindable prop (so callers can do bind:value=...)
  // NOTE: In Svelte 5, $bindable() must be used directly in a $props() declaration.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let {
    value = $bindable(''),
    type = 'text',
    disabled = false,
    required = false,
    placeholder,
    name,
    id,
    class: klass = '',
    style = '',
    'data-testid': dataTestId,
    'aria-label': ariaLabel,
    ...rest
  } = ($props() as any);
</script>

<!--
  Many tests expect SMUI Textfield to render a wrapper element that carries data-testid,
  and a nested native <input>.
-->
<div class={klass} style={style} data-testid={dataTestId}>
  <input
    bind:value
    {type}
    {disabled}
    {required}
    {placeholder}
    {name}
    {id}
    aria-label={ariaLabel}
    {...rest}
    on:keydown={(e) => dispatch('keydown', e)}
  />
</div>
