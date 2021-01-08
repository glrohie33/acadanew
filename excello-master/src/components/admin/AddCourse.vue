<template>
  <section class="admin-section">
    <div class="container">
      <div class="row justify-center">
        <div class="card" id="register">
          <div class="card-header">
            <strong class="card-title">Add Course</strong>
            <button class="btn btn-success" style="float:right;">
              <router-link to="/admin/course">All Courses</router-link>
            </button>
          </div>
          <div v-show="feedback" class="card feedback">
            <span class="fa fa-close absolute" @click="feedback = false"></span>
            <p v-for="error in errors" v-bind:key="error" class="text-danger">{{error}}</p>
            <p class="text-success">{{success}}</p>
          </div>
          <div class="card-body" v-show="normalUpload">
            <form action ref="regForm" id="course">
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for="fname">Name</label>
                    <input type="text" class="form-control" v-model="course.Name" id="fname" />
                  </div>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for>Requirement</label>
                    <input type="text" class="form-control" v-model="course.Requirement" name id />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for="fname">Ssce</label>
                    <input type="text" class="form-control" v-model="course.Ssce" id="fname" />
                  </div>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for>Utme</label>
                    <input
                      type="text"
                      class="form-control"
                      v-bind:rules="[rule.required]"
                      v-model="course.Utme"
                      name
                      id
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for="fname">Institution</label>
                    <input type="text" class="form-control" v-model="course.Institution" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Name">Description</label>
                    <input type="text" class="form-control" v-model="course.Description" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for>Others</label>
                    <textarea
                      type="textaread"
                      class="form-control"
                      v-model="course.others"
                      rows="10"
                      name
                      id
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="card-body" v-show="batchUpload">
            <form action id="batchForm">
              <div class="col-md-12 col-sm-12">
                <div class="form-group">
                  <label for="fname">Short Name</label>
                  <input
                    type="file"
                    class="form-control"
                    name="formFile"
                    id="formFile"
                    accept="xlsx"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="card-footer">
            <button class="btn btn-default" style="float:left;" @click="switchMode">{{switchText}}</button>
            <button @click="AddCourse()" class="btn btn-info" style="float:right">Add</button>
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
      course: {
        Name: "",
        Requirement: "",
        Ssce: "",
        Utme: "",
        Institution: "",
        Description: "",
        Others: ""
      },
      normalUpload: true,
      batchUpload: false,
      switchText: "upload in Batch",
      rule: {
        required: d => d.length > 0 || window.alert("here")
      },
      errors: [],
      success: "",
      feedback: false
    };
  },
  created() {},
  methods: {
    AddCourse() {
      if (this.normalUpload == true) {
        this.addNormal();
      } else if (this.batchUpload == true) {
        this.addBatch();
      }
    },
    addNormal() {
      var validate = this.validate();
      if (validate == true) {
        var formData = this.createform.data(this.course);
        var url = this.indexurl + "/api/Course/add";
        this.axios
          .post(url, formData, {
            headers: {
              Authorization: "Bearer " + this.token()
            }
          })
          .then(response => {
            if (response.status == 200) {
              this.success = response.data;
              this.$router.push("/admin/course");
            }
          })
          .catch(error => {
            console.log(error.response);
            console.log(error);
          });
      } else {
        this.feedback = true;
      }
    },
    addBatch() {
      var form = document.getElementById("batchForm");
      var formData = new FormData(form);
      var url = this.indexurl + "api/Course/BatchUpload";
      this.axios
        .post(url, formData, {
          headers: {
            Authorization: "Bearer " + this.token()
          }
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.success = response.data;
            this.feedback = true;

            var obj = this;
            setTimeout(function() {
              obj.$router.push("/admin/course");
            }, 2000);
          }
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    validate() {
      var form = this.course;
      this.errors.splice(0);
      if (
        form.Name &&
        form.Requirement &&
        form.Ssce &&
        form.Utme &&
        form.Institution &&
        form.Description
      ) {
        return true;
      }

      if (!form.Name) {
        this.errors.push("course name is required");
      }

      if (!form.Requirement) {
        this.errors.push("course requirement is required");
      }

      if (!form.Ssce) {
        this.errors.push("Ssce is required");
      }

      if (!form.Utme) {
        this.errors.push("UTME list is required");
      }

      if (!form.Institution) {
        this.errors.push("institution is required");
      }

      if (!form.Description) {
        this.errors.push("description is required");
      }

      return false;
    },
    switchMode() {
      this.batchUpload = !this.batchUpload;
      this.normalUpload = !this.normalUpload;
      if (this.normalUpload == true) {
        this.switchText = "upload in Batch";
      } else {
        this.switchText = "do normal upload";
      }
    }
  }
};
</script>