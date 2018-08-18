<template>
  <div class="vendor-list">
    <h3 v-if="title">{{ title }}</h3>
    <div>
      <b-table striped hover outlined small fixed :items="vendorInfo" :fields="fields" :current-page="currentPage" :per-page="perPage">    
          <template slot="index" slot-scope="data">{{data.index + 1}}</template>
          <EditableCell slot="name" slot-scope="data" table="vendors" column="name" type="text" :id="data.item.id" :value="data.item.name" 
          v-on:edit_value="data.item.name=$event"></EditableCell>
          <!-- parent listen to event `edit_value` $emit by child -->
      </b-table>
      <b-pagination v-model="currentPage" :per-page="perPage" :total-rows="vendorInfo.length" hide-ellipsis align="center"></b-pagination>
    </div>
  </div>
</template>

<script>
import EditableCell from "./EditableCell";
import axios from "axios";

export default {
  //`name` is analogy to java class name
  name: "VendorList",
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
      usedb: process.env.VUE_APP_USE_DB,
      vendorInfo: [],
      currentPage: 1,
      perPage: 30,
      fields: [
        { key: "index", label: "#", class: "table-index" },
        {
          key: "type",
          sortable: true
        },
        {
          key: "name"
        }
      ]
    };
  },
  //`mounted` is analogy to java constructor, being called automatically
  created() {
    if (this.usedb == "mysql") {
      axios.get(this.url + "/vendors").then(resp => {
        this.vendorInfo = resp.data;
      });
    } else if (this.usedb == "dynamo") {
      // eslint-disable-next-line
      var docClient = new AWS.DynamoDB.DocumentClient();

      var params = {
        TableName: "test-table",
        FilterExpression: "attribute_exists(#t)",
        ExpressionAttributeNames: { "#t": "type" }
      };

      docClient
        .scan(params)
        .promise()
        .then((data, err)=> {
          if (err) console.log(err);
          else {
            this.vendorInfo = data.Items;
          }
        });
    }
  },
  computed: {},
  methods: {},
  filters: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
