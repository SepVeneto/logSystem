<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld v-bind:msg='username' />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  computed:
  {
    username() {
      return this.GLOBAL.username;
    }
  }
}
</script>

<style scoped>
.home
{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

