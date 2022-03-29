<template>
    <div v-if="updating==false" class="mt-5 container-custom card-custom">
        <!--Card Header-->
        <div class=" row mb-3">
            <!--ToDo Title-->
            <h4 class="todo-title col-10 text-center" :class="{completed: todo.completed==1}">
                <!-- <span class="todo-text"> -->
                {{ todo.title }}
                <!-- </span>  -->
            </h4>
            <!--Update ToDo Form Toggle Button-->
            <div class="col-1">
                <Button icon="pi pi-pencil" @click="$emit('toggleUpdate')" class="p-button-sm p-button-rounded p-button-success" />
            </div>
        </div>
        <!--Card Body-->
        <!--ToDo Description-->
        <div class="row px-5">
            <h5>
                Description: {{ todo.description }}
            </h5>
        </div>
    </div>
</template>

<script>
import Button from 'primevue/button';

export default {
    name: 'SingleTodo',
    props:{
        todo: Object,
        updating: Boolean
    },
    components:{
        Button,
    }
}
</script>