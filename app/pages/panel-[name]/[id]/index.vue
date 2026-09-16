<template>
    <main class="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
        <p class="mt-1 text-sm text-gray-400">Overview of your account and activity</p>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-2xl border border-white/10 bg-gray-900/70 p-5 shadow-xl backdrop-blur-xl">
          <p class="text-sm text-gray-400">Account name</p>
          <p class="mt-1 truncate text-xl font-semibold text-white">{{ user.name }}</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-gray-900/70 p-5 shadow-xl backdrop-blur-xl">
          <p class="text-sm text-gray-400">Email</p>
          <p class="mt-1 truncate text-xl font-semibold text-white">{{ user.email }}</p>
        </div>
      </div>

      <div class="rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-xl backdrop-blur-xl">
        <h2 class="text-lg font-semibold text-white">Cash flow</h2>
        <p class="text-sm text-gray-400">Monthly amount overview</p>

        <div class="mt-6 flex h-48 items-end gap-3">
          <div
            v-for="month in chartData"
            :key="month.label"
            class="flex flex-1 flex-col items-center gap-2"
          >
            <div class="flex h-36 w-full items-end overflow-hidden rounded-md bg-gray-800/60">
              <div
                class="w-full rounded-md bg-yellow-400 shadow-lg shadow-yellow-400/20 transition-all"
                :style="{ height: `${(month.amount / maxAmount) * 100}%` }"
              ></div>
            </div>
            <span class="text-xs text-gray-400">{{ month.label }}</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div class="rounded-xl border border-white/10 bg-gray-800/60 p-4">
            <p class="text-sm text-gray-400">Income</p>
            <p class="mt-1 text-xl font-semibold text-green-400">${{ income.toLocaleString() }}</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-gray-800/60 p-4">
            <p class="text-sm text-gray-400">Spending</p>
            <p class="mt-1 text-xl font-semibold text-red-400">${{ spending.toLocaleString() }}</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-gray-800/60 p-4">
            <p class="text-sm text-gray-400">Balance</p>
            <p class="mt-1 text-xl font-semibold text-yellow-400">${{ balance.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-xl backdrop-blur-xl">
        <h2 class="text-lg font-semibold text-white">Profile</h2>
        <dl class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt class="text-sm text-gray-400">First name</dt>
            <dd class="mt-1 text-gray-100">{{ user.name || '—' }}</dd>
          </div>
          <div>
            <dt class="text-sm text-gray-400">Last name</dt>
            <dd class="mt-1 text-gray-100">{{ user.lastName || '—' }}</dd>
          </div>
          <div>
            <dt class="text-sm text-gray-400">Email</dt>
            <dd class="mt-1 text-gray-100">{{ user.email || '—' }}</dd>
          </div>
        </dl>
      </div>
    </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const user = ref({})

const chartData = [
  { label: 'Jan', amount: 1200, income: 2000, spending: 800 },
  { label: 'Feb', amount: 1900, income: 2400, spending: 500 },
  { label: 'Mar', amount: 900, income: 1800, spending: 900 },
  { label: 'Apr', amount: 1500, income: 2100, spending: 600 },
  { label: 'May', amount: 2200, income: 2800, spending: 600 },
  { label: 'Jun', amount: 1700, income: 2300, spending: 600 }
]

const maxAmount = computed(() => Math.max(...chartData.map((month) => month.amount)))
const income = computed(() => chartData.reduce((total, month) => total + month.income, 0))
const spending = computed(() => chartData.reduce((total, month) => total + month.spending, 0))
const balance = computed(() => income.value - spending.value)

onMounted(() => {
  const savedUser = localStorage.getItem('user')
  const parseUser = savedUser ? JSON.parse(savedUser) : null
  if (parseUser) {
    user.value = parseUser
  }
})

definePageMeta({
  layout: 'dashboard'
})
</script>
