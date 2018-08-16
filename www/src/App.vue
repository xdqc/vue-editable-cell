<template>
  <div id="app">
    <img alt="SYSDM logo" src="./assets/logo.png" height="100">
    <VendorList msg="Welcome to SYSDM"/>
    
  </div>
</template>

<script>
import VendorList from './components/VendorList'

export default {
  name: 'App',
  components: {
    VendorList
  },
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
  }
</style>

