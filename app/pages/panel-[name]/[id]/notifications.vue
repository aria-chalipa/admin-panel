<template>
  <main class="mx-auto max-w-6xl space-y-6 px-4 py-8">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-white">Notifications</h1>
      <p class="mt-1 text-sm text-gray-400">Stay up to date with your account activity</p>
    </div>

    <div class="space-y-3">
      <NotificationCom
        v-for="notification in notifications"
        :key="notification.message + notification.time"
        :message="notification.message"
        :time="notification.time"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import NotificationCom from '~/components/NotificationCom.vue'

const notifications = [
  { message: 'Your profile was updated successfully', time: '2 minutes ago' },
  { message: 'New login detected from a new device', time: '1 hour ago' },
  { message: 'Weekly report is ready to view', time: 'Yesterday' }
]

definePageMeta({
  layout: 'dashboard'
})
</script>
