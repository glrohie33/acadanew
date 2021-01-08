<template>
  <section class="admin-section">
    <div class="container">
      <div class="row justify-center">
        <div class="card" id="register">
          <div class="card-header">
            <h2>Add User</h2>
          </div>
          <div class="card-body">
            <hr />
            <form action ref="regForm">
              <div v-show="feedback" class="card feedback">
                <span class="fa fa-close absolute" @click="feedback = false"></span>
                <p v-for="error in errors" v-bind:key="error" class="text-danger">{{error}}</p>
                <p class="text-success">{{success}}</p>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="fname">First Name</label>
                    <input type="text" class="form-control" v-model="register.firstName" id="fname" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for>Last Name</label>
                    <input type="text" class="form-control" v-model="register.lastName" name id />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for="fname">Username</label>
                    <input type="text" class="form-control" v-model="register.username" id="fname" />
                  </div>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for>Email</label>
                    <input type="text" class="form-control" v-model="register.email" name id />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for="fname">Date Of Birth</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="register.dateOfBirth"
                      id="fname"
                    />
                  </div>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for>Phone Number</label>
                    <input type="text" class="form-control" v-model="register.phoneNumber" name id />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for="fname">Password</label>
                    <div class="input-group">
                      <input
                        :type="type"
                        class="form-control"
                        v-model="register.password"
                        id="fname"
                      />
                      <div class="input-group-prepend">
                        <span class="input-group-text" @click="pass(this)">
                          <i :class="icon"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for="fname">Role</label>
                    <div class="form-check" v-for="x in $store.state.data.roles" :key="x.id">
                      <label class="form-check-label" :for="x.id">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          v-model="register.roles"
                          :id="x.id"
                          :value="x.name"
                        />
                        {{x.name}}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {{register.roles}}
              <div class="row" style="justify-content:center;">
                <input type="button" @click="Register()" value="Register" class="btn btn-success" />
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
      register: {
        firstName: "",
        lastName: "",
        username: "",
        dateOfBirth: "",
        email: "",
        phoneNumber: "",
        roles: [],
        password: ""
      },
      feedback: false,
      errors: [],
      regForm: "",
      rules: "",
      success: "",
      type: "password",
      icon: "fa fa-lock"
    };
  },
  methods: {
    Register() {
      var reg = this.register;
      this.errors.splice(0);
      if (
        reg.firstName &&
        reg.lastName &&
        reg.username &&
        reg.dateOfBirth &&
        reg.email &&
        reg.phoneNumber &&
        reg.password &&
        reg.roles.length > 0 &&
        reg.password.length > 5
      ) {
        var url = this.indexurl + "api/Auth/register";
        this.axios
          .post(url, reg)
          .then(response => {
            if (response.data.code == 200) {
              this.success = response.data.message;
              this.feedback = true;
            }
          })
          .catch(error => {
            this.errors.push(error.response.data.message);
            this.feedback = true;
          });
      } else {
        this.catchErrors(reg);
      }
    },
    catchErrors(reg) {
      if (!reg.firstName) {
        this.errors.push("first name is required");
      }

      if (!reg.lastName) {
        this.errors.push("last name is required");
      }

      if (!reg.email) {
        this.errors.push("email is required");
      }
      if (!reg.username) {
        this.errors.push("please enter username");
      }

      if (!reg.dateOfBirth) {
        this.errors.push("date of birth please");
      }

      if (!reg.password) {
        this.errors.push("password is required");
      }

      if (reg.password.length < 6) {
        this.errors.push("password must be more than 5");
      }
      if (reg.roles.length < 6) {
        this.errors.push("please select a role for the user");
      }

      this.feedback = true;
    },
    pass(ele) {
      if (this.type == "password") {
        this.type = "text";
        this.icon = "fa fa-unlock";
      } else {
        this.type = "password";
        this.icon = "fa fa-lock";
      }
    }
  }
};
</script>