<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | admin panel` : `admin panel`
  }
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>