<template>
  <v-toolbar fixed  class = "amber darken-3" dark>
    <v-toolbar-title class='title ml-4'>
      <span class="home" @click="navigateTo({name: 'home'})">Nearby Shops App</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
      <router-link to="register">
        <v-btn v-if="!$store.state.isUserLoggedIn" flat dark style="textDecoration: 'none'">
          Register
        </v-btn>
      </router-link>

      <router-link to="login">
        <v-btn v-if="!$store.state.isUserLoggedIn" flat dark>
          Login
        </v-btn>
      </router-link>

      <router-link to="nearby">
        <v-btn v-if="$store.state.isUserLoggedIn" flat dark style="textDecoration: 'none'">
          My Nearby Shops
        </v-btn>
      </router-link>

      <router-link to="preferred">
        <v-btn v-if="$store.state.isUserLoggedIn" flat dark>
          My Preferred Shops
        </v-btn>
      </router-link>
      <v-btn v-if="$store.state.isUserLoggedIn" @click="logout" flat dark style="textDecoration: 'none'">
        Log out
      </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  cursor: pointer;
}
</style>
