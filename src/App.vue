<script>
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Toast from 'primevue/toast';

export default {
  name: 'App',
  components:{
    Navbar,
    RouterView,
    Toast
  }
}
</script>

<template>
  <section>
    <Navbar/>
    <RouterView />
    <Toast />
  </section>
</template>

<style>
@import "@/assets/base.css";
</style>
