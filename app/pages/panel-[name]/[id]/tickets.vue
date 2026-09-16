<template>
  <main class="mx-auto max-w-6xl space-y-6 px-4 py-8">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-white">Tickets</h1>
      <p class="mt-1 text-sm text-gray-400">Support requests and issues</p>
    </div>

    <div class="rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-xl backdrop-blur-xl">
      <p class="text-sm text-gray-400">No tickets yet.</p>
    </div>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
})
</script>
