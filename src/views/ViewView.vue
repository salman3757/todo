<template>
  <section>

    <!--Loading Spinner-->
    <ProgressSpinner v-if="loading==true && updating==false" class="mt-5 d-flex justify-content-center "  stroke-width="5"/>

    <!--View Single ToDo-->
    <SingleTodo v-else-if="loading==false && updating==false" :todo="todo" :updating="updating" @toggleUpdate="updating=true"/>

    <!--Update ToDo-->
    <TodoForm v-else @formSubmit="updateTodo" label="Update" :todo="todo" />
    
  </section>
</template>

<script>

import axios from 'axios';
import TodoForm from '../components/TodoForm.vue';
import SingleTodo from '../components/SingleTodo.vue';
import ProgressSpinner from 'primevue/progressspinner';

export default{
  name: 'ViewView',
  components:{
    TodoForm,
    SingleTodo,
    ProgressSpinner
},
  data(){
    return {
      todo:{},
      loading:true,
      updating:false,
    }
  },
  created(){
    this.getTodo();
  },
  methods:{
    //Fetch the Single Todod using Route Parameter Id 
    async getTodo(){
      try{
        //set loading to true before API call
        this.loading=true;
        const response = await axios.get(`${this.BASE_URL}/item/${this.$route.params.id}`);
        //set loading to false after API call
        this.loading=false;
        if(response.data.success==true){
          this.todo = response.data.item;
        }else{
          console.log(response.data.message)
        }
      }catch(error){
        this.loading=false;
        console.log(error)
      }
    },

    //Update the Todo Item
    async updateTodo(editedTodo){
      try{
        const response = await axios.put(`${this.BASE_URL}/item/${this.$route.params.id}`, editedTodo );
        if(response.data.success==true){
          this.todo = response.data.item;
          //redirect to List view
          this.$router.push(`/`);
        }else{
          console.log(response.data.message)
        }
      }catch(error){
        console.log(error)
      }
    },
  }
}
</script>

