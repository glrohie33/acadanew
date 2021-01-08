<template>
  <aside class="col-md-4">
    <div class="wm-student-dashboard-nav">
      <div class="wm-student-nav">
        <div class="wm-student-nav-text">
          <h6 style="text-transform:capitalize;">{{User.name}}</h6>
          <h4 style=" font-size:16px;">{{User.username}}</h4>
        </div>
        <ul>
          <li class>
            <a href="#">
              <router-link to="/dashboard">
                <i class="wmicon-avatar"></i>My Profile
              </router-link>
            </a>
          </li>
          <li class>
            <router-link to="/calculategpa">
              <i class="wmicon-book"></i>Calculate GPA
            </router-link>
          </li>
          <li>
            <router-link to="/profile">
              <i class="wmicon-three"></i>Edit Profile
            </router-link>
          </li>
          <li>
            <a href="#" @click="logout()">
              <i class="wmicon-arrow"></i>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  data() {
    return {
      User: ""
    };
  },
  created() {
    this.User = JSON.parse(window.localStorage.getItem("userInfo"));
  },
  methods: {
    logout() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("userInfo");
      this.$router.push({ name: "login" });
      this.isUserInfo = !this.isUserInfo;
    }
  }
};
</script>