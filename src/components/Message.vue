<template>
  <div class="message-container" :style="displayStyle" ref="message">
    <slot :nowDisplaying="nowDisplaying" :toggle="messageToggle"></slot>
    <span class="message-close" @click="messageToggle" v-if="!hideCloseButton">
      <font-awesome-icon icon='times' />
    </span>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    displayTime: Number,
    hideCloseButton: Boolean
  },
  data () {
    return {
      nowDisplaying: false,
      height: null
    }
  },
  computed: {
    displayStyle: function () {
      return `top: ${this.nowDisplaying ? '0' : '-' + (this.height) + 'px'};`
    }
  },
  methods: {
    messageToggle: function () {
      this.nowDisplaying = !this.nowDisplaying
    },
    getHeight: function () {
      this.height = this.$refs.message.clientHeight
    }
  },
  mounted: function () {
    this.getHeight()
    this.messageToggle()
  }
}
</script>

<style scoped>
.message-container {
  position: fixed;
  top: -500px;
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
  transition: 1s ease;
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
