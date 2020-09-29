<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group>
                <b-form-input
                v-model="form.content"
                required
                placeholder="Enter Task"
                >
                </b-form-input>
                <b-button type="submit" variant="primary">Add</b-button>
            </b-form-group>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        form: {
          content: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        axios.post('http://localhost:3000/task', {
            content: this.form.content
        }).then((response) => {
            console.log(response);
            this.$store.dispatch('loadTasks');
        }, (error) => {
            console.log(error);
        })
        // Reset our form values
        this.form.content = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.content = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>