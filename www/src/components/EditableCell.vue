<template>
    <span :class="table+'-'+column">
        <a v-on:click.prevent.stop="showEdit" v-show="!isEdditing" href="#">{{ value ? value : add_value }}</a>
        <b-input-group v-show="isEdditing">
            <b-form-input :type="type" :value="value" size="sm" ref="input" :placeholder="'add new '+column" @blur.native.capture="renameVendor($event, id, column, $event.target.value)" @keyup.enter.native="$event.target.blur()" @keyup.esc.native="$event.target.blur()"></b-form-input>
            <!-- <b-input-group-append> -->
                <!-- <b-button size="sm" variant="outline-success" @mousedown="renameVendor($event, id, column, $refs.input.$el.value)">confirm</b-button> -->
                <!-- <b-button size="sm" variant="outline-danger">x</b-button> -->
            <!-- </b-input-group-append> -->
        </b-input-group>
        <b-alert variant="danger" dismissible  :show="showDismissibleAlert"  @dismissed="showDismissibleAlert=false">Data error!</b-alert>
    </span>
</template>

<script>
import axios from "axios";

export default {
  name: "EditableCell",
  props: ["table", "column", "id", "value", "type"],
  data() {
    return {
      url: process.env.VUE_APP_URL_API,
      usedb: process.env.VUE_APP_USE_DB,
      isEdditing: false,
      add_value: "<null>",
      showDismissibleAlert: false
    };
  },
  methods: {
    showEdit: function() {
      this.isEdditing = true;
      this.$nextTick(() => this.$refs.input.focus());
    },
    renameVendor: function(event, v_id, v_column, v_value) {
      if (v_value.trim() != this.value) {
        if (this.usedb == "mysql") {
          axios
            .put(this.url + "/" + this.table + "/" + v_id, {
              [v_column]: v_value.trim()
            })
            .then(resp => {
              if (resp.data.changedRows === 1) {
                if (resp.data.warningCount !== 0) {
                  this.showDismissibleAlert = true;
                } else {
                  this.$emit("edit_value", v_value);
                  this.showDismissibleAlert = false;
                }
              }
            });
        } else if (this.usedb == "dynamo") {
          // eslint-disable-next-line
          var docClient = new AWS.DynamoDB.DocumentClient();

          var params = {
            TableName: "test-table",
            Key: { id: v_id },
            UpdateExpression: "set #col = :v ",
            ExpressionAttributeNames: { "#col": v_column },
            ExpressionAttributeValues: {
              ":v": v_value.trim()
            }
          };

          docClient
            .update(params)
            .promise()
            .then((data, err) => {
              if (err) console.log(err);
              else {
                this.$emit("edit_value", v_value);
                this.showDismissibleAlert = false;
              }
            });
        }
      }
      this.isEdditing = false;
    }
  }
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
