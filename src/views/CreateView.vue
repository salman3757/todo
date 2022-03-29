<template>
  <section>
    <TodoForm @formSubmit="createTodo" label="Create" />
  </section>
</template>

<script>
import axios from 'axios';
import TodoForm from '../components/TodoForm.vue';

export default {
  name: 'CreateView',
  components:{
    TodoForm
  },
  data(){
    return {
      title:'',
      description:'',
    }
  },
  methods:{

    //Create New ToDo
    async createTodo(todo){
      try{
        const response = await axios.post(`${this.BASE_URL}/item`, todo);
        //Redirect user to Todo List Page on success
        if(response.data.success==true){
          this.$router.push('/');
        }else{
          console.log(response.data)
        }

      }catch(error){
        console.log(error)
      }
    },
    
  }
}
</script>

