<template>
  <!-- header header  -->
  <div class="header is_stuck">
    <nav class="navbar top-navbar navbar-expand-md navbar-light">
      <!-- Logo -->
      <div class="navbar-header">
        <a class="navbar-brand" href="index.html">
          <router-link to="/" class="navbar-brand invisible-xs" exact>
            <img id="small-logo" src="../../images/akada.jpeg" alt="Acada" />
            <img id="full-logo" src="../../images/akada.jpeg" alt="Acada" />
          </router-link>
        </a>
      </div>
      <!-- End Logo -->
      <div class="navbar-collapse">
        <sidebar-collapse></sidebar-collapse>
        <!-- User profile and search -->
        <ul class="navbar-nav my-lg-0">
          <!-- Search -->
          <li class="nav-item hidden-sm-down search-box">
            <a
              class="nav-link hidden-sm-down text-muted"
              href="javascript:void(0)"
              @click="searchClick"
              :class="{'search-open': isSearch, '': !isSearch }"
            >
              <i class="ti-search"></i>
            </a>

            <form class="app-search" :class="{ 'form-inline': isSearch, '': !isSearch }">
              <input type="text" class="form-control" placeholder="Search here" />
              <a class="srh-btn" @click="isSearch = !isSearch">
                <i class="ti-close"></i>
              </a>
            </form>
          </li>
          <!-- Comment -->

          <!-- End Comment -->
          <!-- Messages -->
          <!-- End Messages -->
          <!-- Profile -->
          <li
            class="nav-item dropdown"
            :class="{'show': isUserInfo, '': !isUserInfo }"
            @click="handleUserInfo"
          >
            <a
              class="nav-link dropdown-toggle text-muted"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src="../../images/profile.png" alt="user" class="profile-pic" />
            </a>
            <div
              class="dropdown-menu dropdown-menu-right animated zoomIn"
              :class="{'show': isUserInfo, '': !isUserInfo }"
              @click="handleUserInfo"
            >
              <ul class="dropdown-user">
                <li v-show="loggedIn">
                  <router-link to="/profile">
                    <i class="ti-user"></i> Profile
                  </router-link>
                </li>
                <li v-show="!loggedIn">
                  <router-link to="/login">
                    <i class="fa fa-power-on"></i> Login
                  </router-link>
                </li>
                <li v-show="loggedIn">
                  <a href="#" @click="logout()">
                    <i class="fa fa-power-off"></i> Logout
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import SidebarCollapse from "./SidebarCollapse.vue";
export default {
  data() {
    return {
      isSearch: false,
      isOpen: false,
      clickable: true,
      isNotification: false,
      isMessage: false,
      isUserInfo: false,
      loggedIn: false
    };
  },
  components: {
    SidebarCollapse
  },
  created() {
    if (!!this.token()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  },

  watch: {
    $route: {
      handler(to, from) {
        if (!!this.token()) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    }
  },
  methods: {
    toggle(e) {
      //this.isOpen = !this.isOpen
      e.target.parentElement.classList.toggle("close");
    },
    searchClick(e) {
      this.isSearch = !this.isSearch;
    },
    handleMessage(e) {
      this.isMessage = !this.isMessage;
    },
    handleNotification(e) {
      this.isNotification = !this.isNotification;
    },
    handleUserInfo(e) {
      this.isUserInfo = !this.isUserInfo;
    },
    logout() {
      window.localStorage.removeItem("akadatoken");
      window.localStorage.removeItem("userInfo");
      this.$router.push({ name: "login" });
      this.isUserInfo = !this.isUserInfo;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/css/lib/bootstrap/bootstrap.min.css";
@import "~pure-semantic-ui-css/semantic.css";
@import "../../assets/css/lib/calendar2/pignose.calendar.min.css";
@import "../../~owl-carousel-2/assets/owl.carousel.min.css";
@import "~owl-carousel-2/assets/owl.theme.default.min.css";

@import "../../assets/icons/font-awesome/css/font-awesome.min.css";
@import "../../assets/icons/simple-line-icons/css/simple-line-icons.css";
@import "../../assets/icons/weather-icons/css/weather-icons.min.css";
@import "../../assets/icons/themify-icons/themify-icons.css";
@import "../../assets/icons/material-design-iconic-font/css/materialdesignicons.min.css";

@import "../../assets/css/helper.css";
@import "../../assets/css/style.css";
@import "../../../node_modules/vue-notifyjs/themes/default.css";
</style>
<style lang="scss">
.form-inline {
  display: block !important;
}
.notification-show + .dropdown-menu,
.message-show + .dropdown-menu,
.language-show + .dropdown-menu {
  display: block;
}
.header .top-navbar .navbar-header .navbar-brand {
  max-width: 250px;
}

.navbar-brand #small-logo,
.mini-sidebar .navbar-brand #full-logo {
  display: none;
}
.mini-sidebar .navbar-brand #small-logo {
  height: 70px;
  display: inline;
  width: 51px;
  max-width: unset;
  object-fit: contain;
}
#small-logo,
#full-logo {
  width: 100%;
  height: auto;
}
.header.is_stuck {
  min-height: 54px;

  z-index: 999999999;
}
.header.is_stuck .navbar {
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
}

.container-fluid .admin-section {
  padding-left: 15px;
  padding-right: 15px;
}

.admin-section .container {
  width: 100% !important;
}

.admin-section .card.register {
  min-width: 300px;
}
.admin-section .card form {
  width: 90%;
  margin: 0px auto;
}
.header .top-navbar .navbar-header {
  background: none;
}

@media (max-width: 990px) {
  .navbar-collapse {
    position: static !important;
    margin: 0px !important;
    width: 100% !important;
    background: transparent !important;
  }
  .navbar {
    display: block;
    padding: 0px !important;
  }

  .mini-sidebar .navbar-brand #small-logo {
    width: 250px;
  }

  .header .top-navbar .navbar-header {
    width: 100%;
    text-align: center;
  }
  .header .top-navbar .navbar-header .navbar-brand {
    float: none;
  }
}
</style> 
