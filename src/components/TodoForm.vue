<template>
    <form @submit.prevent="submitForm()" class="card mt-5 p-5 border border-light rounded mw-60">
        <h3 class="text-center mb-5 ">
            {{ label }} ToDo
        </h3>
        <!--ToDo Title Input-->
        <div class="mb-4">
            <div class="field">
                <InputText v-model="form.title" v-bind:class="{ 'p-invalid': errors.title }" class="w-100" placeholder="Title"/>
                <!--Validation Errors of Title-->
                <small v-if="errors.title" class="p-error text-small">{{ errors.title }}</small>
            </div>
        </div>
        <!--ToDo Description Input-->
        <div class="mb-4 ">
            <div class="field">
                <Textarea v-model="form.description" v-bind:class="{ 'p-invalid': errors.description }" class="w-100" placeholder="Description"  rows="3" cols="20" />
                <!--Validation Errors of Description-->
                <small v-if="errors.description" class="p-error text-small">{{ errors.description }}</small>
            </div>
        </div>
        <!--Form Submit Button-->
        <Button  type="submit" :label="label" class="p-button-rounded w-100" @click="validateInputs()" />
    </form>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';

export default {
    name:'TodoForm',
    props:{
        label: String,
        todo: Object
    },
    components:{
        InputText,
        Button,
        Textarea,
    },
    data(){
        return {
            form:{
                title: this.todo?.title || "",
                description: this.todo?.description || "",
            },
            errors:{
                title:'',
                description:''
            },
        }
    },
    methods:{

        //Emit 'formSubmit' Event along with Input data on Form Submit after input validations
        submitForm(){
            if(this.validateInputs()==false){
                return false;
            };
            this.$emit('formSubmit', this.form)
        },

        //Initialize Error Fields
        emptyErrors(){
            this.errors.title='';
            this.errors.description='';
        },

        //Validate Input Data provided by the User and Set appropriate Error Messages
        validateInputs(){
            this.emptyErrors();
            if(this.form.title==''){
                this.errors.title='Title is required.';
            }
            if(this.form.description==''){
                this.errors.description='Description is required.';
            }
            if(this.form.title=='' || this.form.description==''){
                return false;
            }
        },
    }
}
</script>