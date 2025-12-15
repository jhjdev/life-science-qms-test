declare module '*.svelte' {
  import type { ComponentType } from 'svelte';
  const component: ComponentType<Record<string, unknown>>;
  export default component;
}
