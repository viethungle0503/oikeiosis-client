<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <div
    id="bdSidebar"
    class="d-flex flex-column flex-shrink-0 p-3"
  >
    <a href="#" class="navbar-brand"> </a>
    <hr />
    <ul class="mynav nav nav-pills flex-column mb-auto">
      <li class="nav-item mb-1">
        <a href="#">
          <i class="pi pi-user"></i>
          Profile
        </a>
      </li>
      <li class="nav-item mb-1">
        <a href="#">
          <i class="pi pi-reddit"></i>
          Saved Articles
          <span class="notification-badge">5</span>
        </a>
      </li>
      <li class="nav-item mb-1">
        <a href="#">
          <i class="pi pi-github"></i>
          Articles
        </a>
      </li>
      <li class="nav-item mb-1">
        <a href="#">
          <i class="pi pi-building"></i>
          Institutions
        </a>
      </li>
      <li class="nav-item mb-1">
        <a href="#">
          <i class="pi pi-graduation-cap"></i>
          Organizations
        </a>
      </li>
      <li class="sidebar-item nav-item mb-1">
        <a
          href="#"
          class="sidebar-link collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#settings"
          aria-expanded="false"
          aria-controls="settings"
        >
          <i class="pi pi-cog"></i>
          <span class="topic">Settings </span>
        </a>
        <ul id="settings" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="pi pi-sign-in"></i>
              <span class="topic"> Login</span>
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="pi pi-user-plus"></i>
              <span class="topic">Register</span>
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="pi pi-sign-out"></i>
              <span class="topic">Log Out</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
    <hr />
    <div class="d-flex">
      <i class="pi pi-book me-2"></i>
      <span>
        <h6 class="mt-1 mb-0">Oikeiosis Admin Portal</h6>
      </span>
    </div>
  </div>
</template>

<style scoped>
#bdSidebar {
  background-color: #E9DBF5;
  color: black;
}
.gfg {
  height: 50px;
  width: 50px;
}

.mynav {
  color: black;
}

.mynav li a {
  color: black;
  text-decoration: none;
  width: 100%;
  display: block;
  border-radius: 5px;
  padding: 8px 5px;
}

.mynav li a.active {
  background: rgba(255, 255, 255, 0.2);
}

.mynav li a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.mynav li a i {
  width: 25px;
  text-align: center;
}

.notification-badge {
  background-color: rgba(255, 255, 255, 0.7);
  float: right;
  color: #222;
  font-size: 14px;
  padding: 0px 8px;
  border-radius: 2px;
}
</style>
