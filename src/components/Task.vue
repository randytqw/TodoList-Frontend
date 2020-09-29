<template>
    <b-container class="bv-example-row">
        <b-row>
            <b-col>
                <h1>To do list</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <Form/>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-list-group>
                    <b-list-group-item v-for= "task in tasks" v-bind:key="task._id" >
                        <b-row>
                            <b-col cols="8">
                                <h6>{{task.content}}</h6>
                            </b-col>
                            <b-col cols="2">
                                <b-button 
                                id="show-btn" 
                                variant="primary" 
                                class="btn-sm btn-block" 
                                @click="$bvModal.show('bv-modal-example')"
                                >Edit</b-button>
                                    <b-modal id="bv-modal-example" hide-footer>
                                        <template v-slot:modal-title>
                                            Edit Task
                                        </template>
                                            <div class="d-block text-center">
                                                <input v-model="form.task" class="form-control" :placeholder="task.content">
                                            </div>
                                            <b-button class="mt-3" 
                                            block @click="$bvModal.hide('bv-modal-example')"
                                            v-on:click="deleteId(task._id)"
                                            >Submit</b-button>
                                    </b-modal>
                            </b-col>
                            <b-col cols="2">
                                <b-button  
                                variant="danger" 
                                class="btn-sm btn-block" 
                                v-on:click="deleteId(task._id)"
                                >
                                    delete 
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Form from './Form.vue';
import axios from 'axios';
import {mapState} from "vuex";

export default {
    name: 'Task',
    components: {
        Form
    },
    data() {
      return {
        form: {
          task:"",
        },
        show: true
        }
    },
    computed: mapState(['tasks']),
    created() {
        this.$store.dispatch('loadTasks');
    },
    methods: {
        deleteId (id) {
            var url = "http://localhost:3000/delete/" + id;
            console.log(url);
            axios.delete(url, {data:{}}).then(response=>{
                console.log(response);
                this.$store.dispatch('loadTasks');
            }).catch(error=>{
                console.log(error);
            })
        },
        editId(id) {
            var url = "http://localhost:3000/edit/" + id;
            axios.put(url, {content: this.form.task}).then(response=>{
                console.log(response);
                this.$store.dispatch('loadTasks');
            }).catch(error=>{
                console.log(error);
            })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    font-style: italic;
}
h3 {
  margin: 40px 0 0;
}
h6 {
  width: 70%;
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
