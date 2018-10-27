<template>
  <div class="container">
    <Header writer :saveDiary="saveDiary" :isTempDiarySaved="isTempDiarySaved" />
    <div class="diary-writer">
      <div class="diary-writer__date">
        <font-awesome-icon icon="calendar-alt" />
        <Datepicker :language="datepickerLang" v-model="date" :format="datepickerFormat" placeholder="____-__-__"></Datepicker>
      </div>
      <div class="diary-writer__textarea" id="editor"
        contenteditable
        placeholder="여기에 글을 입력해주세요."
        v-on:mouseup="showToolbar"
        v-on:mousedown="releaseSelection"
        v-on:keypress="hideToolbar"
      />
    </div>
    <DiaryWriterToolbar :top="toolbarTop" :left="toolbarLeft" :display="toolbarDisplay" />
    <Message v-if="tempDiary">
      <div class="message-content" slot-scope="{nowDisplaying, toggle}">
        <h3>임시 저장되었던 일기를 불러올까요?</h3>
        <p>저장된 일시: {{ tempDiaryDateTime }}</p>
        <div class="message-buttons">
          <button class="load-btn" @click="loadTempDiary(); toggle();">불러오기</button>
          <button class="delete-btn" @click="deleteTempDiary(); toggle();">삭제하기</button>
          <button class="later-btn" @click="toggle">나중에 알림</button>
        </div>
      </div>
    </Message>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import DiaryWriterToolbar from '@/components/DiaryWriterToolbar'
import Message from '@/components/Message'
import router from '@/router'
import Setting from '@/setting.js'

import Datepicker from 'vuejs-datepicker'
import { ko } from 'vuejs-datepicker/dist/locale'

export default {
  name: 'DiaryWriter',
  components: {
    Header,
    Datepicker,
    DiaryWriterToolbar,
    Message
  },

  data () {
    return {
      datepickerFormat: 'yyyy-MM-dd',
      datepickerLang: ko,
      toolbarTop: -1000,
      toolbarLeft: -1000,
      toolbarDisplay: 'inline-block',
      date: new Date(),
      isTempDiarySaved: false,
      tempDiary: null,
      tempDiaryDateTime: null,
      errMsg: null
    }
  },
  methods: {
    showToolbar: function (e) {
      let selection

      if (window.getSelection) {
        selection = window.getSelection()
      } else if (document.selection) { // < IE8
        selection = document.selection.createRange()
      }

      const rect = selection.getRangeAt(0).getBoundingClientRect()

      if (selection.toString() !== '') {
        this.toolbarTop = rect.top + rect.height + 5
        this.toolbarLeft = e.pageX
        this.toolbarDisplay = 'inline-block'
      } else if (rect.x > 0) {
        this.toolbarTop = rect.top + rect.height + 5
        this.toolbarLeft = rect.x
        this.toolbarDisplay = 'inline-block'
      }
    },
    releaseSelection: function () {
      const selection = window.getSelection()

      if (!selection.isCollapsed) {
        window.getSelection().getRangeAt(0).setEnd(document.querySelector('.diary-writer__textarea'), 0)
        this.hideToolbar()
      }
    },
    hideToolbar: function () {
      this.toolbarDisplay = 'none'
    },
    saveDiary: function (temp) {
      const baseURI = Setting.serverURI
      const content = document.getElementById('editor').innerHTML.replace(/"/g, '\\"')
      const date = this.date
      const year = date.getFullYear()
      const userID = this.$store.state.userID
      console.log(content)
      if (!content) {
        this.setErrorMessage('err')
        return false
      }

      let month = (1 + date.getMonth()).toString()
      month = month.length > 1 ? month : '0' + month
      let day = date.getDate().toString()
      day = day.length > 1 ? day : '0' + day
      const parsedDate = year + '-' + month + '-' + day
      let query = null
      if (temp) {
        query = 'mutation { addTempDiary(date: "' + parsedDate + '", content: "' + content + '", userId: "' + userID + '") { _id, date, content } }'
      } else {
        query = 'mutation { addDiary(date: "' + parsedDate + '", content: "' + content + '", userId: "' + userID + '") { _id, date, content } }'
      }
      this.$http.post(`${baseURI}`, {
        'query': query
      })
        .then((result) => {
          if (!temp) {
            this.deleteTempDiary()
            router.push({ path: 'main', name: 'DiaryReaderContainer', params: { year: year, month: month } })
          } else {
            this.tempDiarySaveToggle()
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    tempDiarySaveToggle: function () {
      this.isTempDiarySaved = !this.isTempDiarySaved
      setTimeout(() => {
        this.isTempDiarySaved = !this.isTempDiarySaved
      }, 1500)
    },
    checkTempDiary: function () {
      const baseURI = Setting.serverURI
      const query = `
        query {
          getTempDiary(userId: "${this.$store.state.userID}") {
            savedDateTime
            date
            content
            userId
          }
        }
      `
      this.$http.post(`${baseURI}`, {
        'query': query
      })
        .then((response) => {
          const data = response.data.data.getTempDiary
          if (data) {
            this.tempDiaryDateTime = new Date(data.savedDateTime).toLocaleString()
            this.tempDiary = data
          }
        })
    },
    loadTempDiary: function () {
      this.date = new Date(this.tempDiary.date)
      document.getElementById('editor').innerHTML = this.tempDiary.content
    },
    deleteTempDiary: function () {
      const baseURI = Setting.serverURI
      const query = `
        mutation {
          deleteTempDiary(userId: "${this.$store.state.userID}")
        }
      `
      this.$http.post(`${baseURI}`, {
        'query': query
      })
        .then((response) => {
          const data = response.data.data.deleteTempDiary
          return data
        })
    },
    setErrorMessage: function (msg) {
      this.errMsg = msg
    }
  },
  beforeMount: function () {
    this.$store.dispatch('getAuthData')
    this.$http.defaults.headers.common['Authorization'] = this.$store.getters.bearerToken
    this.checkTempDiary()
  },
  mounted: function () {
    document.getElementById('editor').focus()
  }
}
</script>

<style scoped>
div[contentEditable=true]:empty::before{
  content: attr(placeholder);
  color: lightgrey;
  cursor: text;
}

.diary-writer {
  margin-top: 15vh;
  width: 100%;
}

.diary-writer__date {
  position: fixed;
  top: 10vh;
  height: 5vh;
  background-color: rgb(240, 238, 225);
  margin-left: 10px;
  font-family: sans-serif, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.diary-writer__date svg {
  font-size: 1.8em;
}

.diary-writer__textarea {
  padding: 10px;
  width: 100%;
  font-size: 1.8em;
  outline: none;
  line-height: 150%;
  min-height: 300px;
}

.message-buttons {
  margin-left: 5px;
  margin-top: 11px;
}

.message-buttons button {
  font-weight: bold;
}

.message-buttons .load-btn {
  background-color: #2980b9;
  color: white;
}

.message-buttons .delete-btn {
  background-color: #c0392b;
  color: white;
}

.message-buttons .later-btn {
  background-color: #ecf0f1;
  color: black;
}
</style>

<style>
.diary-writer__date input {
  margin-left: 10px;
  padding: 2px 4px;
  font-size: 1.8em;
  border: 0;
  background: none;
  width: 170px;
  cursor: pointer;
  outline: none;
}

.tooltip {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
}

.vdp-datepicker {
  display: inline-block;
}
</style>
