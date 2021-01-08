<template>
  <div>
    <div class="wm-mini-header">
      <span class="wm-blue-transparent"></span>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="wm-mini-title">
              <h1>Student Dashboard</h1>
            </div>
            <div class="wm-breadcrumb">
              <ul>
                <li>
                  <a href="index-2.html">Home</a>
                </li>
                <li>
                  <a href="#">Student Dashboard</a>
                </li>
                <li>Settings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wm-main-content">
      <div class="wm-main-section">
        <div class="container">
          <div class="row">
            <DashboardNav></DashboardNav>
            <div class="col-md-8">
              <div class="wm-student-settings-info">
                <div class="wm-student-dashboard-settings">
                  <div class="wm-plane-title">
                    <h2>Calculate Gpa</h2>
                  </div>
                  <form>
                    <ul>
                      <li>
                        <input type="text" v-model="User.name" placeholder="fullname" />
                      </li>
                      <li>
                        <input type="text" v-model="User.email" placeholder="Email" />
                      </li>
                      <li>
                        <input type="text" v-model="User.phoneNumber" placeholder="Phone Number" />
                      </li>
                      <li>
                        <input type="text" v-model="User.dateOfBirth" placeholder="Date Of Birth" />
                      </li>
                      <li>
                        <input
                          type="button"
                          class="wm-banner-btn"
                          @click="updateChanges()"
                          value="update changes"
                        />
                      </li>
                    </ul>
                  </form>
                </div>
                <!-- <div class="wm-student-dashboard-form">
                  <div class="wm-full-title">
                    <h2>Update Password</h2>
                  </div>
                  <form>
                    <ul>
                      <li>
                        <input
                          type="text"
                          value="Old Password"
                          onblur="if(this.value == '') { this.value ='Old Password'; }"
                          onfocus="if(this.value =='Old Password') { this.value = ''; }"
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          value="New Password"
                          onblur="if(this.value == '') { this.value ='New Password'; }"
                          onfocus="if(this.value =='New Password') { this.value = ''; }"
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          value="Your Name"
                          onblur="if(this.value == '') { this.value ='Your Name'; }"
                          onfocus="if(this.value =='Your Name') { this.value = ''; }"
                        />
                      </li>
                    </ul>
                  </form>
                </div>-->
                <!-- <div class="wm-student-dashboard-form wm-student-dashboard">
                  <div class="wm-full-title">
                    <h2>Social Media</h2>
                  </div>
                  <form>
                    <ul>
                      <li class="wm-form-icon">
                        <a class="fa fa-facebook wm-icon" href="#"></a>
                        <input
                          type="text"
                          value="kevinnikols"
                          onblur="if(this.value == '') { this.value ='kevinnikols'; }"
                          onfocus="if(this.value =='kevinnikols') { this.value = ''; }"
                        />
                      </li>
                      <li class="wm-form-icon">
                        <a class="fa fa-twitter wm-icon" href="#"></a>
                        <input
                          type="text"
                          value="@kevinnikols"
                          onblur="if(this.value == '') { this.value ='@kevinnikols'; }"
                          onfocus="if(this.value =='@kevinnikols') { this.value = ''; }"
                        />
                      </li>
                      <li class="wm-form-icon">
                        <a class="fa fa-youtube wm-icon" href="#"></a>
                        <input
                          type="text"
                          value="kevinnikols"
                          onblur="if(this.value == '') { this.value ='kevinnikols'; }"
                          onfocus="if(this.value =='kevinnikols') { this.value = ''; }"
                        />
                      </li>
                      
                    </ul>
                  </form>
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dummy from "./dummydata.js";
export default {
  data() {
    return {
      User: ""
    };
  },
  created() {
    this.User = JSON.parse(window.localStorage.getItem("userInfo"));
  },
  methods: {}
};
</script>