<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // NOTE: In Svelte 5, $bindable() must be used directly in a $props() declaration.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let {
    value = $bindable(''),
    disabled = false,
    class: klass = '',
    style = '',
    'data-testid': dataTestId,
    ...rest
  } = ($props() as any);

  let open = false;

  function toggleOpen() {
    if (disabled) return;
    open = !open;
  }

  function onMenuClick(e: MouseEvent) {
    const target = e.target as HTMLElement | null;
    const item = target?.closest?.('.mdc-deprecated-list-item') as HTMLElement | null;
    const nextValue = item?.getAttribute('data-value');
    if (nextValue == null) return;

    value = nextValue;
    open = false;
    dispatch('change', e);
  }
</script>

<div class={klass} style={style} data-testid={dataTestId} {...rest}>
  <div
    class="mdc-select__anchor"
    aria-disabled={disabled ? 'true' : 'false'}
    on:click={toggleOpen}
  >
    <span class="mdc-select__selected-text">{value}</span>
  </div>

  {#if open}
    <div class="mdc-select__menu">
      <div class="mdc-deprecated-list" on:click={onMenuClick}>
        <slot />
      </div>
    </div>
  {/if}
</div>
