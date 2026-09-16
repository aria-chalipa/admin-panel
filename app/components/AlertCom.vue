<template>
  <Teleport to="body">
      <Transition  name="fade">
    <div
      v-if="props.visible"
      class="fixed top-4 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 items-start gap-3 rounded-xl border border-yellow-400/30 bg-gray-900/70 p-4 shadow-lg shadow-black/20 backdrop-blur-xl"
    >
      <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-400/10 text-yellow-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
          <path d="M12 9v4M12 17h.01" />
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        </svg>
      </div>

      <p class="min-w-0 flex-1 pt-1.5 text-sm text-gray-100">{{ message }}</p>

      <button
        type="button"
        aria-label="Close"
        title="Close"
        @click="close"
        class="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-800/60 hover:text-yellow-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'

const props = withDefaults(defineProps<{
  message?: string
  time?: number
  visible?: boolean
}>(), {
  message: 'This is an alert message',
  time: 0,
  visible: false
})

const emit = defineEmits(['close'])

let timer: ReturnType<typeof setTimeout> | null = null

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function close() {
  clearTimer()
  emit('close')
}

watch(
  () => props.visible,
  (isVisible) => {
    clearTimer()
    if (isVisible && props.time > 0) {
      timer = setTimeout(close, props.time)
    }
  },
  { immediate: true }
)

onBeforeUnmount(clearTimer)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
