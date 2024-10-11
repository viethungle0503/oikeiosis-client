<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const router = useRouter()
const loginForm = ref({
  username: 'admin',
  password: '123456789'
})
const login = () => {
  router.push('/admin')
}
const forgot = () => {
  console.log('forgot')
  toast.add({ severity: 'error', summary: 'Chức năng chưa được phát triển', detail: 'Thiếu thời gian và công sức', life: 3000 })
}
</script>

<template>
  <div
    class="container-fluid"
    style="background-color: #2d3a4b; height: 100vh; max-height: 100vh; color: #fff"
  >
    <Toast />
    <div class="row h-100 d-flex justify-content-center align-items-center">
      <div class="col-3"></div>
      <div class="col-6">
        <form class="form-container">
          <h3 class="text-center">Đăng nhập</h3>
          <InputGroup class="form-item">
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText
              v-model="loginForm.username"
              placeholder="Username"
              tabindex="1"
              autocomplete="on"
              :style="{ background: 'transparent', color: '#fff', border: 'none' }"
            />
          </InputGroup>
          <InputGroup class="form-item">
            <InputGroupAddon>
              <i class="pi pi-lock"></i>
            </InputGroupAddon>
            <Password
              v-model="loginForm.password"
              :feedback="false"
              toggleMask
              placeholder="Password"
              tabindex="2"
              autocomplete="on"
              :input-style="{ background: 'transparent', color: '#fff', border: 'none' }"
            />
          </InputGroup>
          <div class="d-flex flex-row justify-content-stat column-gap-3">
            <Button label="Đăng nhập" severity="success" @click="login()"></Button>
            <Button label="Quên mật khẩu" severity="info" @click="forgot()"></Button>
          </div>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
.form-item {
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.p-inputgroupaddon {
  background: transparent;
  border: none;
  color: #2d75c8;
}
</style>
