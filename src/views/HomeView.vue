<script setup lang="ts">
import { ref } from 'vue'
import ConditionGenerator from '@/components/securities/ConditionGenerator.vue'

const toggleDarkMode = () => {
  const element = document.querySelector('html')
  element!.classList.toggle('system-appearance-dark')
}
const navItems = ref([
  { text: 'Home', url: '/' },
  { text: 'About', url: '/about' },
  { text: 'Contact', url: '/contact' }
])
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">My Vue App</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-for="(item, index) in navItems" :key="index">
              <a class="nav-link" :href="item.url">{{ item.text }}</a>
            </li>
          </ul>
            <Button label="Toggle Dark Mode" @click="toggleDarkMode()"></Button>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="mb-5">
        <ConditionGenerator></ConditionGenerator>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
