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
                <li>My Courses</li>
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
              <div class="wm-plane-title">
                <h2>My Courses</h2>
              </div>
              <div class="wm-student-dashboard-courses wm-dashboard-courses">
                <div v-for="x in Gpa.level" :key="x.id" style="margin-bottom:30px;">
                  <h4>Level: {{x.Level}}</h4>
                  <h5>Semester: {{x.Semester}}</h5>

                  <table>
                    <thead>
                      <tr>
                        <th>Course Name</th>
                        <th>Level</th>
                        <th>Grade</th>
                        <th>Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="y in x.courses" :key="y.Id">
                        <td>{{y.CourseCode}}</td>
                        <td>{{y.Level}}</td>
                        <td style="text-align:center; text-transform:capitalize;">{{y.Grade}}</td>
                        <td style="text-align:center; text-transform:capitalize;">{{y.Credit}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class style="background:#F7F7F7;padding:10px;">
                    <table>
                      <tr>
                        <th>Total Credit</th>
                        <td style="text-align:center; text-transform:capitalize;">{{x.TotalCredit}}</td>
                      </tr>
                      <tr>
                        <th>Total Grade</th>
                        <td style="text-align:center; text-transform:capitalize;">{{x.TotalGrade}}</td>
                      </tr>
                      <tr>
                        <th>GPA</th>
                        <td style="text-align:center; text-transform:capitalize;">{{x.Gpa}}</td>
                      </tr>
                      <tr>
                        <th>CGPA</th>
                        <td style="text-align:center; text-transform:capitalize;">{{x.Cgpa}}</td>
                      </tr>
                    </table>
                  </div>
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
      Gpa: {
        level: "",
        courses: "",
        presentCourses: {}
      }
    };
  },
  created() {
    this.getCourses();
  },
  mounted() {},
  methods: {
    getCourses() {
      var id = JSON.parse(window.localStorage.getItem("userInfo")).id;
      var url = this.indexurl + "api/Gpa/getGpaByUserId?userId=" + id;
      this.axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + this.token()
          }
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            var data = response.data;
            this.Gpa.level = data[0].sort((a, b) => {
              return a.level - b.level;
            });
            var courses = data[1];
            this.setCourses(courses);
          }
        });
    },
    setCourses(courses) {
      var levels = this.Gpa.level;
      for (let i = 0; i < levels.length; i++) {
        const level = levels[i];
        level["courses"] = [];
        var levelCourses = courses.filter(course => {
          return (
            course.Level == level.Level && course.Semester == level.Semester
          );
        });

        level["courses"] = levelCourses;
      }

      this.Gpa.level = levels;
      console.log(this.Gpa.level);
    }
  }
};
</script>