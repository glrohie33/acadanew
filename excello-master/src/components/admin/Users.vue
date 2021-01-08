<template>
  <div class="section admin-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <strong class="card-title">All Users</strong>
              <button class="btn btn-success" style="float:right;">
                <router-link to="/admin/addUser">Add User</router-link>
              </button>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">D.O.B</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">photo</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(x,index) in $store.state.data.users" :key="index">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{x.Firstname}}</td>
                    <td>{{x.Lastname}}</td>
                    <td>{{x.UserName}}</td>
                    <td>{{new Date(x.DateOfBirth).toLocaleDateString()}}</td>
                    <td>{{x.Email}}</td>
                    <td>{{x.PhoneNumber}}</td>
                    <td>
                      <img v-bind:src="x.PhotoUrl" />
                    </td>
                    <td id="actions">
                      <a class="btn btn-info btn-block">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$store.state.data.users);
  },
  methods: {
    deleteData(id) {
      var url = this.indexurl + "api/User/DeleteUser/" + id;
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