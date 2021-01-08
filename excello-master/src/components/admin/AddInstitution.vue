<template>
  <section class="admin-section">
    <div class="container">
      <div class="row justify-center">
        <div class="card" id="register">
          <div class="card-header">
            <strong class="card-title">Add Institution</strong>
            <button class="btn btn-success" style="float:right;">
              <router-link to="/admin/institution">All Institutions</router-link>
            </button>
          </div>
          <div v-show="feedback" class="card feedback">
            <span class="fa fa-close absolute" @click="feedback = false"></span>
            <p v-for="error in errors" v-bind:key="error" class="text-danger">{{error}}</p>
          </div>

          <div class="card-body" v-show="normalUpload">
            <form action ref="regForm" id="course">
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for="fname">Short Name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="institution.ShortName"
                      id="fname"
                    />
                  </div>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for>Full Name</label>
                    <input type="text" class="form-control" v-model="institution.FullName" name id />
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
                      v-model="institution.Location"
                      id="fname"
                    />
                  </div>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for>Website</label>
                    <input type="text" class="form-control" v-model="institution.Website" name id />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label for="fname">Email</label>
                    <input type="Email" class="form-control" v-model="institution.Email" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Name">Phone Number</label>
                    <input type="text" class="form-control" v-model="institution.PhoneNumber" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Name">Institution Type</label>
                    <input type="text" class="form-control" v-model="institution.InstitutionType" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Name">Institution Status</label>
                    <input type="text" class="form-control" v-model="institution.InstitutionStatus" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Name">Description</label>
                    <input type="text" class="form-control" v-model="institution.Description" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Name">Logo Url</label>
                    <input type="text" class="form-control" v-model="institution.LogoUrl" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Name">Images Url</label>
                    <input type="text" class="form-control" v-model="institution.ImagesUrl" />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class="card-body" v-show="batchUpload">
            <form action id="batchForm" enctype="multipart/form-data">
              <div class="col-md-12 col-sm-12">
                <div class="form-group">
                  <label for="fname">File Name</label>
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
            <button @click="AddInstitution()" class="btn btn-info" style="float:right">Add</button>
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
      institution: {
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
        ImagesUrl: ""
      },
      normalUpload: true,
      batchUpload: false,
      switchText: "upload in Batch",
      batchFile: "",
      errors: [],
      feedback: false
    };
  },
  created() {
    console.log(this.$store.state.data.institutions);
  },
  methods: {
    AddInstitution() {
      this.errors.splice(0);
      if (this.normalUpload == true) {
        this.addNormal();
      } else if (this.batchUpload == true) {
        this.addBatch();
      }
    },
    addNormal() {
      var val = this.validate();
      if (val) {
        var formData = this.createform.data(this.institution);
        var url = this.indexurl + "api/Institution/add";

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
                obj.$router.push("/admin/institution");
              }, 2000);
            }
          })
          .catch(error => {
            console.log(error.resonseBody);
          });
      } else {
        this.feedback = true;
      }
    },
    addBatch() {
      var formFile = document.getElementById("formFile");
      var form = document.getElementById("batchForm");
      if (formFile.files.length > 0) {
        var formData = new FormData();
        formData.append("FileName", formFile.files[0].name);
        formData.append("formFile", formFile.files[0]);
        var url = this.indexurl + "api/Institution/BatchUpload";
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
                obj.$router.push("/admin/institution");
              }, 2000);
            }
          })
          .catch(error => {
            console.log(error.response);
          });
      } else {
        this.errors.push("No file selected");
        this.feedback = true;
      }
    },
    validate() {
      var form = this.institution;
      this.errors.splice(0);
      if (
        form.ShortName &&
        form.FullName &&
        form.Location &&
        form.Website &&
        form.Email &&
        form.InstitutionType &&
        form.InstitutionStatus &&
        form.Description
      ) {
        return true;
      }

      if (!form.ShortName) {
        this.errors.push("institution shortname is required");
      }

      if (!form.FullName) {
        this.errors.push("institutions full name requirement is required");
      }

      if (!form.Location) {
        this.errors.push("institution location is required");
      }

      if (!form.Website) {
        this.errors.push("institution website is required");
      }

      if (!form.Email) {
        this.errors.push("institution email is required");
      }

      if (!form.InstitutionType) {
        this.errors.push("institution type is required");
      }

      if (!form.InstitutionStatus) {
        this.errors.push("institution status type is required");
      }

      if (!form.Description) {
        this.errors.push("institution description type is required");
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
  },
  computed: {}
};
</script>