<template>
    <section  class="mt-5 card">
      <h3 class="text-center">
        Welcome, To The ToDo List App !
      </h3>
      <p class="text-center my-5">
        Please <RouterLink class="" to="/register">Register</RouterLink> 
        or <RouterLink class="" to="/login">Login</RouterLink> to 
        your account to continue.
      </p>
    </section>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
    name:'Welcome',
    components:{
        RouterLink,
    }
}
</script>