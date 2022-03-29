<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">TODO APP</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <!--Navigation Links-->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/">ToDo List</RouterLink>
                    </li>
                    <li v-if="loggedIn==true" class="nav-item">
                        <RouterLink class="nav-link" to="/create">Create New</RouterLink>
                    </li>
                </ul>
                <ul class="navbar-nav mb-2 mb-lg-0 d-flex">
                    <li v-if="loggedIn==false" class="nav-item">
                        <RouterLink class="nav-link" to="/register">Register</RouterLink>
                    </li>
                    <li v-if="loggedIn==false" class="nav-item">
                        <RouterLink class="nav-link" to="/login">Login</RouterLink>
                    </li>
                    <li v-if="loggedIn==true" class="nav-item">
                        <a class="nav-link" @click="logout()" >Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { RouterLink } from "vue-router";
import store from '@/store'

export default {
    name: 'Navbar',
    components:{
        RouterLink,
    },
    computed:{
        //Check if User is Logged In using VUEX Store getter
        loggedIn(){
            return store.getters.isLoggedIn;
        }
    },
    methods:{
        //Logout User
        logout(){
            //Dispatch LOGOUT action to the Store for logging user out and clearing the token and user data from local storage
            this.$store.dispatch('LOGOUT')
            .then(()=>{
                //Redirect user to Welcome Screen
                this.$router.push('/')
            })
            .catch((error)=>{
                console.log(error)
            });
        }
    }
}
</script>