<template>
  <div class="modal-container">
    <div class="dimmed" @click="userMenuToggle" />
    <div class="modal">
      <div class="modal-content">
        <div v-if="!isUserPicLoaded">이미지 불러오는 중...</div>
        <div class="user-picture" :style="userPic" />
        <div class="modal-message">
          {{ this.$store.state.userName }}님, 어서 와요!
        </div>
        <div class="modal-options">
          <button class="button-logout">
            <font-awesome-icon icon="sign-out-alt" />
            로그아웃
          </button>
          <div class="danger-toggle" v-if="!isDangerOpened" @click="dangerOptionToggle">
            <font-awesome-icon icon="chevron-down" />
          </div>
          <div class="modal-options-danger" v-if="isDangerOpened && !isDeleteSelected">
            <div class="border">
              <font-awesome-icon icon="exclamation-triangle" />
              아래 버튼은 함부로 누르지 마세요
              <font-awesome-icon icon="exclamation-triangle" />
            </div>
            <button class="button-delete" @click="deleteSelectToggle">
              <font-awesome-icon icon="ban" />
              모든 일기 삭제
            </button>
          </div>
          <div class="modal-options-delete-check" v-if="isDeleteSelected">
            <div class="border">
              <font-awesome-icon icon="exclamation-triangle" />
              정말로 모든 일기를 지우실건가요?
              <font-awesome-icon icon="exclamation-triangle" />
            </div>
            <button class="button-delete" @click="deleteDiaryAll">
              <font-awesome-icon icon="ban" />
              네, 모두 지울게요
            </button>
            <button class="button-no" @click="() => { deleteSelectToggle(); dangerOptionToggle(); }">
              아니예요
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Setting from '@/setting'

export default {
  name: 'UserMenuModal',
  props: {
    userPic: String,
    isUserPicLoaded: Boolean,
    getDiaries: Function
  },
  data () {
    return {
      isDangerOpened: false,
      isDeleteSelected: false
    }
  },
  methods: {
    userMenuToggle: function () {
      this.$emit('userMenuToggle')
    },
    dangerOptionToggle: function () {
      this.isDangerOpened = !this.isDangerOpened
    },
    deleteSelectToggle: function () {
      this.isDeleteSelected = !this.isDeleteSelected
    },
    deleteDiaryAll: function () {
      const r = confirm('진짜로 다 지웁니다?')
      if (r === true) {
        const baseURI = Setting.serverURI
        const query = 'mutation { deleteDiaryAll(userId: "' + this.$store.state.userID + '") }'
        this.$http.post(`${baseURI}`, {
          'query': query
        })
          .then((result) => {
            this.$emit('userMenuToggle')
            this.getDiaries()
          })
      } else {
        this.deleteSelectToggle()
        this.dangerOptionToggle()
      }
    }
  }
}
</script>

<style scoped>
.dimmed {
  background: rgba(0,0,0,.80);
  z-index: 995;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
}

.modal {
  color: white;
  width: 60vw;
  z-index: 999;
}

.modal-content {
  text-align: center;
}

.user-picture {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  display: inline-block;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.modal-message {
  margin: 20px 0 10px 0;
  font-size: 1.6em;
}

.modal-options {
  text-align: center;
}

.modal-options button {
  border: none;
  border-radius: 5px;
  font-size: 1em;
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.modal-options .button-logout {
  background-color: #2980b9;
}

.modal-options .button-delete {
  background-color: #c0392b;
  margin-right: 10px;
}

.modal-options .button-slash {
  background-color: #2c3e50;
}

.modal-options .button-no {
  background-color: #34495e;
}

.border {
  text-align: center;
  margin: 30px 0 10px 0;
}
.border::before,
.border::after {
  content: '';
  display: inline-block;
  width: 100px;
  height: 1px;
  background: white;
  vertical-align: middle;
  margin: 0 10px;
}

.danger-toggle {
  font-size: 1.5em;
  display: block;
  cursor: pointer;
  margin: 20px auto;
}

</style>
