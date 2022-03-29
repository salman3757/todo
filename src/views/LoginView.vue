<template>
  <section>
    <LoginForm @formSubmit="login" />
  </section>
</template>

<script>

import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'LoginView',
  components:{
    LoginForm
  },
  methods:{
    login(formData){
      //Dispatch LOGIN action to the Store for logging user in along with the user credentials 
      this.$store.dispatch('LOGIN', formData)
      .then(()=>{
        //on success show success message
        this.$toast.add({severity:'success', summary: 'Login Successfull.', life: 5000});
        //redirect to the list view
        this.$router.push('/')
      })
      .catch((error)=>{
        //on error, show error message
        this.$toast.add({severity:'error', summary: 'Login Failed.', detail:'Invalid Credentials.', life: 5000});
        console.log(error)
      });
    },
    
  }
}
</script>
