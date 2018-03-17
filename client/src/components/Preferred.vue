<template>
<div :key='value'>
  <!-- eslint-disable-next-line -->
  <div v-for="shop in preferredShops">
    <div class="content-card">
      <h3>{{ shop.name }}</h3>
      <img class="shop-pic" v-bind:src="shop.picture">
      <br>
      <v-btn class="red" v-bind:id="shop._id" small dark v-on:click="removeShop($event)">Remove</v-btn>
    </div>
  </div>
</div>
</template>

<script>
import GetPreferredShopsService from '@/services/GetPreferredShopsService'
import RemoveShopService from '@/services/RemoveShopService'
export default {
  data () {
    return {
      preferredShops: [],
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
        const response = await GetPreferredShopsService(this.$store.state.user.email)
        this.preferredShops = response.data
      } catch (err) {
        this.errors.push(err)
      }
    },
    removeShop: function (event) {
      const shopId = event.currentTarget.id
      RemoveShopService(shopId)
      this.preferredShops = []
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
  margin-left: 20px;
  margin-right: 20px;
}

</style>
