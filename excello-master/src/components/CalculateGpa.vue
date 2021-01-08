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
                    <h2>Profile Settings</h2>
                  </div>
                  <form onsubmit="return false">
                    <div v-show="feedback" class="card">
                      <span class="fa fa-close absolute" @click="feedback = false"></span>
                      <p v-for="error in errors" v-bind:key="error" class="text-danger">{{error}}</p>
                      <p class="text-success">{{success}}</p>
                    </div>
                    <div
                      class="col-md-12"
                      id="courses"
                      style="margin-bottom:30px; border:1px solid #eee; border-radius:2px; padding:30px 10px;"
                    >
                      <div
                        class="col-md-12 each-course"
                        v-for="(x , index) in course.gpaDetails"
                        :key="index"
                        style="margin-bottom:20px;"
                      >
                        <div class="col-md-4">
                          <label for="coursecode">Course Code</label>
                          <input
                            id="coursecode"
                            type="text"
                            v-model="course.gpaDetails[index].courseCode"
                            placeholder="Course Code"
                          />
                        </div>

                        <div class="col-md-3">
                          <label for="grade">Grade</label>
                          <div class="wm-select-two">
                            <select id="grade" v-model="course.gpaDetails[index].grade">
                              <option>A</option>
                              <option>B</option>
                              <option>C</option>
                              <option>D</option>
                              <option>E</option>
                              <option>F</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <label for="credit">Credit</label>
                          <input
                            id="credit"
                            type="text"
                            v-model="course.gpaDetails[index].credit"
                            placeholder="Course Credit"
                          />
                        </div>
                        <div class="col-md-2" style="text-align:center;">
                          <button
                            @click="removeCourse(index)"
                            style="padding:9px; border-radius:5px; background:#CC0000;  margin-top:20px;"
                          >
                            <span class="fa fa-close" style="color:#fff;"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12" style="text-align:right;">
                      <button class="wm-banner-btn" @click="addCourse()">Add Course</button>
                    </div>

                    <div class="col-md-12">
                      <div class="col-md-4">
                        <label for="semester">Semester</label>
                        <div class="wm-select-two">
                          <select name id v-model="course.semester">
                            <option value="1">1</option>
                            <option value="2">2</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <label for="level">Level</label>
                        <input type="text" v-model="course.level" placeholder="Course Level" />
                      </div>
                      <div class="col-md-4">
                        <label for="semester">Gpa Model</label>
                        <div class="wm-select-two">
                          <select name id v-model="gpModel">
                            <option value="5">5.0</option>
                            <option value="4">4.0</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div class="wm-student-dashboard-form wm-student-dashboard">
                  <button class="wm-banner-btn" ref="submit" @click="CalculateGpa()">Calculate GPA</button>
                </div>
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
      course: {
        gpaDetails: [
          {
            courseCode: "",
            grade: "A",
            credit: 0
          }
        ],
        semester: "",
        level: "",
        "isAuthenticated": true,
        username: ""
      },
      gpModel: 5.0,
      success: "",
      feedback: false,
      errors: [],
      disabled: "false"
    };
  },
  created() {},

  methods: {
    CalculateGpa() {
      this.errors = [];
      this.disabled = "true";
      var btn = this.$refs.submit;
      btn.toggleAttribute("disabled");
      var decode = this.jwt.decode(this.token());
      this.course.username = decode["sub"];
      var url = this.indexurl + "/api/Gpa/calculateFivePoint";

      if (this.gpModel == 4.0) {
        url = this.indexurl + "/api/Gpa/calculateFourPoint";
      }

      var course = this.course;
      this.axios
        .post(url, course, {
          headers: {
            Authorization: "Bearer " + this.token()
          }
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.success =
              "Your Gpa has been calculate visit your dashboard to see calculations ";
            this.feedback = "true";
            this.disabled = "false";
            this.resetForm();
            btn.toggleAttribute("disabled");

            setTimeout(function() {
              // this.$router.push("/dashboard");
            }, 3000);
          }
        })
        .catch(error => {
          // console.log(error.response);
          console.log(error.message);
          this.errors.push("Error calculating Gpa");
          btn.toggleAttribute("disabled");
          this.feedback = "true";
          this.disabled = "false";
        });
    },
    addCourse() {
      this.course.gpaDetails.push({ courseCode: "", grade: "A", credit: "" });
    },
    removeCourse(index) {
      this.course.gpaDetails.splice(index, 1);
    },
    resetForm() {
      this.course.gpaDetails = [
        {
          courseCode: "",
          grade: "A",
          credit: 0
        }
      ];
    }
  }
};
</script>