<template>
  <main class="mx-auto max-w-6xl space-y-6 px-4 py-8">
    <AlertCom :visible="alertVisible"  :message="alertMessage" :time="3000" @close="alertVisible = false"/>
  
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-white">Settings</h1>
      <p class="mt-1 text-sm text-gray-400">Manage your account preferences</p>
    </div>

    <div class="rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-xl backdrop-blur-xl">
      <input type="text" name="name" v-model="user.name" @change="handelChangeUser($event)" :placeholder="user.name" class="w-full rounded-lg border border-white/10 bg-gray-800/70 p-2 text-white" />
      <input type="text" name="lastName" v-model="user.lastName" @change="handelChangeUser($event)" :placeholder="user.lastName" class="w-full rounded-lg border border-white/10 bg-gray-800/70 p-2 text-white mt-4" />
      <input type="email" name="email" v-model="user.email" @change="handelChangeUser($event)" :placeholder="user.email" class="w-full rounded-lg border border-white/10 bg-gray-800/70 p-2 text-white mt-4" />
      <button @click="handeleModal = true" type="button" class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">change password</button>
      <button @click="saveChanges" class="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">save changes</button>
    </div>

     <ModalCom v-model="handeleModal">
        <template #title>Change Password</template>
        <template #body>
          <label class="block text-sm font-medium text-white">enter your current password</label>
          <input 
                type="text" 
                @change="handelPassword"
                v-model="password" 
                :class="isPassword ?  'border border-green-400' : 'border border-red-600'"
                class="w-full rounded-lg  bg-gray-800/70 p-2 text-white mt-4 "  />
          <label class="block text-sm font-medium text-white mt-4">enter your new password</label>
          <input type="password" v-model="newPassword" :disabled="!isPassword" class="w-full rounded-lg border border-white/10 bg-gray-800/70 p-2 text-white mt-4" />
          <label class="block text-sm font-medium text-white mt-4">confirm your new password</label>
          <input type="password" v-model="confirmNewPassword" :disabled="!isPassword" class="w-full rounded-lg border border-white/10 bg-gray-800/70 p-2 text-white mt-4" />
        </template>
        <template #footer>
          <button @click="handeleModal = false" type="button" class="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">Cancel</button>
          <button @click="handelNewPassword()" type="button" class="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">Save</button>
        </template>
     </ModalCom>
</main>
</template>

<script lang="ts" setup>
import AlertCom from '~/components/AlertCom.vue'
import { ref, onMounted } from 'vue'
import axios from '~/axios/axios'

const alertVisible = ref(false)
const alertMessage = ref('')
const user = ref({})
const store = useUserStore()
const handeleModal = ref(false)
const password = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')
const isPassword = ref(false)

async function handelChangeUser(e: Event) {
    const target = e.target as HTMLInputElement
  if(target.name == 'name') {
    user.value.name = target.value
  }
  if(target.name == 'lastName') {
    user.value.lastName = target.value
  }
  if(target.name == 'email') {
    user.value.email = target.value
  }
  store.setUser(user.value)
  saveChanges()
  await handelUserFetch()
}

function saveChanges() {
  store.setUser(user.value)
  alertMessage.value = 'Profile saved successfully'
  alertVisible.value = true
}

function handelPassword(){
  if(user.value.password == password.value){
    isPassword.value = true
  }else {
    isPassword.value = false
  }
}

async function handelNewPassword(){
  if(newPassword.value === confirmNewPassword.value){
    user.value.password = newPassword.value
    store.setUser(user.value)
    await handelUserFetch()
    handeleModal.value = false
    alertMessage.value = 'Password changed successfully'
    alertVisible.value = true
  }else {
    alertMessage.value = 'New password and confirm password do not match'
    alertVisible.value = true
  }
  user.value.password = ''
  newPassword.value = ''
  confirmNewPassword.value = ''
}

async function handelUserFetch(){
  try {
    await axios.put(`/users/${user.value.id}`, {

      name: user.value.name,
      lastName: user.value.lastName,
      email: user.value.email,
      password: user.value.password
    } )
  }catch (error) {
    console.error(error)
  }
}
watch(password, ()=>{
  handelPassword()
})

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
