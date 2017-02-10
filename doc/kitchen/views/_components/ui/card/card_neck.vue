<template>
  <aside class="card-neck">
    <slot></slot>
  </aside>
</template>

<style scoped>
  .card-neck { margin-bottom: 10px; }
  .card-neck > *:not(:first-child) { margin-left: 1px; }
</style>
