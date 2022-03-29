<template>
    <div class="card-custom row mb-3">
        <!-- UI for setting Todo Item as Completed / Although the provided API Collection is missing this feature, but still developed the UI.-->
        <div class="col-1">
        <Checkbox v-model="item.completed" :binary="true" />
        </div>
        <!-- ToDo Title -->
        <h4 class="todo-title col-7" :class="{completed: item.completed==1}">
            {{ item.title }}
        </h4>
        <!--Actions -->
        <!--View ToDo-->
        <div class="col-1 mx-1">
            <Button icon="pi pi-eye" @click="viewTodo(item.id)" class="p-button-sm p-button-rounded p-button-primary" />
        </div>
        <!--Delete ToDo-->
        <div class="col-1 mx-1">
            <Button icon="pi pi-trash" @click="deleteTodo(item.id)" class="p-button-sm p-button-rounded p-button-danger" />
        </div>
    </div>
</template>

<script>
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import axios from 'axios';

export default {
    name: 'ListItem',
    props: {
        item: Object,
        index: Number,
    },
    components:{
        Checkbox,
        Button,
        InputText,
    },
  methods:{

    //Delete ToDo Item
    async deleteTodo(id){
      try{
        const response = await axios.delete(`${this.BASE_URL}/item/${id}`);
        if(response.data.success==true){
          //emit todoDeleted Event, to remove the deleted item from List Array
          this.$emit('todoDeleted',id);
          //on success show success message
          this.$toast.add({severity:'success', summary: 'Success.', detail:'Todo Deleted.', life: 5000});
        }else{
          console.log(response.data)
        }
      }catch(error){
        console.log(error)
      }
    },

    //View Single ToDo
    viewTodo(id){
      this.$router.push(`/view/${id}`);
    }
  }
}
</script>



