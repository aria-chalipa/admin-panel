<template>
  <main class="mx-auto max-w-6xl space-y-6 px-4 py-8">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-white">Notes</h1>
      <p class="mt-1 text-sm text-gray-400">Personal notes and reminders</p>
      <button type="button" @click="handeleModal = true" class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">+ add note</button>
    </div>

    <div class="rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-xl backdrop-blur-xl">
      <p class="text-sm text-gray-400" v-if="notes.length === 0">No notes yet.</p>
      <ul v-else class="list-none space-y-3">
        <li v-for="note in notes" :key="note.id" class="rounded-lg border border-white/10 bg-gray-800/50 p-4 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-bold">{{ note.title }}</h2>
              <p>{{ note.content }}</p>
            </div>
            <button type="button" @click="deleteNote(note.id)" class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">delete</button>
          </div>
        </li>
      </ul>
      
    </div>

    <ModalCom v-model="handeleModal" @close="handeleModal = false">
      <template #title>Add Note</template>
      <template #body>
        <label class="block text-sm font-medium text-white">Title</label>
        <input type="text" v-model="newNoteTitle" class="w-full rounded-lg border border-white/10 bg-gray-800/70 p-2 text-white mt-4" />
        <label class="block text-sm font-medium text-white mt-4">Content</label>
        <textarea v-model="newNoteContent" class="w-full rounded-lg border border-white/10 bg-gray-800/70 p-2 text-white mt-4"></textarea>
      </template>
      <template #footer>
        <button @click="handeleModal = false" type="button" class="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">Cancel</button>
        <button @click="saveNote" type="button" class="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">Save</button>
      </template>
    </ModalCom>
    <AlertCom :visible="alertVisible"  :message="alertMessage" :time="3000" @close="alertVisible = false"/>
  </main>
</template>

<script lang="ts" setup>
import { ref , onMounted } from 'vue'
import axios from '~/axios/axios'
import { useUserStore, type User } from '~/stores/useUserStore'
import AlertCom from '~/components/AlertCom.vue'

interface Note {
  id: number
  title: string
  content: string
}

const handeleModal = ref(false)
const newNoteTitle = ref('')
const newNoteContent = ref('')
const store = useUserStore()
const user = ref<User>({})
const notes = ref<Note[]>([])
const alertVisible = ref(false)
const alertMessage = ref('')

async function addNote() {
   const response = await axios.post('/notes', {
     userId: user.value.id,
     title: newNoteTitle.value,
     content: newNoteContent.value
   })
   notes.value.push(response.data)
   alertMessage.value = 'Note added successfully'
   alertVisible.value = true
}

function saveNote() {
  addNote()
  handeleModal.value = false
  newNoteTitle.value = ''
  newNoteContent.value = ''
}

async function deleteNote(id: number) {
  await axios.delete(`/notes/${id}`)
  notes.value = notes.value.filter(note => note.id !== id)
  alertMessage.value = 'Note deleted successfully'
  alertVisible.value = true
}
async function getNotes() {
  const response = await axios.get(`/notes?userId=${user.value.id}`)
  notes.value = response.data
}
onMounted(async () => {
  const savedUser = localStorage.getItem('user')
  const parseUser = savedUser ? JSON.parse(savedUser) : null
  if (parseUser) {
    user.value = parseUser
    await getNotes()
  }
})

definePageMeta({
  layout: 'dashboard'
})
</script>
