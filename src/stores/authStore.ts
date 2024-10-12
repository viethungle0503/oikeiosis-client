import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  // A variable ref to store the user data
  const userData = ref<{ name: string; email: string; isAdmin: boolean } | null>(null)

  // A function acts as a setter to set the incoming user data
  const setUserData = (newUserData: any) => {
    userData.value = newUserData
  }

  return { userData, setUserData }
})
