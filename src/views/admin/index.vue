<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import AdminLayout from '@/layouts/AdminLayout/index.vue';

const authStore = useAuthStore();
</script>

<template>
  <div style="max-width: 100vw">
    <AdminLayout v-if="authStore.userData!.isAdmin"></AdminLayout>
  </div>
</template>
