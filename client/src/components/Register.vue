<template>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2 mt-5">
        <v-toolbar flat dense class="amber darken-3" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
        <form name = "nearby-shops-form">
          <v-text-field
          label="Email"
          v-model="email"
          ></v-text-field>
            <br>
            <v-text-field
            type = "password"
            label="Password"
            v-model="password"
            autocomplete='new-password'
          ></v-text-field>
        </form>
          <br>
          <div class = "error" v-html = "error" />
          <br>
          <v-btn class="amber darken-3" dark @click="register">Register</v-btn>
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
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      if (response.data.error) {
        this.error = response.data.error
      } else if (response.data.msg) {
        this.error = response.data.msg
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
