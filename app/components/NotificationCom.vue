<template>
  <div class="flex items-start gap-3 rounded-xl border border-white/10 bg-gray-900/70 p-4 shadow-lg shadow-black/20 backdrop-blur-xl">
    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-400/10 text-yellow-400">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
        <path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6Z" />
        <path d="M10 20a2 2 0 0 0 4 0" />
      </svg>
    </div>
    <div class="min-w-0">
      <p class="text-sm text-gray-100">{{ message }}</p>
      <p class="mt-1 text-xs text-gray-400">{{ time }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  message?: string
  time?: string
}>(), {
  message: 'You have a new notification',
  time: 'Just now'
})
</script>
