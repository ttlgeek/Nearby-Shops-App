<template>
<div :key='value'>
  <!-- eslint-disable-next-line -->
  <div v-for="shop in shops">
    <div class="content-card" v-if="!(preferred.includes(shop._id))">
      <h3>{{ shop.name }}</h3>
      <img class="shop-pic" v-bind:src="shop.picture">
      <br>
      <v-btn class="red" v-bind:id="shop._id" small dark>Dislike</v-btn> <!-- I couldn't figure out how to implement it -->
      <v-btn class="green" v-bind:id="shop._id" small dark v-on:click="addShop($event)">Like</v-btn>
    </div>
  </div>
</div>
</template>

<script>
import GetAllShopsService from '@/services/GetAllShopsService'
import AddShopService from '@/services/AddShopService'
import GetPreferredShopsService from '@/services/GetPreferredShopsService'
export default {
  data () {
    return {
      shops: [],
      preferred: [],
      errors: [],
      value: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      try {
        const response = await GetAllShopsService()
        this.shops = response.data
        const preferredShops = await GetPreferredShopsService(this.$store.state.user.email)
        for (let i of preferredShops.data) {
          this.preferred.push(i._id)
        }
      } catch (err) {
        this.errors.push(err)
      }
    },
    addShop: function (event) {
      const shopID = event.currentTarget.id
      AddShopService(shopID)
      this.shops = []
      this.preferred = []
      this.getData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  display: inline-block;
  margin: 10px 10px 10px 10px;
  padding: 10px 10px 10px 10px;
}

.content-card {
  border: 2px solid black;
}

img {
  border: 2px solid black;
}

</style>
