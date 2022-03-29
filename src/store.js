
import { createStore } from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://54.144.155.145/api'

export default createStore({
  //initial State
  state: {
    success: '',
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
  },
  //state Mutations
  mutations: {
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },

    AUTH_SUCCESS(state, token, user) {
      state.status = 'success'
      state.token   = token
      state.user    = user
    },

    AUTH_ERROR(state) {
      state.status = 'error'
    },

    AUTH_LOGOUT(state) {
      state.status = ''
      state.token = ''
      state.user = {}
    },

  },
  //actions
  actions: {

    //Login user
    LOGIN({ commit }, credentials) {
      //return a promise object
      return new Promise((resolve, reject) => {
        //set loading status
        commit('AUTH_REQUEST')
        //attempt login
        axios.post(`${BASE_URL}/login`, credentials)
        .then(response => {
            //on success, 
            const token = response.data.user.token
            const user  = response.data.user
            //set Token and User data in Local Storage
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            //Set Axios default header containing the token
            axios.defaults.headers.common['Authorization'] = "Bearer" +token
            //set Token and User data in State
            commit('AUTH_SUCCESS', token, user)
            resolve(response)
        }).catch(err => { 
            //on error, set status to error
            commit('AUTH_ERROR')
            localStorage.removeItem('token')
            reject(err)

        })
      })
    },

    REGISTER({ commit }, credentials) {
      //return a promise object
      return new Promise((resolve, reject) => {
        //set loading status
        commit('AUTH_REQUEST')
        //attempt Registration
        axios.post(`${BASE_URL}/register`, credentials)
        .then(response => {
            //resolve promise
            resolve(response)
        })
        .catch(err => {
            //on error, set status to error 
            commit('AUTH_ERROR')
            //remove token from local storage
            localStorage.removeItem('token')
            reject(err)
        })
      })
    },

    LOGOUT({ commit }) {
      //Return promise object
      return new Promise((resolve) => {
        //remove state values of status, token and user
        commit('AUTH_LOGOUT')
        //Call logout api
        axios.post(`${BASE_URL}/logout`)
        .then(response => {
            //on success, remove token and user data from local storage
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            //delete axios default header
            delete axios.defaults.headers.common['Authorization']
            resolve(response)
        }).catch(err => {
          //on error set status state value to error 
            commit('AUTH_ERROR')
            localStorage.removeItem('token')
            reject(err)
        })
      })
    }
  },

  getters: {
    //To check if the user is currently logged in
    isLoggedIn: state => !!state.token,
  },
})
