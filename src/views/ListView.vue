<template>
  <section>
    
    <Welcome v-if="loggedIn==false"/>

    <div v-else class="container-custom mt-5">
      <h4 class="text-center mb-3">Hello, {{this.$store.state?.user?.email}}</h4>
      <!--Search Field-->
      <div class="card-custom row mb-5">
          <div class="p-inputgroup">
              <InputText placeholder="Search" v-model="searchText" @input="search()"></InputText>
              <Button icon="pi pi-search" class="p-button-success"></Button>
          </div>
      </div>
      
      <!--Show Spinner when Data is being Fetched-->
      <ProgressSpinner v-if="list.length==0 && loading==true && searchResults.length==0 && searchText.length==0" class="d-flex justify-content-center "  stroke-width="5"/>
      
      <!--List of "All" ToDos.-->
      <div v-else-if="searchResults.length==0 && searchText.length==0" ref="scrollComponentRef">
        <ListItem v-for="(item) in list" :key="item.id" :item="item" @todoDeleted="removeDeletedTodo"/>
      </div>
      
      <!--List of "Searched" ToDos.-->
      <div v-else-if="searchResults.length>0">
        <ListItem v-for="(item) in searchResults" :key="item.id" :item="item" @todoDeleted="removeDeletedTodo"/>
      </div>
      
      <!--Display 'No Search Results Found' Message, when no results are found for search input.-->
      <div v-else-if="searchResults.length==0 && searchText.length>0" class="mt-5 card-custom">
        <div class="my-5">
          <h4 class="todo-title text-center">
              No Results found for "{{ searchText }}".
          </h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import ListItem from '../components/ListItem.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';

import Welcome from '../components/Welcome.vue';
import store from '@/store'

export default {
  name:'ListView',
  components:{
    ListItem,
    Button,
    InputText,
    ProgressSpinner,
    Welcome
},
  data(){
    return {
      list:[],
      loading:true,
      moreItemsAvailable: true,
      searchText:'',
      searchResults:[],
      nextPage:1,
    }
  },
  computed:{
    //Check if User is Logged In using VUEX Store getter
      loggedIn(){
          return store.getters.isLoggedIn;
      }
  },

  //Fetch the First Page of the List of Todos, bbefore component is Mounted 
  beforeMount(){
    this.getTodos();
  },

  //Add Scroll Event Listener for Infinite Scroll Pagination Data Fetching
  mounted(){
    window.addEventListener("scroll", this.handleScroll)
  },

  //Remove Scroll Event Listener on component unmount
  unmounted(){
    window.removeEventListener("scroll", this.handleScroll)
  },

  methods:{


    handleScroll(){
      //using Vue $ref to target the Div containing the List of All Todos
      let scrollComponent = this.$refs.scrollComponentRef;
      //check if the user has scrolled to the bottom of our content, by checking if the bottom of the content is visible on the screen.
      //And also check if more Todo items are avaiable to fetch or not
      if (scrollComponent.getBoundingClientRect().bottom < window.innerHeight && this.moreItemsAvailable==true) {
        //Fetch next page of Todos if user scrolled to the bottom
        this.getTodos();
      }
    },

    //Fetch list of Toods
    async getTodos(){
      //Check before making the API call, if the user is logged in and if more todos aare available to fetch
      if(this.loggedIn==true && this.moreItemsAvailable==true){
        try{
          //set loading to true
          this.loading=true;
          //call the API
          const response = await axios.get(`${this.BASE_URL}/items?page=${this.nextPage}`);
          //If the Next page url is null, meaning if the current page is the last page, set moreItemsAvailable to false
          if(response.data.items.next_page_url==null || response.data.items.last_page==this.nextPage){
            this.moreItemsAvailable=false;
          }
          //set loading to false
          this.loading=false;
          //On success append the fetched Todos to the end of the Todo List Array
          if(response.data.success==true && this.nextPage<=response.data.items.last_page){
            this.list = [...this.list, ...response.data.items.data];
            this.nextPage++;
          }else{
            console.log(response.data)
          }
        }catch(error){
          this.loading=false;
          console.log(error)
        }
      }else{
        return false;
      }
    },

    //Search the Todo List Array
    search(){
      this.searchResults =  this.list.filter((item)=>{
        return item.title.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())
      })
    },

    //Remove the Deleted todo from the Todo List Array and the searchResults Array
    //called after successful delete api call by the ListItem component
    removeDeletedTodo(id){
      this.list = this.list.filter((item)=>{
        return item.id != id;
      })
      this.searchResults = this.searchResults.filter((item)=>{
        return item.id != id;
      })
    }
  }
}
</script>


