<template>
  <div>
    <div class="container">
      <Header reader :getDiaries="getDiaries" />
      <div class="diary-reader">
        <div class="diary-reader-now-loading" v-if="nowLoading">일기장 펼치는 중...</div>
        <ul class="diary-reader-monthpicker">
          <li class="monthpicker-meta">
            <div class="monthpicker-year">
              {{ selectedDate.getFullYear() }}
              <div class="monthpicker-year-select">
                <font-awesome-icon icon="caret-up" @click="selectYear(year + 1)"/>
                <font-awesome-icon icon="caret-down" @click="selectYear(year - 1)" />
              </div>
            </div>
          </li>
          <li v-for="index in 12" :key="index"
            :class="{ selected: month === index }"
            @click="selectMonth(index)"
            class="monthpicker-item"
          >
          {{ parseMonth(index) }}
          </li>
        </ul>
        <div class="diary-reader-nothing" v-if="!hasResult && !nowLoading">썼던 일기가 없어요.</div>
        <DiaryReaderItem v-if="!nowLoading" v-for="(diary, index) in diaries" v-bind:key="index"
          :data="diary" :index="index" @toggleOptionModal="toggleOptionModal"
        />
      </div>
      <Modal v-if="nowOpeningModal != -1" :data="diaries[nowOpeningModal]"
        :nowOpeningModal="nowOpeningModal"
        @deleteDiary="deleteDiary"
        @toggleOptionModal="toggleOptionModal"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import DiaryReaderItem from '@/components/DiaryReaderItem.vue'
import Modal from '@/components/Modal.vue'
import Setting from '@/setting.js'
// import router from '@/router'

export default {
  name: 'DiaryReader',
  data () {
    return {
      selectedDate: null,
      diaries: null,
      nowLoading: true,
      nowOpeningModal: -1
    }
  },
  components: {
    Header,
    Footer,
    DiaryReaderItem,
    Modal
  },
  computed: {
    hasResult: {
      get: function () {
        if (this.diaries === null) {
          return false
        } else {
          return this.diaries.length > 0
        }
      },
      set: function () {
        if (this.diaries === null) {
          return false
        } else {
          return this.diaries.length > 0
        }
      }
    },
    year: {
      get: function () {
        return this.selectedDate.getFullYear()
      },
      set: function () {
        return this.selectedDate.getFullYear()
      }
    },
    month: {
      get: function () {
        return this.selectedDate.getMonth() + 1
      },
      set: function () {
        return this.selectedDate.getMonth() + 1
      }
    }
  },
  methods: {
    sortDiariesByDate: function (diaries) { // 일자별로 정렬하여 보여주기
      // const sortingDiaries = diaries
      // const sortedDiaries = JSON.parse(JSON.stringify(sortingDiaries))
      // let minTime = 0
      // let minIndex = 0
      // console.log(sortingDiaries)
      // sortingDiaries.forEach((diary, index) => {
      //   const date = diary.date.split('-')
      //   const time = new Date(date[0], date[1], date[2]).getTime()
      //   if (minTime === 0) {
      //     minTime = time
      //   }
      //   if (minTime > time) {
      //     const temp = sortedDiaries[index]
      //     sortedDiaries[index] = sortedDiaries[minIndex]
      //     sortedDiaries[minIndex] = temp
      //     minIndex = index
      //   }
      // })
      // console.log(sortedDiaries)
      // return sortedDiaries
      return diaries
    },
    getDiaries: function () {
      this.nowLoading = true
      const baseURI = Setting.serverURI
      const parsedMonth = (this.month < 10) ? '0' + this.month.toString() : this.month
      const query = `query { getDiariesByMonth(year: "${this.year}", month: "${parsedMonth}", userId: "${this.$store.state.userID}") { _id, date, content, savedDateTime } }`
      this.$http.post(`${baseURI}`, {
        'query': query
      })
        .then((result) => {
          const diaries = result.data.data.getDiariesByMonth
          this.diaries = this.sortDiariesByDate(diaries)
          this.nowLoading = false
        })
    },
    parseMonth: function (month) {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      return monthNames[month - 1]
    },
    selectYear: function (year) {
      const date = new Date(year, this.selectedDate.getMonth() + 1, 0)
      this.selectedDate = date
      this.getDiaries()
    },
    selectMonth: function (month) {
      const date = new Date(this.selectedDate.getFullYear(), month, 0)
      this.selectedDate = date
      this.getDiaries()
    },
    toggleOptionModal: function (index) {
      if (this.nowOpeningModal >= 0) {
        this.nowOpeningModal = -1
      } else {
        this.nowOpeningModal = index
      }
    },
    deleteDiary: function (id) {
      this.nowLoading = true
      const baseURI = Setting.serverURI
      this.$http.post(`${baseURI}`, {
        'query': 'mutation { deleteDiary(_id: "' + id + '", userId: "' + this.$store.state.userID + '") }'
      })
        .then((result) => {
          this.getDiaries()
          this.nowLoading = false
        })
    }
  },
  created: function () {
    if (this.$route.params.year) {
      const params = this.$route.params
      this.selectedDate = new Date(params.year, params.month *= 1, 0)
    } else {
      const now = new Date()
      this.selectedDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    }
  },
  beforeMount: function () {
    this.$store.dispatch('getAuthData')
    this.$http.defaults.headers.common['Authorization'] = this.$store.getters.bearerToken
    this.getDiaries()
  }
}
</script>

<style scoped>
.diary-reader {
  width: 100%;
  margin-top: 15vh;
}

.diary-reader-now-loading, .diary-reader-nothing {
  text-align: center;
}

.diary-reader-monthpicker {
  width: 60vw;
  background-color: rgb(240, 238, 225);
  position: fixed;
  top: 8vh;
  height: 7vh;
  text-align: center;
  margin: 0 0 10px 0;
  padding: 0 10px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}

.monthpicker-meta {
  margin-right: 7px;
}

.monthpicker-year {
  font-size: 1.7em;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.monthpicker-year-select {
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  font-size: .7em;
}

.monthpicker-year-select svg {
  cursor: pointer;
}

.monthpicker-item {
  padding: 3px 5px;
  font-size: 1.2em;
  cursor: pointer;
}

.selected {
  font-weight: bolder;
}
</style>
