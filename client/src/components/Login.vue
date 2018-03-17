<template>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2 mt-5">
        <v-toolbar flat dense class="amber darken-3" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
        <v-text-field
          label="Email"
          v-model="email"
        ></v-text-field>
          <br>
          <v-text-field
          type = "password"
          label="Password"
          v-model="password"
        ></v-text-field>
          <br>
          <div class = "error" v-html = "error" />
          <br>
          <v-btn class="amber darken-3" dark @click="login">Login</v-btn>
        </div>
      </div>
    </v-flex>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        if (this.$store.state.token) {
          this.$router.push({
            name: 'nearby'
          })
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: white;
}
</style>
