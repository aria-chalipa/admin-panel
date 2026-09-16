<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | admin panel` : `admin panel`
  }
})
</script>

<template>
  <NuxtLayout>
  <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.layout-enter-active, .layout-leave-active {
  transition: opacity 0.5s, filter 0.5s;
}
.layout-enter, .layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>