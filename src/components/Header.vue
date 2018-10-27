<template>
  <header class="header">
    <div class="diary-brand">
      <router-link to="/main">
        <h1>일기장.</h1>
      </router-link>
    </div>
    <div class="header-menu">
      <div class="diary-reader-menu" v-if="reader">
        <router-link to="/writer">
          <button class="save-btn">
            <font-awesome-icon icon="pen-alt" />
            일기 쓰기
          </button>
        </router-link>
      </div>
      <div class="diary-writer-menu" v-if="writer">
        <button class="save-temp-btn" v-if="isTempDiarySaved">
          저장 완료!
        </button>
        <button class="save-temp-btn" v-else @click="saveDiary(true)">
          임시 저장
        </button>
        <button class="save-btn" @click="saveDiary(false)">일기 저장하기</button>
      </div>
      <div class="diary-user" @click="userMenuToggle">
        <font-awesome-icon icon="user-circle" v-if="!isUserPicLoaded && userPicUrl" />
        <div class="diary-user-picture" :style="userPic" v-else />
      </div>
    </div>
    <UserMenuModal v-if="isUserMenuOpened" @userMenuToggle="userMenuToggle" :isUserPicLoaded="isUserPicLoaded" :userPic="userPic" :getDiaries="getDiaries" />
  </header>
</template>

<script>
import UserMenuModal from '@/components/UserMenuModal.vue'

export default {
  name: 'Header',
  components: {
    UserMenuModal
  },
  props: {
    writer: Boolean,
    reader: Boolean,
    saveDiary: Function,
    getDiaries: Function,
    isTempDiarySaved: Boolean
  },
  computed: {
    userPic: function () {
      return 'background-image: url(' + this.userPicUrl + ')'
    },
    userPicUrl: function () {
      const self = this
      if (this.$store.state.userID) {
        const url = 'https://graph.facebook.com/v3.1/' + this.$store.state.userID + '/picture?width=200'
        let img = new window.Image()
        img.src = url
        img.onload = function () {
          self.isUserPicLoaded = true
          img = undefined
        }
        return url
      } else {
        return null
      }
    }
  },
  data () {
    return {
      isUserMenuOpened: false,
      isUserPicLoaded: false
    }
  },
  methods: {
    userMenuToggle: function () {
      this.isUserMenuOpened = !this.isUserMenuOpened
    }
  },
  mounted: function () {
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.header {
  z-index: 99;
  width: 60vw;
  height: 10vh;
  position: fixed;
  top: 0;
  min-height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(240, 238, 225);
}
.diary-brand h1 {
  margin: 0;
  font-size: 2.8em;
}

.header-menu {
  display: flex;
  align-items: center;
}

.diary-user {
  font-size: 2.8em;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.diary-user svg, .diary-user-picture {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: inline-block;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.diary-writer-menu button, .diary-reader-menu button {
  border: 0;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  margin-right: 15px;
}

.save-btn {
  border: 0;
  padding: 10px 20px;
  background-color: #34495e;
  color: white;
  font-weight: bold;
}

.save-btn:hover {
  background-color: #2c3e50;
}

.save-temp-btn {
  padding: 10px 15px;
  background: none;
}

.save-temp-btn:hover {
  background: none;
}
</style>
