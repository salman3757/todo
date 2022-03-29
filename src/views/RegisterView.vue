<template>
  <section >
    <RegistrationForm @formSubmit="register" />
  </section>
</template>

<script>
import RegistrationForm from '../components/RegistrationForm.vue';

export default {
  name: 'RegisterView',
  components:{
    RegistrationForm
  },
  methods:{
    register(formData){
      //Dispatch LOGIN action to the Store for logging user in along with the user data 
      this.$store.dispatch('REGISTER', formData)
      .then(()=>{
        //on success show success message
        this.$toast.add({severity:'success', summary: 'Registration Successfull.', detail:'Please check your email.', life: 5000});
        //redirect to the login screen
        this.$router.push('login')
      }).catch((error)=>{
        //on error show error message
        this.$toast.add({severity:'error', summary: 'Registration Failed.', detail:'Some error occured. Please review entered data and try again.', life: 5000});
        console.log(error)
      });
    },
  }
}
</script>
