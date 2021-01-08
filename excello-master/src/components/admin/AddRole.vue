<template>
  <section class="admin-section">
    <div class="container">
      <div class="row justify-center">
        <div class="card" id="register">
          <div class="card-header">
            <strong class="card-title">Add Roles</strong>
            <button class="btn btn-success" style="float:right;">
              <router-link to="/admin/role">All Roles</router-link>
            </button>
          </div>
          <div class="card-body">
            <form action ref="regForm" id="course">
              <div v-show="feedback" class="card feedback">
                <span class="fa fa-close absolute" @click="feedback = false"></span>
                <p v-for="error in errors" v-bind:key="error" class="text-danger">{{error}}</p>
              </div>

              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for="fname">Role Name</label>
                    <input type="text" class="form-control" v-model="role.Name" id="fname" />
                  </div>
                </div>
              </div>

              <div class="row" style="justify-content:center;">
                <input
                  type="button"
                  @click="AddInstitution()"
                  value="Add Role"
                  class="btn btn-success"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      role: {
        Name: ""
      },
      errors: [],
      feedback: false
    };
  },
  methods: {
    AddInstitution() {
      var token = this.token();
      var val = this.validate();
      if (val) {
        var formData = this.createform.data(this.role);
        var url = this.indexurl + "api/Role/add";
        this.axios
          .post(url, this.role, {
            headers: {
              Authorization: "Bearer " + this.token()
            }
          })
          .then(resonse => {
            console.log(response);
            if (resonse.status == 200) {
              this.success = response.data;
              this.$router.push("/role");
            }
          })
          .catch(error => {
            if (error.response) {
              this.errors.push(error.response.data.message);
            } else {
              console.log(error.response);
            }
            this.feedback = true;
          });
      } else {
        this.feedback = true;
      }
    },
    validate() {
      var form = this.role;
      this.errors.splice(0);
      if (form.Name) {
        return true;
      }

      if (!form.Name) {
        this.errors.push("role name is required");
      }

      return false;
    }
  }
};
</script>