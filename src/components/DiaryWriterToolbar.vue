<template>
  <div class="diary-writer__toolbar" v-bind:style="{ left: left + 'px', top: top + 'px', display: display }">
    <button class="toolbar-btn bold" @click="bold" v-tooltip.bottom="{ content: '굵게 (Ctrl + B)' }">
      <font-awesome-icon icon="bold" />
    </button>
    <button class="toolbar-btn underline" @click="underline" v-tooltip.bottom="{ content: '밑줄 (Ctrl + U)' }">
      <font-awesome-icon icon="underline" />
    </button>
    <button class="toolbar-btn italic" @click="italic" v-tooltip.bottom="{ content: '기울임 (Ctrl + I)' }">
      <font-awesome-icon icon="italic" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'DiaryWriterToolbar',
  props: {
    top: Number,
    left: Number,
    display: String
  },
  methods: {
    returnToCursor: function () {
      const textarea = document.querySelector('.diary-writer__textarea')
      textarea.focus()
    },
    bold: function () {
      let selection
      if (window.getSelection) {
        selection = window.getSelection()
      } else if (document.selection) { // < IE8
        selection = document.selection.createRange()
      }
      document.execCommand('bold')
      if (selection.isCollapsed) this.returnToCursor()
    },
    underline: function () {
      let selection
      if (window.getSelection) {
        selection = window.getSelection()
      } else if (document.selection) { // < IE8
        selection = document.selection.createRange()
      }
      document.execCommand('underline')
      if (selection.isCollapsed) this.returnToCursor()
    },
    italic: function () {
      let selection
      if (window.getSelection) {
        selection = window.getSelection()
      } else if (document.selection) { // < IE8
        selection = document.selection.createRange()
      }
      document.execCommand('italic')
      if (selection.isCollapsed) this.returnToCursor()
    }
  }
}
</script>

<style>
.diary-writer__toolbar {
  position: absolute;
  background: rgb(240, 238, 225);
  border: 1px solid black;
  border-top: 4px solid black;
}
.diary-writer__toolbar .toolbar-btn {
  padding: 5px 10px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 24px;
}
</style>
