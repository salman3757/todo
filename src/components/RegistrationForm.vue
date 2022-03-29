<template>
    <form @submit.prevent="submitForm()" class="mt-5 card p-5 border border-light rounded ">
      <h3 class="text-center mb-5 ">
        Registration
      </h3>
      <!--Email Validation-->
      <small v-if="errors.email" class="p-error text-small">{{ errors.email }}</small>
      <!--Email Input-->
      <div class="p-inputgroup mb-4">
          <span class="p-inputgroup-addon">
              <i class="pi pi-envelope"></i>
          </span>
          <InputText class="w-100" v-model="email" placeholder="Email" v-bind:class="{ 'p-invalid': errors.email }" />
      </div>
      <!--Password Validation-->
      <small v-if="errors.password" class="p-error text-small">{{ errors.password }}</small>
      <!--Password Input-->
      <div class="p-inputgroup mb-4">
          <span class="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
          </span>
          <Password class="w-100" v-model="password" :feedback="false" placeholder="Password" v-bind:class="{ 'p-invalid': errors.password }" toggle-mask/>
      </div>
      <!--Password Confirmation Validation-->
      <small v-if="errors.passwordConfirmation" class="p-error text-small">{{ errors.passwordConfirmation }}</small>
      <!--Password Confirmation Input-->
      <div class="p-inputgroup mb-4">
          <span class="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
          </span>
          <Password class="w-100" v-model="passwordConfirmation" :feedback="false" placeholder="Confirm Password" v-bind:class="{ 'p-invalid': errors.passwordConfirmation }" toggle-mask/>
      </div>
      <!--Form Submit Button-->
      <Button  type="submit" label="Register" class="p-button-rounded w-100" />
    </form>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';

export default {
  name: 'RegisterView',
  components:{
    InputText,
    Button,
    Password,
},
  data(){
    return {
      email:"",
      password:"",
      passwordConfirmation:"",
      errors:{
        email:'',
        password:'',
        passwordConfirmation:''
      }
    }
  },
  methods:{

    //Emit 'formSubmit' Event along with User's Data on Form Submit
    submitForm(){
      //Validate Input data
      if(this.validateInputs()==false){
          return false;
      };
      this.$emit('formSubmit', {email: this.email, password:this.password, password_confirmation:this.passwordConfirmation});
    },

    //Initialize Error Fields
    emptyErrors(){
      this.errors.email='';
      this.errors.password='';
      this.errors.passwordConfirmation='';
    },

    //Validate Input Data provided by the User and Set appropriate Error Messages
    validateInputs(){
      this.emptyErrors();
      if(this.email==""){
        this.errors.email='Email is required.';
      }
      if(this.password==""){
        this.errors.password='Password is required.';
      }
      if(this.passwordConfirmation==""){
        this.errors.passwordConfirmation='Password Confirmation is required.';
      }
      if(this.password != "" && this.passwordConfirmation != "" && this.password != this.passwordConfirmation){
        this.errors.passwordConfirmation='Password and Password Confirmation do not match.';
      }
      if(this.email!="" && this.validateEmail(this.email)==false){
        this.errors.email='Email must be a valid email address.';
      }
      if(this.email=="" || this.password=="" || this.passwordConfirmation=="" || this.password != this.passwordConfirmation || this.validateEmail(this.email)==false){
        return false;
      }
    },

    //Validate Email Format as a valid Email address using Regular Expressions
    validateEmail(email){
      let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
      return regex.test(email);
    }
  }
}
</script>