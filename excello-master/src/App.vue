<template>
  <div id="app">
    <div id="main-wrapper">
      <vue-min-header v-show="showNav"></vue-min-header>
      <Sidebar :navItems="nav" v-show="showNav" />
      <UserHeader v-show="showUser"></UserHeader>
      <div :class="`page-wrapper  ${margin} ` ">
        <vue-min-breadcrumb v-show="showNav"></vue-min-breadcrumb>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </div>
      <vue-footer v-show="showFooter"></vue-footer>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import nav from "./nav";
import Header from "./components/global/Header.vue";
import Breadcrumb from "./components/global/Breadcrumb.vue";
import Sidebar from "./components/global/Sidebar.vue";
import Footer from "./components/global/Footer.vue";
import UserHeader from "./components/global/UserHeader";
import route from "./router/routes";
import notify from "vue-notifyjs";
Vue.use(notify);

export default {
  data() {
    return {
      nav: nav.items,
      showNav: false,
      showSideNav: false,
      showUser: false,
      showFooter: true,
      margin: "margin",
      userTopMargin: "margin-top"
    };
  },
  components: {
    VueMinHeader: Header,
    VueMinBreadcrumb: Breadcrumb,
    Sidebar,
    VueFooter: Footer,
    UserHeader: UserHeader
  },
  created() {
    console.log(this.$route);
    this.setNavs();
    this.$notify({
      message: "welcome",
      type: "success"
    });

    setInterval(() => {
      var token = this.token();
      if (!!token != false) {
        this.setDatas();
      }
    }, 2000);
  },
  watch: {
    $route: {
      handler(to, from) {
        this.setNavs();
      }
    }
  },
  methods: {
    setNavs() {
      var route = this.$route;
      if (route.name == "login" || route.name == "register") {
        this.showNav = false;
        this.showUser = true;
        this.margin = "no-margin";
        this.userTopMargin = "margin-top";
      } else {
        if (route.meta.admin) {
          this.showNav = true;
          this.margin = "margin";
          this.showUser = false;
          this.userTopMargin = "";
        } else {
          this.showUser = true;
          this.showNav = false;
          this.showFooter = true;
          this.margin = "no-margin";
          this.userTopMargin = "margin-top";
        }
      }
    }
  },

  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched;
    },
    isAuth() {
      return this.$route.path.match("auth");
    }
  }
};
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}

.card-header {
  margin: -20px -20px 20px -20px;
}
.card-footer {
  margin: 20px -20px -20px -20px;
}
.card-text {
  padding: 10px;
}
</style>
