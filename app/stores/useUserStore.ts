import { ref } from '#imports'
import { defineStore } from 'pinia'

interface User {
  id?: number
  name?: string
  lastName?: string  
  email?: string
  password?: string
  token?: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({})
  const token = useCookie('token')

   function setUser(newUser: User) {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
    token.value = newUser.token ? newUser.token : ''
  }

  function clearUser() {
    user.value = {}
    localStorage.removeItem('user')
    token.value = null
  }



  return { user, setUser, clearUser }
})
