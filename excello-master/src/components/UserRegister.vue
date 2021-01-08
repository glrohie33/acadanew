<template>
  <div class id="ModalLogin" tabindex="-1" role>
    <div class="modal-content" style="float:none; margin:20px auto;">
      <div class="modal-body">
        <div class="wm-modallogin-form wm-register-popup" style="display:block;">
          <span class="wm-color form-title">create Your Account today</span>
          <form>
            <div v-show="feedback" class="card feedback">
              <span class="fa fa-close absolute" @click="feedback = false"></span>
              <p v-for="error in errors" v-bind:key="error" class="text-danger">{{error}}</p>
              <p class="text-success">{{success}}</p>
            </div>
            <ul>
              <div class="row">
                <div class="col-md-6">
                  <li>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="First Name"
                      v-model="register.firstName"
                    />
                  </li>
                </div>
                <div class="col-md-6">
                  <li>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last Name"
                      v-model="register.lastName"
                    />
                  </li>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <li>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      v-model="register.username"
                    />
                  </li>
                </div>
                <div class="col-md-12 col-sm-12">
                  <li>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Email"
                      v-model="register.email"
                    />
                  </li>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <li>
                    <input type="date" class="form-control" v-model="register.dateOfBirth" />
                  </li>
                </div>
                <div class="col-md-12 col-sm-12">
                  <li>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Phone Number"
                      v-model="register.phoneNumber"
                    />
                  </li>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <li>
                    <div class="input-group">
                      <input
                        :type="type"
                        class="form-control"
                        v-model="register.password"
                        placeholder="Password"
                      />
                      <div class="input-group-addon">
                        <span class="input-group-text" @click="pass(this)">
                          <i :class="icon"></i>
                        </span>
                      </div>
                    </div>
                  </li>
                </div>
              </div>
              <li style="text-align:center;">
                <input type="button" ref="submit" value="Create Account" @click="Register()" />
              </li>
            </ul>
          </form>
          <ul class="wm-login-social-media"></ul>
          <p>
            Already a member?
            <router-link to="/login">Sign-in Here!</router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
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
      var btn = this.$refs.submit;
      this.errors.splice(0);
      if (
        reg.firstName &&
        reg.lastName &&
        reg.username &&
        reg.dateOfBirth &&
        reg.email &&
        reg.phoneNumber &&
        reg.password &&
        reg.password.length > 5
      ) {
        reg.roles = ["User"];
        var url = this.indexurl + "api/Auth/register";
        btn.toggleAttribute("disabled");

        this.axios
          .post(url, reg)
          .then(response => {
            btn.toggleAttribute("disabled");

            if (response.data.code == 200) {
              this.success = response.data.message;
              this.register = {
                firstName: "",
                lastName: "",
                username: "",
                dateOfBirth: "",
                email: "",
                phoneNumber: "",
                roles: [],
                password: ""
              };
              this.feedback = true;
              var obj = this;
              setTimeout(function() {
                obj.$router.push("/login");
              }, 2000);
            }
          })
          .catch(error => {
            btn.toggleAttribute("disabled");
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

<style lang="scss"  scoped>
.modal-content {
  float: none !important;
}
</style>