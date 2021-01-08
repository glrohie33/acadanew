<template>
  <div class="section admin-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <strong class="card-title">All Institutions</strong>
              <button class="btn btn-success" style="float:right;">
                <router-link to="/admin/addinstitution">Add</router-link>
              </button>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Short Name</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Website</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col" style="min-width:50px;">Desc</th>
                    <th scope="col">Logo</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(x,index) in this.$store.state.data.institutions" :key="index">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{x.shortName}}</td>
                    <td>{{x.fullName}}</td>
                    <td>{{x.location}}</td>
                    <td>{{x.website}}</td>
                    <td>{{x.email}}</td>
                    <td>{{x.phoneNumber}}</td>
                    <td>{{x.institutionType}}</td>
                    <td>{{x.institutionStatus}}</td>
                    <td>{{x.description}}</td>
                    <td>
                      <img :src="x.logoUrl" style="height:50px;" alt />
                    </td>

                    <td id="actions">
                      <a class="btn btn-info btn-block" @click="editData(index)">
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
                      <label for="fname">Short Name</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="editForm.ShortName"
                        id="fname"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                      <label for>Full Name</label>
                      <input type="text" class="form-control" v-model="editForm.FullName" name id />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                      <label for="fname">Location</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="editForm.Location"
                        id="fname"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                      <label for>Website</label>
                      <input type="text" class="form-control" v-model="editForm.Website" name id />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                      <label for="fname">Email</label>
                      <input type="Email" class="form-control" v-model="editForm.Email" />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="Name">Phone Number</label>
                      <input type="text" class="form-control" v-model="editForm.PhoneNumber" />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="Name">Institution Type</label>
                      <input type="text" class="form-control" v-model="editForm.InstitutionType" />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="Name">Institution Status</label>
                      <input type="text" class="form-control" v-model="editForm.InstitutionStatus" />
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
                      <label for="Name">Logo Url</label>
                      <input type="text" class="form-control" v-model="editForm.LogoUrl" />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="Name">Images Url</label>
                      <input type="text" class="form-control" v-model="editForm.ImagesUrl" />
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
      editForm: {
        ShortName: "",
        FullName: "",
        Location: "",
        Website: "",
        Email: "",
        PhoneNumber: "",
        InstitutionType: "",
        InstitutionStatus: "",
        Description: "",
        LogoUrl: "",
        ImagesUrl: "",
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
    var url = "https://www.unilorin.edu.ng/imageshm/logo.png";
    console.log();
  },
  methods: {
    editData(index) {
      var institutions = this.$store.state.data.institutions;
      for (var x in institutions[index]) {
        var institution = institutions[index];
        var key = x[0].toUpperCase() + x.slice(1);

        if (key in this.editForm) {
          this.editForm[key] = institution[x];
        }
      }
      this.showEdit = true;
    },
    edit() {
      var val = this.validate();
      if (val) {
        var formData = this.createform.data(this.editForm);
        var url = this.indexurl + "Institution/Update";
        this.axios
          .put(url, formData, {
            headers: {
              Authorization: "Bearer " + this.token()
            }
          })
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              this.success = response.data;
              this.feedback = true;
              this.resetEdit();
            }
          })
          .catch(error => {
            console.log(error.resonseBody);
          });
      } else {
        this.feedback = true;
      }
    },
    validate() {
      var editForm = this.editForm;
      this.errors.splice(0);
      if (
        editForm.ShortName &&
        editForm.FullName &&
        editForm.Location &&
        editForm.Website &&
        editForm.Email &&
        editForm.InstitutionType &&
        editForm.InstitutionStatus &&
        editForm.Description &&
        editForm.Id
      ) {
        return true;
      }

      if (!editForm.ShortName) {
        this.errors.push("institution shortname is required");
      }

      if (!editForm.FullName) {
        this.errors.push("institutions full name requirement is required");
      }

      if (!editForm.Location) {
        this.errors.push("institution location is required");
      }

      if (!editForm.Website) {
        this.errors.push("institution website is required");
      }

      if (!editForm.Email) {
        this.errors.push("institution email is required");
      }

      if (!editForm.InstitutionType) {
        this.errors.push("institution type is required");
      }

      if (!editForm.InstitutionStatus) {
        this.errors.push("institution status type is required");
      }

      if (!editForm.Description) {
        this.errors.push("institution description type is required");
      }

      if (!editForm.Id) {
        this.errors.push("Error");
      }
      return false;
    },
    resetEdit() {
      this.showEdit = false;
      this.editForm = {
        ShortName: "",
        FullName: "",
        Location: "",
        Website: "",
        Email: "",
        PhoneNumber: "",
        InstitutionType: "",
        InstitutionStatus: "",
        Description: "",
        LogoUrl: "",
        ImagesUrl: "",
        Id: ""
      };
    },
    deleteData(id) {
      var url = this.indexurl + "api/Institution/Delete/" + id;
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
