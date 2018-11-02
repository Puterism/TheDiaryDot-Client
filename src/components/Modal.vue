<template>
  <div class="modal-container">
    <div class="dimmed" @click="toggleOptionModal" />
    <div class="modal">
      <DiaryReaderItem :data="diary" :index="nowOpeningModal" inModal />
      <div class="modal-content">
        <div class="modal-message">
          이 일기를 어떻게 할까요?
        </div>
        <div class="modal-options">
          <button class="edit" @click="editDiary">
            <font-awesome-icon icon="edit" />
            수정할래요
          </button>
          <button class="delete" @click="deleteDiary">
            <font-awesome-icon icon="trash-alt" />
            지울래요
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DiaryReaderItem from '@/components/DiaryReaderItem.vue'
import router from '@/router'

export default {
  name: 'Modal',
  components: {
    DiaryReaderItem
  },
  data () {
    return {
      diary: JSON.parse(JSON.stringify(this.data))
    }
  },
  props: {
    data: Object,
    nowOpeningModal: Number
  },
  methods: {
    toggleOptionModal: function () {
      this.$emit('toggleOptionModal')
    },
    limitText: function () {
      if (this.diary.content.length > 200) {
        this.diary.content = this.diary.content.slice(0, 200)
        this.diary.content += '...'
      }
    },
    editDiary: function () {
      router.push({ path: '/writer', name: 'DiaryWriterContainer', params: { data: this.diary } })
    },
    deleteDiary: function () {
      this.$emit('deleteDiary', this.diary._id)
      this.toggleOptionModal()
    }
  },
  beforeMount: function () {
    this.limitText()
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
  z-index: 100;
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

.modal-message {
  margin: 20px 0 10px 0;
  font-size: 1.6em;
}

.modal-options button {
  border: none;
  border-radius: 5px;
  font-size: 1em;
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
}

.modal-options button:last-child {
  margin: 0;
}

.edit {
  background-color: #34495e;
}

.delete {
  background-color: #c0392b;
}
</style>
