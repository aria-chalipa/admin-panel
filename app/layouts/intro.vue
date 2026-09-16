<template>
  <div class="flex min-h-screen flex-col bg-gray-950">
    <header class="sticky top-0 z-10 border-b border-white/10 bg-gray-900/70 backdrop-blur-xl">
      <nav class="mx-auto flex max-w-5xl items-center justify-center gap-2 px-4 py-3">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 text-sm font-bold text-black shadow-lg shadow-yellow-400/20">
          A
        </div>
        <span class="text-lg font-semibold tracking-tight text-white">Admin Panel</span>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

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

</script>