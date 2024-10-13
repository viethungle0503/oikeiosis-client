<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import AdminSidebar from '@/layouts/AdminLayout/sidebar/index.vue'

const toast = useToast()
const getImageUrl = (name: string, ext: string): string => {
  return `${import.meta.env.BASE_URL}src/assets/images/${name}.${ext}`
}
const getDayTime = () => {
  const date = new Date()
  const day = date.toLocaleDateString('en-US', { weekday: 'short' })
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${day} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`
}
const home = ref({
  icon: 'pi pi-home'
})
const items = ref([
  { label: 'Electronics' },
  { label: 'Computer' },
  { label: 'Accessories' },
  { label: 'Keyboard' },
  { label: 'Wireless' }
])
</script>

<template>
  <div class="d-flex flex-row" style="min-height: 100vh">
    <AdminSidebar></AdminSidebar>
    <div class="bg-light flex-fill">
      <div class="p-2 d-md-none d-flex text-white bg-success">
        <a href="#" class="text-white" data-bs-toggle="offcanvas" data-bs-target="#bdSidebar">
          <i class="pi pi-bars"></i>
        </a>
        <span class="ms-3">Oikeiosis Admin Portal</span>
      </div>
      <div class="p-4">
        <div class="card flex justify-center">
          <Breadcrumb :home="home" :model="items" />
        </div>
        <hr />
        <div class="row">
          <div class="col">
            <p>Page content goes here</p>
          </div>
        </div>
        <BNavbar toggleable="lg" variant="primary" v-b-color-mode="'dark'">
          <BNavbarBrand href="#">NavBar</BNavbarBrand>
          <BNavbarToggle target="nav-collapse" />
          <BCollapse id="nav-collapse" is-nav>
            <BNavbarNav>
              <BNavItem href="#">Link</BNavItem>
              <BNavItem href="#" disabled>Disabled</BNavItem>
            </BNavbarNav>
            <!-- Right aligned nav items -->
            <BNavbarNav class="ms-auto mb-2 mb-lg-0">
              <BNavItemDropdown text="Lang" right>
                <BDropdownItem href="#">EN</BDropdownItem>
                <BDropdownItem href="#">ES</BDropdownItem>
                <BDropdownItem href="#">RU</BDropdownItem>
                <BDropdownItem href="#">FA</BDropdownItem>
              </BNavItemDropdown>
              <BNavItemDropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <em>User</em>
                </template>
                <BDropdownItem href="#">Profile</BDropdownItem>
                <BDropdownItem href="#">Sign Out</BDropdownItem>
              </BNavItemDropdown>
            </BNavbarNav>
            <BNavForm class="d-flex">
              <BFormInput class="me-2" placeholder="Search" />
              <BButton type="submit" variant="outline-success">Search</BButton>
            </BNavForm>
          </BCollapse>
        </BNavbar>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
