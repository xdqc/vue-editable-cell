<template>
  <div class="user-list">
    <h3 v-if="title">{{ title }}</h3>
    <div>
      <b-table striped hover outlined small fixed :items="userInfo" :fields="fields" :current-page="currentPage" :per-page="perPage">    
          <template slot="index" slot-scope="data">{{data.index + 1}}</template>
          <EditableCell slot="name" slot-scope="data" table="users" column="name" type="text" :id="data.item.id" :value="data.item.name" v-on:edit_value="data.item.name=$event"></EditableCell>
          <EditableCell slot="phone" slot-scope="data" table="users" column="phone" type="tel" :id="data.item.id" :value="data.item.phone" v-on:edit_value="data.item.phone=$event"></EditableCell>
          <template slot="address" slot-scope="data">{{data.item.street + ', ' + data.item.suburb}}</template>
          <template slot="show_details" slot-scope="row">
            <b-form-checkbox @click.native.stop @change="row.toggleDetails" v-model="row.detailsShowing"></b-form-checkbox>
          </template>
          <template slot="row-details" slot-scope="row">
            <b-card @blur="row.toggleDetails">
              <b-row class="mb-2" v-for="col in ['race', 'nation', 'university', 'skill', 'diag', 'proc', 'drug', 'note'] " :key="col">
                <b-col sm="3" class="text-sm-right"><b>{{ col | capitalize }}:</b></b-col>
                <b-col><EditableCell table="users" :column="col" type="text" :id="row.item.id" :value="row.item[col]" v-on:edit_value="row.item[col]=$event"></EditableCell></b-col>
              </b-row>
              <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
            </b-card>
          </template>
      </b-table>
      <b-pagination v-model="currentPage" :per-page="perPage" :total-rows="userInfo.length" hide-ellipsis align="center"></b-pagination>
    </div>
  </div>
</template>

<script>
import EditableCell from "./EditableCell";
import axios from "axios";

export default {
  //`name` is analogy to java class name
  name: "UserList",
  components: {
    EditableCell
  },
  //`props` is analogy to arguments of java class overloaded constructor that can pass-in data from outside of the class
  props: {
    title: String
  },
  //`data` is analogy to java class property(private variables), must be a function-returned object
  data() {
    return {
      url: process.env.VUE_APP_URL_API,
      userInfo: [],
      currentPage: 1,
      perPage: 20,
      fields: [
        { key: "index", label: "#", class: "table-index" },
        { key: "name" },
        {
          key: "sex",
          class: "table-sex",
          formatter: value => (value == 1 ? "M" : "F")
        },
        {
          key: "dob",
          label: "Age",
          class: "table-age",
          sortable: true,
          formatter: value =>
            Math.floor((new Date() - new Date(value)) / (1000 * 86400 * 365))
        },
        { key: "phone" },
        { key: "address" },
        {
          key: "handicapped",
          sortable: true,
          class: "table-handicapped"
        },
        { key: "show_details", label: "Details", class: "table-details" }
      ]
    };
  },
  //`mounted` is analogy to java constructor, being called automatically
  mounted() {
    axios.get(this.url + "/users").then(resp => (this.userInfo = resp.data));
  },
  methods: {},
  filters: {
    capitalize: value => value[0].toUpperCase() + value.slice(1)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
.table-index {
  width: 20px !important;
}
.table-age,
.table-sex,
.table-details {
  width: 60px !important;
}
</style>
