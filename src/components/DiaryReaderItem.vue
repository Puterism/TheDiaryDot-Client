<template>
  <div class="diary-reader-item">
    <div class="diary-reader-item__meta">
      <div class="diary-reader-item__month">
        {{ this.parseMonth(this.date.getMonth()) }}
      </div>
      <div class="diary-reader-item__day">
        {{ this.date.getDate() }}
      </div>
      <div class="diary-reader-item__weekday">
        {{ this.parseWeekday(this.date.getDay()) }}
      </div>
    </div>
    <div class="diary-reader-item__content" v-html="data.content" />
    <div class="diary-reader-item__options" v-if="!inModal">
      <span @click="toggleOptionModal">
        <font-awesome-icon icon="ellipsis-v" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiaryReaderItem',
  props: {
    data: Object,
    index: Number,
    inModal: Boolean
  },
  data () {
    return {
      date: null
    }
  },
  methods: {
    parseDate: function (str) {
      const date = str.split('-')
      this.date = new Date(date[0], date[1], date[2])
    },
    parseMonth: function (month) {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      return monthNames[month - 1]
    },
    parseWeekday: function (weekday) {
      const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      return weekdayNames[weekday]
    },
    toggleOptionModal: function () {
      this.$emit('toggleOptionModal', this.index)
    }
  },
  beforeMount: function () {
    this.parseDate(this.data.date)
  }
}
</script>

<style>
.diary-reader-item {
  color: black;
  background-color: rgb(240, 238, 225);
  border: 1px solid black;
  border-left: 5px solid black;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

.diary-reader-item__meta {
  display: flex;
  flex-direction: column;
  margin: 11px 10px 11px 0;
  min-width: 60px;
}

.diary-reader-item__meta div {
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
}

.diary-reader-item__month {
  font-size: 1em;
}

.diary-reader-item__day {
  font-size: 2.4em;
}

.diary-reader-item__weekday {
  font-size: .7em;
}

.diary-reader-item__content {
  width: calc(100% - 70px - 30px);
  margin: 10px 0;
  font-size: 1.8em;
  line-height: 150%;
  word-wrap: break-word;
}

.diary-reader-item__options {
  min-width: 30px;
}

.diary-reader-item__options span {
  cursor: pointer;
  display: none;
  padding: 10px;
}

.diary-reader-item:hover .diary-reader-item__options span {
  display: inline-block;
}
</style>
