<template>
  <div class="flex min-h-screen flex-col bg-gray-950">
    <header class="sticky top-0 z-10 border-b border-white/10 bg-gray-900/70 backdrop-blur-xl">
      <nav class="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 text-sm font-bold text-black shadow-lg shadow-yellow-400/20">
            A
          </div>
          <span class="text-lg font-semibold tracking-tight text-white">Admin Panel</span>
        </div>

        <div class="flex items-center gap-1">
          <NuxtLink
            :to="homeLink"
            title="Home"
            aria-label="Home"
            class="rounded-lg p-2 text-gray-300 transition-colors hover:bg-gray-800/60 hover:text-yellow-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
            </svg>
          </NuxtLink>
          <NuxtLink
            :to="notificationsLink"
            title="Notifications"
            aria-label="Notifications"
            class="rounded-lg p-2 text-gray-300 transition-colors hover:bg-gray-800/60 hover:text-yellow-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
              <path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6Z" />
              <path d="M10 20a2 2 0 0 0 4 0" />
            </svg>
          </NuxtLink>
          <NuxtLink
            :to="settingsLink"
            title="Settings"
            aria-label="Settings"
            class="rounded-lg p-2 text-gray-300 transition-colors hover:bg-gray-800/60 hover:text-yellow-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
            </svg>
          </NuxtLink>
          <button
            type="button"
            @click="toggleTheme"
            :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
            :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
            class="rounded-lg p-2 text-gray-300 transition-colors hover:bg-gray-800/60 hover:text-yellow-400"
          >
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          </button>
        </div>
      </nav>
    </header>

    <div class="mx-auto flex w-full max-w-6xl flex-1 gap-6">
      <aside class="hidden w-48 shrink-0 border-r border-white/10 py-8 pl-4 pr-4 sm:block">
        <nav class="space-y-1">
          <NuxtLink
            :to="notesLink"
            class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800/60 hover:text-yellow-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
              <path d="M9 3h6l5 5v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
              <path d="M9 12h6M9 16h6M9 8h2" />
            </svg>
            Notes
          </NuxtLink>
          <NuxtLink
            :to="ticketsLink"
            class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800/60 hover:text-yellow-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
              <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z" />
              <path d="M14 6v12" stroke-dasharray="2 2" />
            </svg>
            Tickets
          </NuxtLink>
        </nav>
      </aside>

      <div class="min-w-0 flex-1">
        <slot />
      </div>
    </div>

     <footer class="border-t border-white/10 bg-gray-900/70 px-4 py-6 text-center text-sm text-gray-400">
      <p>Created by Aria Chalipa</p>
      <p class="mt-1">
        <a href="mailto:aria.chalipa.2002@gmail.com" class="text-yellow-400 hover:text-yellow-300">aria.chalipa.2002@gmail.com</a>
        <span class="mx-2 text-gray-600">&middot;</span>
        <a href="https://github.com/aria-chalipa" target="_blank" rel="noopener noreferrer" class="text-yellow-400 hover:text-yellow-300">github.com/aria-chalipa</a>
      </p>
    </footer>
  </div>
    
  
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/useUserStore'
import { computed, onMounted, ref } from 'vue'

const store = useUserStore()
const route = useRoute()
let name = '—'
onMounted(() => {
  name = store.user?.name || '—'

})

const panelBase = computed(() => `/panel-${route.params.name}/${route.params.id}`)
const homeLink = computed(() => panelBase.value)
const notificationsLink = computed(() => `${panelBase.value}/notifications`)
const settingsLink = computed(() => `${panelBase.value}/settings`)
const notesLink = computed(() => `${panelBase.value}/notes`)
const ticketsLink = computed(() => `${panelBase.value}/tickets`)

const isDark = ref(true)
function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

</script>

<style>

</style>