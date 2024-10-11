<script setup lang="ts">
const message = () => {
  return 'The webmaster said that you can not enter this page...'
}
</script>

<template>
  <div class="container-fluid vh-100 d-flex justify-content-center align-items-center">
    <div class="row w-100">
      <div class="col-12 col-md-6 d-flex justify-content-center">
        <div class="pic-404">
          <img class="pic-404__parent img-fluid" src="@/assets/images/404.png" alt="404" />
          <img
            class="pic-404__child left img-fluid"
            src="@/assets/images/404_cloud.png"
            alt="404"
          />
          <img class="pic-404__child mid img-fluid" src="@/assets/images/404_cloud.png" alt="404" />
          <img
            class="pic-404__child right img-fluid"
            src="@/assets/images/404_cloud.png"
            alt="404"
          />
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
        <div class="error">
          <div class="error__oops">OOPS!</div>
          <div class="error__info">
            All rights reserved
            <a style="color: #20a0ff" href="https://thửhtml.vn" target="_blank">thửhtml</a>
          </div>
          <div class="error__headline">{{ message() }}</div>
          <div class="error__info">
            Please check that the URL you entered is correct, or click the button below to return to
            the homepage.
          </div>
          <div class="d-flex flex-row justify-content-center justify-content-md-start">
            <RouterLink to="/" class="error__return-home">Back to home</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pic-404 {
  position: relative;
  overflow: hidden;
}
.pic-404__child {
  position: absolute;
  opacity: 0;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
.pic-404__child.left {
  width: 80px;
  top: 17px;
  left: 220px;
  animation-name: cloudLeft;
  animation-delay: 1s;
}
.pic-404__child.mid {
  width: 46px;
  top: 10px;
  left: 420px;
  animation-name: cloudMid;
  animation-delay: 1.2s;
}
.pic-404__child.right {
  width: 62px;
  top: 100px;
  left: 500px;
  animation-name: cloudRight;
  animation-delay: 1s;
}
@keyframes cloudLeft {
  0% {
    top: 17px;
    left: 220px;
    opacity: 0;
  }
  20% {
    top: 33px;
    left: 188px;
    opacity: 1;
  }
  80% {
    top: 81px;
    left: 92px;
    opacity: 1;
  }
  100% {
    top: 97px;
    left: 60px;
    opacity: 0;
  }
}
@keyframes cloudMid {
  0% {
    top: 10px;
    left: 420px;
    opacity: 0;
  }
  20% {
    top: 40px;
    left: 360px;
    opacity: 1;
  }
  70% {
    top: 130px;
    left: 180px;
    opacity: 1;
  }
  100% {
    top: 160px;
    left: 120px;
    opacity: 0;
  }
}
@keyframes cloudRight {
  0% {
    top: 100px;
    left: 500px;
    opacity: 0;
  }
  20% {
    top: 120px;
    left: 460px;
    opacity: 1;
  }
  80% {
    top: 180px;
    left: 340px;
    opacity: 1;
  }
  100% {
    top: 200px;
    left: 300px;
    opacity: 0;
  }
}
.error {
  text-align: left;

  &__oops {
    font-size: 2rem;
    font-weight: bold;
    color: #1482f0;
    opacity: 0;
    margin-bottom: 1rem;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }
  &__headline {
    font-size: 1.25rem;
    font-weight: bold;
    color: #222;
    opacity: 0;
    margin-bottom: 0.5rem;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-delay: 0.1s;
    animation-fill-mode: forwards;
  }
  &__info {
    font-size: 0.875rem;
    color: grey;
    opacity: 0;
    margin-bottom: 1.5rem;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-delay: 0.2s;
    animation-fill-mode: forwards;
  }
  &__return-home {
    display: block;
    width: 110px;
    height: 36px;
    background: #1482f0;
    border-radius: 100px;
    text-align: center;
    color: #ffffff;
    opacity: 0;
    font-size: 0.875rem;
    line-height: 36px;
    cursor: pointer;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-delay: 0.3s;
    animation-fill-mode: forwards;
  }
}
@keyframes slideUp {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
