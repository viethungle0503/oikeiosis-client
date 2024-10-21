<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import AdminSidebar from '@/layouts/AdminLayout/sidebar/index.vue';

const toast = useToast();
const getImageUrl = (name: string, ext: string): string => {
  return `${import.meta.env.BASE_URL}src/assets/images/${name}.${ext}`;
};
const getDayTime = () => {
  const date = new Date();
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};
const home = ref({
  icon: 'pi pi-home',
  route: '/admin'
});
const items = ref([{ label: 'Investor Classification', route: '/admin/investor-classification' }]);
</script>

<template>
  <div class="d-flex flex-row">
    <AdminSidebar class="admin-sidebar"></AdminSidebar>
    <div class="flex-fill admin-content">
      <div class="p-2 d-md-none d-flex text-white bg-success">
        <a href="#" class="text-white" data-bs-toggle="offcanvas" data-bs-target="#bdSidebar">
          <i class="pi pi-bars"></i>
        </a>
        <span class="ms-3">Oikeiosis Admin Portal</span>
      </div>
      <div class="p-4">
        <div class="card flex justify-center">
          <Breadcrumb :home="home" :model="items">
            <template #item="{ item, props }">
              <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a :href="href" v-bind="props.action" @click="navigate">
                  <span :class="[item.icon, 'text-color']" />
                  <span class="text-primary font-semibold">{{ item.label }}</span>
                </a>
              </router-link>
              <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
              </a>
            </template>
          </Breadcrumb>
        </div>
        <hr />
        <div class="row">
          <div class="col">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-sidebar {
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
}

.admin-content {
  background-color: rgb(153, 121, 193);
}
</style>
