<template>
  <div class="container">
    <div class="login-container">
      <h1>일기장.</h1>
      <div>
        <button class="fb-login-btn" @click="fbLogin">
          <font-awesome-icon :icon="['fab', 'facebook']" />
          Facebook으로 계속하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  methods: {
    fbLogin: function () {
      window.location.href = `${window.location.origin}/api/auth/facebook`
    }
  }
}
</script>

<style scoped>
#app, .container, .login-container {
  width: 100vw;
  height: 60vh;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1 {
  font-size: 10em;
}
.fb-login-btn {
  border-radius: 5px;
  width: 300px;
  height: 40px;
  background-color: #4267b2;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
}
.fb-login-btn svg {
  font-size: 30px;
  float: left;
  margin-right: 50px;
}

.fb-login-btn:hover {
  background-color: #3b5998;
}
</style>
