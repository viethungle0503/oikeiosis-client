<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AdminLayout from '@/layouts/AdminLayout/index.vue'
import { useAuthStore } from '@/stores/authStore'

const isLoading = ref(true)
const authStore = useAuthStore()

const fetchUserData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/secured')
    if (response.status === 200 && response.data) {
      authStore.setUserData({
        name: response.data.name,
        email: response.data.email,
        isAdmin: response.data.isAdmin
      })
      localStorage.setItem('userData', JSON.stringify(authStore.userData))
    }
  } catch (error) {
    console.error(error)
  }
  isLoading.value = false
}

onMounted(() => {
  let userData = localStorage.getItem('userData')
  if (authStore.userData == null && userData == null) {
    fetchUserData()
  }
  if (userData) {
    authStore.setUserData(JSON.parse(userData))
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <div v-if="isLoading">Loading..</div>
    <template v-else>
      <AdminLayout v-if="authStore.userData!.isAdmin"></AdminLayout>
      <div v-if="authStore.userData!.isAdmin == false">
        <h1>Hello, {{ authStore.userData!.name }}!</h1>
        <p>You have successfully accessed the secured data.</p>
      </div>
      <div v-else>
        <p>You are not authorized to view this content.</p>
      </div>
    </template>
  </div>
</template>
