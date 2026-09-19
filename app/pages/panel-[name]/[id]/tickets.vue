<template>
  <main class="mx-auto max-w-6xl space-y-6 px-4 py-8">
    <AlertCom :message="alertMessage" :visible="handelAlert" :time="3000" @close="handelAlert = false" />
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-white">Tickets</h1>
      <p class="mt-1 text-sm text-gray-400">Support requests and issues</p>
      <button type="button" @click="handeleModal = true" class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">+ add ticket</button>
    </div>

    <div class="rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-xl backdrop-blur-xl">
      <p class="text-sm text-gray-400" v-if="admins.length === 0">No tickets yet.</p>
      <ul v-else class="list-none space-y-4">
        <li v-for="admin in admins" :key="admin.id" class="rounded-lg border border-white/10 bg-gray-800/50 p-4">
          <p class="font-semibold text-white">{{ admin.field }} tickets</p>
          <p v-if="admin.requests.length === 0" class="mt-2 text-sm text-gray-400">No tickets yet.</p>
          <ul v-else class="mt-2 list-none space-y-2 border-l border-white/10 pl-4">
            <li v-for="request in admin.requests" :key="request.content" class="text-sm text-gray-300">
              {{ request.content }}
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <ModalCom v-model="handeleModal" @close="handeleModal = false">
      <template #title>
        add ticket
      </template>
      <template #body>
        <div>
          select an option
          <select v-model="selectedOption" class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-black">
            <option v-for="admin in admins" :key="admin.id" :value="admin.field">{{ admin.field }}</option>
          </select>
        </div>
        <div v-if="selectedOption">
          <p>your {{ selectedOption }} issue</p>
          <textarea v-model="issueContent" placeholder="Describe your issue" name="issue" id="" class="text-black mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
        </div>
      </template>
      <template #footer>
        <button @click="handeleModal = false" type="button" class="rounded-lg border border-white/10 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-800">Cancel</button>
        <button @click="submitIssue" type="button" class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Submit</button>
      </template>
    </ModalCom>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import AlertCom from '~/components/AlertCom.vue'
import type { User } from '~/stores/useUserStore'


interface Admin {
  id: string
  name: string
  field: string
  role: string
  requests: unknown[]
}

const handeleModal = ref(false)
const selectedOption = ref('')
const issueContent = ref('')
const admins = ref<Admin[]>([])
const user = ref<User | null>(null)
const selectedAdmin = ref('')
const handelAlert = ref(false)
const alertMessage = ref('')


async function getAdmins(){
  admins.value = await $fetch<Admin[]>('http://localhost:3002/admins')
}

watch(selectedOption, (field) => {
  const findAdmin = admins.value.find(admin => admin.field === field)
  selectedAdmin.value = findAdmin ? findAdmin.id : ''
})

async function sendIssue(){
  const payload = {
    option: selectedOption.value,
    content: issueContent.value,
    user: user.value,
    admin: selectedAdmin.value
  }
  const admin = await $fetch<Admin>('/admins/' + selectedAdmin.value, {
    baseURL: 'http://localhost:3002'
  })
  try {await $fetch('/admins/' + selectedAdmin.value, {
    method: 'PATCH',
    baseURL: 'http://localhost:3002',
    body: { requests: [...admin.requests, payload] }
  })
  } catch (error) {
    console.error('Failed to send issue:', error)
    alertMessage.value = 'Failed to send issue'
    handelAlert.value = true  
  }
}


async function submitIssue(){
  await sendIssue()
  handeleModal.value = false
  selectedOption.value = ''
  issueContent.value = ''
  alertMessage.value = 'Issue submitted successfully'
  handelAlert.value = true
}

onMounted(async ()=>{
  const savedUser = localStorage.getItem('user')
  const parseUser = savedUser ? JSON.parse(savedUser) : null
  if (parseUser) {
    user.value = parseUser
  }
  await getAdmins()
})

definePageMeta({
  layout: 'dashboard'
})
</script>
