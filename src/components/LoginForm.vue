<template>
    <form @submit.prevent="submitForm()" class="mt-5 card p-5 border border-light rounded">
      <h3 class="text-center mb-5 ">
        Login
      </h3>
      <!--Email Validation Errors-->
      <small v-if="errors.email" class="p-error text-small">{{ errors.email }}</small>
      <!--Email Input-->
      <div class="p-inputgroup mb-4">
          <span class="p-inputgroup-addon">
              <i class="pi pi-envelope"></i>
          </span>
          <InputText class="w-100" v-model="email" placeholder="Email" v-bind:class="{ 'p-invalid': errors.email }" />
      </div>
      <!--Password Validation Errors-->
      <small v-if="errors.password" class="p-error text-small">{{ errors.password }}</small>
      <!--Password Input-->
      <div class="p-inputgroup mb-4">
          <span class="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
          </span>
          <Password class="w-100" v-model="password" :feedback="false" placeholder="Password" v-bind:class="{ 'p-invalid': errors.password }" toggle-mask/>
      </div>
      <!--Form Submit Button-->
      <Button  type="submit" label="Login" class="p-button-rounded w-100"  />
    </form>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';

export default{
    name:'LoginForm',
    components:{
        InputText,
        Button,
        Password,
    },
    data(){
        return {
            email:'',
            password:'',
            errors:{
                email:'',
                password:'',
            }
        }
    },
    methods:{

        //Emit 'formSubmit' Event along with User's Login Credentials on Form Submit
        submitForm(){
            //validate Input data
            if(this.validateInputs()==false){
                return false;
            };
            this.$emit('formSubmit', {email: this.email, password: this.password})
        },

        //Initialize Error Fields
        emptyErrors(){
            this.errors.email='';
            this.errors.password='';
        },

        //Validate Input Data provided by the User and Set appropriate Error Messages
        validateInputs(){
            this.emptyErrors();
            if(this.email==''){
                this.errors.email='Email is required.';
            }
            if(this.password==''){
                this.errors.password='Password is required.';
            }
            if(this.email=="" || this.password==""){
                return false;
            }
        },
    }
};
</script>