<template>
  <transition name="message-show" :duration="500" @before-enter="beforeEnter" @before-leave="beforeLeave">
    <div class="message-container" ref="message" v-if="nowDisplaying">
      <slot :close="messageClose"></slot>
      <span class="message-close" @click="messageClose" v-if="!hideCloseButton">
        <font-awesome-icon icon='times' />
      </span>
    </div>
  </transition>
</template>

<script>
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
      this.height = this.$refs.message.clientHeight + 10
    },
    beforeEnter: function (el) {
      this.$nextTick(function () {
        setTimeout(() => {
          el.style.top = `0px`
        }, 100)
      })
    },
    beforeLeave: function (el) {
      el.style.top = `-${this.height}px`
    },
    autoClose: function () {
      setTimeout(() => {
        this.messageClose()
      }, this.displayTime)
    }
  },
  mounted: function () {
    this.getHeight()
    this.$el.style.top = `-${this.height}px`
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
  /*-webkit-box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);*/
  /*-moz-box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);*/
  /*box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);*/
  display: flex;
  align-items: center;
  flex-direction: row;
  transition: all .5s ease;
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

<style scoped>
.message-show-enter-active, .message-show-leave-active {
  transition: all .5s ease;
}
</style>
