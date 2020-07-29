<template>
  <div class="view">
    <button id="show-modal" @click="showModal">Show Modal</button>
    <modal v-if="displayModal" @close-modal="closeModal">
      <!-- you can use custom content here to overwrite default content -->
      <h3 slot="header">Sign Up</h3>
      <div slot="body">
        <signup-form v-on:form-submitted="closeModal" />
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue'
import SignupForm from '../components/Form.vue'

export default {
  components: {
    Modal,
    SignupForm
  },
  props: ['onShowModal'],
  data: () => ({
    displayModal: true
  }),
  methods: {
    closeModal() {
      this.displayModal = false
    },
    showModal() {
      this.displayModal = true
      this.onShowModal()
    }
  }
}
</script>

<style scoped>
#show-modal {
  position: absolute;
  right: 10px;
  top: 50px;
}
</style>
