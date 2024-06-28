<template>
    <v-app class="app-background">
      <v-main>
        <v-container>
          <v-card class="pa-5 mt-5">
            <h1 class="fs-headline1 mb-6">Users</h1>
            <v-row align="center" justify="center" dense>
              <v-col cols="12" md="6" v-for="user in users" :key="user.id">
                <v-card class="mx-auto" @click="goToUserProfile(user.id)">
                  <v-card-title>
                    <v-avatar left>
                      <img :src="user.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Avatar">
                    </v-avatar>
                    <span>{{ user.name }}</span>
                  </v-card-title>
                  <v-card-subtitle>{{ user.email }}</v-card-subtitle>
                  <v-card-text></v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserPage',
    data() {
      return {
        users: []
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const token = localStorage.getItem('access_token');
          const response = await axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.users = response.data.users;
        } catch (error) {
          console.error('Error fetching users:', error);
          if (error.response && error.response.status === 401) {
            alert('Unauthorized access. Please login again.');
            localStorage.removeItem('access_token');
            window.location.href = 'http://127.0.0.1:8000/api/login';
          }
        }
      },
      goToUserProfile(userId) {
        this.$router.push(`/profil/${userId}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .app-background {
    background-color: #f5f5f5 !important;
    min-height: 100vh;
  }
  
  .fs-headline1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #2c3e50;
  }
  
  .v-card {
    cursor: pointer;
  }
  </style>
  