<template>
  <header id="wm-header" class="wm-header-one">
    <!--// TopStrip \\-->
    <div class="wm-topstrip">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <ul class="wm-stripinfo">
              <li>
                <i class="wmicon-location"></i> 2925 Swick Hill Street, Charlotte, NC 28202
              </li>
              <li>
                <i class="wmicon-technology4"></i> +1 984-700-7129
              </li>
            </ul>
            <ul class="wm-adminuser-section">
              <li v-show="!login">
                <router-link to="/login">login</router-link>
              </li>
              <li v-show="!login">
                <router-link to="/register">Register</router-link>
              </li>
              <li v-show="login">
                <a @click="logout()" style="color:#fff;cursor:pointer;">Logout</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#" class="wm-search-btn" data-toggle="modal" data-target="#ModalSearch">
                  <i class="wmicon-search"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--// TopStrip \\-->
    <!--// MainHeader \\-->
    <div class="wm-main-header">
      <div class="container">
        <div class="row">
          <div class="col-md-2 logo-cover">
            <a href="/" class="wm-logo">
              <img src="../../images/akada.png" alt />
            </a>
          </div>
          <div class="col-md-10">
            <!--// Navigation \\-->
            <nav class="navbar navbar-default">
              <div class="navbar-header">
                <button
                  type="button"
                  class="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar-collapse-1"
                  aria-expanded="true"
                  style="float:left;"
                >
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              </div>
              <div class="collapse navbar-collapse" id="navbar-collapse-1">
                <ul class="nav navbar-nav">
                  <li class="active">
                    <router-link to="/">Home</router-link>
                    <!-- <ul class="wm-dropdown-menu">
                      <li>
                        <a href="index.html">Education Home V1</a>
                      </li>
                      <li>
                        <a href="html/education/index-two.html">Education Home V2</a>
                      </li>
                      <li>
                        <a href="html/education/index-three.html">Education Home V3</a>
                      </li>
                      <li>
                        <a href="html/education/index-four.html">Education Home V4</a>
                      </li>
                    </ul>-->
                  </li>
                  <li class="active">
                    <router-link to="/dashboard">Dashboard</router-link>
                    <ul class="wm-dropdown-menu">
                      <li>
                        <router-link to="/profile">Profile</router-link>
                      </li>
                      <li>
                        <router-link to="/calculategpa">Calculate Gpa</router-link>
                      </li>
                      <!-- <li>
                        <a href="html/education/index-three.html">Education Home V3</a>
                      </li>
                      <li>
                        <a href="html/education/index-four.html">Education Home V4</a>
                      </li>-->
                    </ul>
                  </li>
                  <li>
                    <router-link to="/aboutus">About</router-link>
                  </li>
                  <li class="wm-megamenu-li">
                    <router-link to="/contactus">Contact</router-link>
                  </li>
                  <!-- <li>
                    <a href="#">courses</a>
                    <ul class="wm-dropdown-menu">
                      <li>
                        <a href="html/education/courses-grid.html">Courses Grid</a>
                      </li>
                      <li>
                        <a href="html/education/courses-list.html">Courses List</a>
                      </li>
                      <li>
                        <a href="html/education/courses-detail.html">Courses Detail</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">event</a>
                    <ul class="wm-dropdown-menu">
                      <li>
                        <a href="html/education/event-grid.html">Event Grid</a>
                      </li>
                      <li>
                        <a href="html/education/event-detail.html">Event Detail</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Dashboard</a>
                    <ul class="wm-dropdown-menu">
                      <li>
                        <a href="html/education/dashboard-courses.html">Courses</a>
                      </li>
                      <li>
                        <a href="index.html">Favourite</a>
                      </li>
                      <li>
                        <a href="index.html">My Courses</a>
                      </li>
                      <li>
                        <a href="index.html">Profile Settings</a>
                      </li>
                      <li>
                        <a href="index.html">Settings</a>
                      </li>
                      <li>
                        <a href="index.html">Statement</a>
                      </li>
                    </ul>
                  </li>
                  <li class="wm-megamenu-li">
                    <a href="#">Pages</a>
                    <ul class="wm-megamenu">
                      <li class="row">
                        <div class="col-md-2">
                          <h4>Link 1</h4>
                          <ul class="wm-megalist">
                            <li>
                              <a href="index.html">404 Error Page</a>
                            </li>
                            <li>
                              <a href="index.html">About Us</a>
                            </li>
                            <li>
                              <a href="index.html">Blog Grid</a>
                            </li>
                            <li>
                              <a href="index.html">Blog List</a>
                            </li>
                            <li>
                              <a href="index.html">Blog Detail</a>
                            </li>
                            <li>
                              <a href="index.html">Faq Page</a>
                            </li>
                          </ul>
                        </div>
                        <div class="col-md-2">
                          <h4>Link 2</h4>
                          <ul class="wm-megalist">
                            <li>
                              <a href="index.html">Our Professors</a>
                            </li>
                            <li>
                              <a href="index.html">Our Professsors Detail</a>
                            </li>
                            <li>
                              <a href="index.html">Typography Elements</a>
                            </li>
                            <li>
                              <a href="html/education/courses-list.html">Courses List</a>
                            </li>
                            <li>
                              <a href="html/education/courses-grid.html">Courses Grid</a>
                            </li>
                            <li>
                              <a href="index.html">Gallery</a>
                            </li>
                          </ul>
                        </div>
                        <div class="col-md-2">
                          <h4>Link 3</h4>
                          <ul class="wm-megalist">
                            <li>
                              <a href="html/education/courses-detail.html">Courses Detail</a>
                            </li>
                            <li>
                              <a href="index.html">Shop List</a>
                            </li>
                            <li>
                              <a href="index.html">Shop Grid</a>
                            </li>
                            <li>
                              <a href="index.html">Shop Detail</a>
                            </li>
                            <li>
                              <a href="index.html">Contact Us</a>
                            </li>
                          </ul>
                        </div>
                        <div class="col-md-6">
                          <a href="#" class="wm-thumbnail">
                            <img src="html/education/extra-images/megamenu-frame.jpg" alt />
                          </a>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="index.html">Shop</a>
                    <ul class="wm-dropdown-menu">
                      <li>
                        <a href="index.html">Shop Grid</a>
                      </li>
                      <li>
                        <a href="index.html">Shop List</a>
                      </li>
                      <li>
                        <a href="index.html">Shop Detail</a>
                      </li>
                    </ul>
                  </li>-->
                </ul>
              </div>
            </nav>
            <!--// Navigation \\-->
            <!-- <a href="#" class="wm-header-btn">get started</a> -->
          </div>
        </div>
      </div>
    </div>
    <!--// MainHeader \\-->
  </header>
</template>

<script>
export default {
  data() {
    return {
      login: false
    };
  },
  created() {
    if (!!this.token() != false) {
      this.login = true;
    } else {
      this.login = false;
    }
  },
  methods: {
    logout() {
      window.localStorage.removeItem("akadatoken");
      window.localStorage.removeItem("userInfo");
      this.$router.push("/login");
    }
  },
  watch: {
    $route: {
      handler() {
        if (this.token() != false) {
          this.login = true;
        } else {
          this.login = false;
        }
      }
    }
  }
};
</script>
<style lang="scss"  scoped>
.wm-main-header .wm-logo img {
  height: 90px;
}

@media (max-width: 990px) and (min-width: 768px) {
  .navbar-collapse {
    left: 15px !important;
  }

  .logo-cover {
    width: 100%;
    max-width: 100%;
    flex: unset;
    text-align: center;
  }

  .wm-logo {
    float: none;
  }

  .navbar {
    padding-left: 0px;
  }
  .navbar-toggle {
    margin: 15px 0px 20px 0px;
    float: none;
  }
}

@media (min-width: 990px) {
  .logo-cover {
    border-right: 1px solid #e4e4e4;
  }

  .navbar-nav {
    flex-direction: unset;
  }

  .navbar {
    display: unset;
    padding: 0px !important;
  }

  #wm-header {
    float: none;
  }

  #wm-header::after {
    content: "";
    display: block;
    clear: both;
  }

  .navbar-toggle {
    float: left !important;
  }
}
</style>

<style lang='scss' scoped >
@import "../../assets/css/bootstrap.css";
@import "../../assets/css/font-awesome.css";
@import "../../assets/css/flaticon.css";
@import "../../assets/css/slick-slider.css";
@import url("../../assets/css/prettyphoto.css");
@import "../../assets/css/userstyle.css";
@import "../../assets/css/color.css";
@import "../../assets/css/color-two.css";
@import "../../assets/css/color-three.css";
@import "../../assets/css/color-four.css";
@import "../../assets/css/responsive.css";
</style>