<template>
  <div class id="ModalLogin" tabindex="-1" role>
    <div class="modal-content">
      <div class="modal-body">
        <div class="wm-modallogin-form wm-login-popup">
          <span class="wm-color form-title">Login to Your Account</span>
          <form>
            <div v-show="feedback" class="card feedback">
              <span class="fa fa-close absolute" @click="feedback = false"></span>
              <p v-for="error in errors" v-bind:key="error" class="text-danger">{{error}}</p>
              <p class="text-success">{{success}}</p>
            </div>
            <ul>
              <li>
                <input type="text" placeholder="Username" v-model="login.username" />
              </li>
              <li>
                <div class="input-group">
                  <input placeholder="Password" :type="type" v-model="login.password" />
                  <div class="input-group-addon">
                    <span class="input-group-text" @click="pass(this)">
                      <i :class="icon"></i>
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <a href="#" class="wm-forgot-btn">Forgot Password?</a>
              </li>
              <li style="text-align:center;">
                <input type="button" value="Sign In" @click="Login()" ref="submit" />
              </li>
            </ul>
          </form>
          <span class="wm-color"></span>
          <ul class="wm-login-social-media"></ul>
          <p>
            Not a member yet?
            <router-link to="/register">Sign-up Now!</router-link>
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
      var btn = this.$refs.submit;
      this.errors.splice(0);
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
              window.localStorage.setItem("akadatoken", JSON.stringify(token));
              var decode = this.jwt.decode(response.data.token);
              var key = this.key;
              var code = Array.isArray(decode[key])
                ? decode[key].toString()
                : decode[key];

              window.localStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.usern)
              );
              this.setDatas();
              this.success = "Login Successful you will be redirected shortly";
              this.feedback = "true";

              setTimeout(() => {
                if (code.search("Admin") > -1) {
                  this.$router.push("/admin");
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
<style lang="scss" scoped>
.modal-content {
  float: none !important;
  margin: 40px auto 0px auto;
}
</style>