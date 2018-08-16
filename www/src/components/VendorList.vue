<template>
  <div class="vendor-list">
    <h1>{{ msg }}</h1>
    <h3 v-if="title">{{ title }}</h3>
    <div>
      <table>
        <tr>
          <th>Type</th>
          <th>Name</th>
        </tr>
        <tr v-for="(vendor,i) in info" :key="i">
          <!-- `filter` syntex is like pipe: `echo sth | grep ...` -->
          <td>{{ vendor.type | upper }}</td>
          <!-- `v-bind:` is for referencing attr of dom elements to variables -->
          <td>
            <a v-on:click="isRename= isRename==i?-1:i;" v-show="isRename!=i" href="#">{{ vendor.name }}</a>
            <form v-show="isRename==i"><input type="text" v-model="vendor.name">
              <button v-on:click="renameVendor($event, vendor.id ,vendor.type, vendor.name)" type="submit">confirm</button>
              <button v-on:click="isRename=-1">x</button>
            </form>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  //`name` is analogy to java class name
  name: "HelloWorld",
  //`props` is analogy to arguments of java class overloaded constructor that can pass-in data from outside of the class
  props: {
    msg: String
  },
  //`data` is analogy to java class property(private variables), must be a function-returned object
  data() {
    return {
      title: "Vendors",
      url: process.env.VUE_APP_URL_API,
      info: null,
      isRename: -1
    };
  },
  //`mounted` is analogy to java constructor, being called automatically
  mounted() {
    axios
      .get(this.url + "/vendors")
      .then(resp => (this.info = resp.data))
      .then(info => (this.info = info.slice(100, 120)));
  },
  methods: {
    renameVendor: function(event, v_id, v_type, v_name) {
      if (event) {
        axios
          .put(this.url + "/vendors", {
            id: v_id,
            type: v_type,
            name: v_name
          })
          .then(resp => {
            if (resp.data.affectedRows === 1) this.isRename = -1;
          });
      }
    }
  },
  filters: {
    upper: value => String(value).toUpperCase()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table {
  margin: 0 auto;
}
td {
  text-align: left;
}
</style>
