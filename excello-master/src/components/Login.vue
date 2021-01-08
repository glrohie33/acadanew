<template>
  <section>
    <div class="container">
      <div class="row justify-center">
        <div class="card" id="register">
          <div class="card-header">
            <strong class="card-title">Login</strong>
          </div>
          <div class="card-body">
            <div class="col-md-12 log-img">
              <img src="../images/akada.jpeg" class="img-thumbnail" alt />
            </div>
            <hr />
            <form action ref="regForm">
              <div v-show="feedback" class="card">
                <span class="fa fa-close absolute" @click="feedback = false"></span>
                <p v-for="error in errors" v-bind:key="error" class="text-danger">{{error}}</p>
                <p class="text-success">{{success}}</p>
              </div>

              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for>Email</label>
                    <input type="text" class="form-control" v-model="login.username" name id />
                  </div>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for="fname">Password</label>
                    <div class="input-group">
                      <input :type="type" class="form-control" v-model="login.password" id="fname" />
                      <div class="input-group-prepend">
                        <span class="input-group-text" @click="pass(this)">
                          <i :class="icon"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row" style="justify-content:center;">
                <button
                  type="button"
                  @click="Login()"
                  ref="submit"
                  value="Login"
                  class="btn btn-success"
                >Login</button>
              </div>
            </form>
            <hr />
            <div class="col-md-12 log-info text-center">
              <p>
                Don't have an account?
                <router-link to="/register">Register</router-link>
              </p>
            </div>
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
      login: {
        username: "",
        password: ""
      },
      feedback: false,
      errors: [],
      regForm: "",
      success: "",
      rules: "",
      type: "password",
      icon: "fa fa-lock"
    };
  },
  methods: {
    Login() {
      var log = this.login;
      this.errors.splice(0);

      var btn = this.$refs.submit;

      if (log.username && log.password && log.password.length > 5) {
        var url = this.indexurl + "api/Auth/login";

        btn.toggleAttribute("disabled");
        this.axios
          .post(url, log)
          .then(response => {
            btn.toggleAttribute("disabled");
            if (response.data.token) {
              var token = {
                token: response.data.token,
                exp: new Date(response.data.expiration).getTime()
              };
              window.localStorage.setItem("token", JSON.stringify(token));
              var decode = this.jwt.decode(response.data.token);
              var key = this.key;
              var code = Array.isArray(decode[key])
                ? decode[key].toString()
                : decode[key];

              window.localStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.usern)
              );

              this.success = "Login Successful you will be redirected shortly";
              this.feedback = "true";

              setTimeout(() => {
                if (code.search("Admin") > -1) {
                  this.$router.push("/admin");
                  this.setDatas();
                } else {
                  this.$router.push("/dashboard");
                }
              }, 2000);
            }
          })
          .catch(error => {
            btn.toggleAttribute("disabled");
            if (!!error.response.data) {
              this.errors.push(error.respons.data);
            } else {
              this.errors.push("invalid username and passsword");
            }
            this.feedback = true;
          });
      } else {
        this.catchErrors(log);
      }
    },
    catchErrors(log) {
      console.log(log);
      if (!log.username) {
        this.errors.push("email is required");
      }

      if (!log.password) {
        this.errors.push("password is required");
      }

      if (log.password.length < 6) {
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

