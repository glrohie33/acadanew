<template>
  <div class="section admin-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <strong class="card-title">All Courses</strong>
              <button class="btn btn-success" style="float:right;">
                <router-link to="/admin/addcourse">Add</router-link>
              </button>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Requirement</th>
                    <th scope="col">Ssce</th>
                    <th scope="col">Utme</th>
                    <th scope="col">Institution</th>
                    <th scope="col">Description</th>
                    <th scope="col">Others</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(x,index) in $store.state.data.courses" :key="x.name">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{x.name}}</td>
                    <td>{{x.requirement}}</td>
                    <td>{{x.ssce}}</td>
                    <td>{{x.utme}}</td>
                    <td>{{x.institution}}</td>
                    <td>{{x.description}}</td>
                    <td>{{x.others}}</td>
                    <td id="actions">
                      <a
                        class="btn btn-info btn-block"
                        @click="editCourse(index)"
                        data-toggle="modal"
                        data-target="#editModal"
                      >
                        <i class="fa fa-pencil"></i> Edit
                      </a>
                      <a class="btn btn-danger btn-block" @click="deleteData(x.id)">
                        <i class="fa fa-trash"></i> Delete
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div v-show="feedback" class="card feedback">
          <span class="fa fa-close absolute" @click="feedback = false"></span>
          <p v-for="error in errors" v-bind:key="error" class="text-danger">{{error}}</p>
          <p class="text-success">{{success}}</p>
        </div>
        <div id="editModal" v-show="showEdit">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Modal Heading</h4>
              <button type="button" class="close" @click="resetEdit()">&times;</button>
            </div>
            <div class="modal-body">
              <form action ref="regForm" id="course">
                <div class="row">
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                      <label for="fname">Name</label>
                      <input type="text" class="form-control" v-model="editForm.Name" id="fname" />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                      <label for>Requirement</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="editForm.Requirement"
                        name
                        id
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                      <label for="fname">Ssce</label>
                      <input type="text" class="form-control" v-model="editForm.Ssce" id="fname" />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                      <label for>Utme</label>
                      <input type="text" class="form-control" v-model="editForm.Utme" name id />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                      <label for="fname">Institution</label>
                      <input type="text" class="form-control" v-model="editForm.Institution" />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="Name">Description</label>
                      <input type="text" class="form-control" v-model="editForm.Description" />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for>Others</label>
                      <textarea
                        type="textaread"
                        class="form-control"
                        v-model="editForm.Others"
                        rows="10"
                        name
                        id
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <div style="text-align:center; width:100%;">
                <input
                  type="button"
                  :disabled="button.disabled"
                  @click="edit(this)"
                  :value="button.value"
                  class="btn btn-success"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courses: "",
      editForm: {
        Name: "",
        Requirement: "",
        Ssce: "",
        Utme: "",
        Institution: "",
        Description: "",
        Others: "",
        Id: ""
      },
      button: {
        disabled: false,
        value: "Edit"
      },
      showEdit: false,
      errors: [],
      success: "",
      feedback: false
    };
  },
  created() {
    this.setCourses();
    console.log(this.$store.state.data.courses);
  },
  methods: {
    setCourses() {
      this.courses = this.$store.state.data.courses;
    },
    editCourse(index) {
      var courses = this.$store.state.data.courses;
      for (var x in courses[index]) {
        var course = courses[index];
        var key = x[0].toUpperCase() + x.slice(1);
        console.log(this.editForm[key]);

        if (key in this.editForm) {
          this.editForm[key] = course[x];
        }
      }
      this.showEdit = true;
    },
    edit(event) {
      this.button.value = "Editing";
      this.button.disabled = true;
      var validate = this.validate();
      console.log(this.editForm);
      if (validate == true) {
        var formData = this.createform.data(this.editForm);
        var url = this.indexurl + "/api/Course/update";
        this.axios
          .put(url, formData, {
            headers: {
              Authorization: "Bearer " + this.token()
            }
          })
          .then(response => {
            console.log(response);
            if (resonse.status == 200) {
              this.success = response.data;
              setTimeout(function() {
                this.resetEdit();
              }, 3000);
            }
          })
          .catch(error => {
            // console.log(error.response);
            console.log(error);
          });
        var obj = this;
        setTimeout(function() {
          obj.button.value = "Edit";
          obj.button.disabled = false;
          obj.resetEdit();
        }, 3000);
      } else {
        this.feedback = true;
      }
    },
    validate() {
      var form = this.editForm;
      this.errors.splice(0);
      if (
        form.Name &&
        form.Requirement &&
        form.Ssce &&
        form.Utme &&
        form.Institution &&
        form.Description &&
        form.Id
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

      if (!form.Id) {
        this.errors.push("error is required");
      }

      return false;
    },
    deleteCourse() {},
    resetEdit() {
      this.showEdit = false;
      this.editForm = {
        Name: "",
        Requirement: "",
        Ssce: "",
        Utme: "",
        Institution: "",
        Description: "",
        Others: "",
        Id: ""
      };
    },
    deleteData(id) {
      var url = this.indexurl + "api/Course/Delete/" + id;
      this.axios
        .delete(url, {
          headers: {
            Authorization: "Bearer " + this.token()
          }
        })
        .then(response => {
          if (response.status == 200) {
            this.success = response.data;
            this.feedback = true;
          }
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
        });
    }
  }
};
</script>
<style lang="scss">
.modal-backdrop.in {
  display: none !important;
}
</style>