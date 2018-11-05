<template>
  <transition name="message-show" :duration="500" @leave="leave">
    <div class="message-container" v-if="nowDisplaying">
      <slot :close="messageClose"></slot>
      <span class="message-close" @click="messageClose" v-if="!hideCloseButton">
        <font-awesome-icon icon='times' />
      </span>
    </div>
  </transition>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
  name: 'Message',
  props: {
    displayTime: Number,
    hideCloseButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      height: null,
      nowDisplaying: true
    }
  },
  methods: {
    messageClose: function () {
      this.nowDisplaying = false
    },
    getHeight: function () {
      this.height = this.$el.clientHeight + 10
    },
    leave: function (el, done) {
      Velocity(el, { top: `-${el.clientHeight + 10}px` }, { duration: 500, easing: 'ease', complete: done })
    },
    autoClose: function () {
      setTimeout(() => {
        this.messageClose()
      }, this.displayTime)
    }
  },
  mounted: function () {
    this.$el.style.top = `-${this.$el.clientHeight + 10}px`
    Velocity(this.$el, { top: 0 }, { duration: 500, easing: 'ease' })
    if (this.displayTime) {
      this.autoClose()
    }
  }
}
</script>

<style>
.message-container {
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 102;
  width: 530px;
  height: auto;
  background-color: #2c3e50;
  border-radius: 0 0 10px 10px;
  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.message-container h1, .message-container h2, .message-container h3, .message-container h4, .message-container h5, .message-container h6, .message-container p {
  margin: 5px;
}

.message-container button {
  border: 0;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  padding: 10px 15px;
  margin-right: 10px;
}
.message-container button:last-child {
  margin-right: 0;
}

.message-close {
  position: absolute;
  top: 12px;
  right: 15px;
  cursor: pointer;
  font-size: 20px;
}
</style>
