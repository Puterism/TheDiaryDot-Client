<template>
  <div class="user-menu">
    <div class="user-menu-item">
      설정
    </div>
    <div class="user-menu-item" @click="logout">
      로그아웃
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'HeaderUserMenu',
  methods: {
    logout: function () {
      this.$store.dispatch('fbLogout').then(() => {
        router.push({ path: '/', name: 'DiaryIndexContainer' })
      })
    }
  }
}
</script>

<style scoped>
.user-menu {
  width: 120px;
  display: flex;
  flex-direction: column;
  right: 0;
  position: absolute;
  top: 9vh;
  background-color: rgb(240, 238, 225);
  border-radius: 3px;
  -webkit-box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);
  box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);
}

.user-menu-item {
  padding: 10px 20px;
  border-bottom: 1px solid #cccccc;
  cursor: pointer;
}

.user-menu-item:last-child {
  border-bottom: none;
}
</style>
