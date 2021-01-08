  <template>
  <div class="section admin-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <strong class="card-title">All Courses</strong>
              <button class="btn btn-success" style="float:right;">
                <router-link to="/admin/addrole">Add</router-link>
              </button>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(x,index) in $store.state.data.roles" :key="index">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{x.name}}</td>
                    <td id="actions">
                      <a class="btn btn-info btn-block" @click="editData(index)">
                        <i class="fa fa-pencil"></i> Edit
                      </a>
                      <a class="btn btn-danger btn-block" @click="deleteData(x.id)">
                        <i class="fa fa-trash"></i> Delete
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div v-show="feedback" class="card feedback">
          <span class="fa fa-close absolute" @click="feedback = false"></span>
          <p v-for="error in errors" v-bind:key="error" class="text-danger">{{error}}</p>
          <p class="text-success">{{success}}</p>
        </div>
        <div id="editModal" v-show="showEdit">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Modal Heading</h4>
              <button type="button" class="close" @click="resetEdit()">&times;</button>
            </div>
            <div class="modal-body">
              <form action ref="regForm" id="course">
                <div class="row">
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                      <label for="fname">Role Name</label>
                      <input type="text" class="form-control" v-model="editForm.name" id="fname" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <div style="text-align:center; width:100%;">
                <input
                  type="button"
                  :disabled="button.disabled"
                  @click="edit(this)"
                  :value="button.value"
                  class="btn btn-success"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editForm: {
        name: "",
        id: ""
      },
      button: {
        disabled: false,
        value: "Edit"
      },
      showEdit: false,
      errors: [],
      success: "",
      feedback: false
    };
  },
  created() {
    console.log(this.$store.state.data.roles);
  },
  methods: {
    editData(index) {
      var roles = this.$store.state.data.roles;
      for (var x in roles[index]) {
        var role = roles[index];
        var key = x;

        if (key in this.editForm) {
          this.editForm[key] = role[x];
        }
      }
      this.showEdit = true;
    },
    edit(event) {
      this.button.value = "Editing";
      this.button.disabled = true;
      var validate = this.validate();
      console.log(this.editForm);
      if (validate == true) {
        var url = this.indexurl + "/api/role/update" + this.editForm.id;
        this.axios
          .put(url, this.editForm, {
            headers: {
              Authorization: "Bearer " + this.token()
            }
          })
          .then(response => {
            console.log(response);
            if (resonse.status == 200) {
              this.success = response.data;
              setTimeout(function() {
                this.resetEdit();
              }, 3000);
            }
          })
          .catch(error => {
            // console.log(error.response);
            console.log(error);
          });
        var obj = this;
        setTimeout(function() {
          obj.button.value = "Edit";
          obj.button.disabled = false;
          obj.resetEdit();
        }, 3000);
      } else {
        this.feedback = true;
      }
    },
    validate() {
      var form = this.editForm;
      this.errors.splice(0);
      if (form.name && form.id) {
        return true;
      }

      if (!form.name) {
        this.errors.push("role name is required");
      }

      if (!form.id) {
        this.errors.push("error");
      }

      return false;
    },
    resetEdit() {
      this.showEdit = false;
      this.editForm = {
        name: "",
        id: ""
      };
    },
    deleteData(id) {
      var url = this.indexurl + "api/Role/" + id;
      this.axios
        .delete(url, {
          headers: {
            Authorization: "Bearer " + this.token()
          }
        })
        .then(response => {
          if (response.status == 200) {
            this.success = response.data;
            this.feedback = true;
          }
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
        });
    }
  }
};
</script>