<template>
  <div id="app">
    <b-jumbotron header="Bootstrap Vue" lead="" bg-variant="secondary" text-variant="white">
      <template slot="header">
        <img alt="SYSDM logo" src="./assets/logo.png" height="100">
        Bootstrap Vue
      </template>
      <template slot="lead">Welcome to SYSDM</template>
      <hr class="my-4">
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    </b-jumbotron>

    <b-container>
        <b-row>
          <!-- <MessageComponent></MessageComponent> -->
        </b-row>
        <b-row>
          <!-- <MapComponent></MapComponent> -->
        </b-row>
        <b-row class="table-grid-row">
            <b-col sm="12" md="3"><VendorList title="Vendors"/></b-col>
            <b-col sm="12" md="9"><UserList title="Users"/></b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import VendorList from './components/VendorList'
import UserList from './components/UserList'

export default {
  name: 'App',
  components: {
    VendorList,
    UserList
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
    margin-top: -20px;
  }
  .table-grid-row {
    margin: 0 -75px !important;
  }
</style>

