<template>
  <transition name="fade">
    <!-- Start Page Content -->
    <div class="row">
      <div class="col-md-4">
        <div class="card p-30">
          <div class="media">
            <div class="media-left meida media-middle">
              <span class="color-primary">
                <i class="fa fa-book f-s-40"></i>
              </span>
            </div>
            <div class="media-body media-text-right">
              <h2>{{$store.state.data.courses.length}}</h2>
              <p class="m-b-0">Courses</p>
            </div>
            <div class="media-action col-md-12">
              <button class="btn-info btn btn-md">View</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-30">
          <div class="media">
            <div class="media-left meida media-middle">
              <span>
                <i class="fa fa-university f-s-40 color-success"></i>
              </span>
            </div>
            <div class="media-body media-text-right">
              <h2>{{$store.state.data.institutions.length}}</h2>
              <p class="m-b-0">Institutions</p>
            </div>
            <div class="media-action col-md-12">
              <button class="btn-info btn btn-md">View</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-30">
          <div class="media">
            <div class="media-left meida media-middle">
              <span>
                <i class="fa fa-user f-s-40 color-danger"></i>
              </span>
            </div>
            <div class="media-body media-text-right">
              <h2>{{$store.state.data.users.length}}</h2>
              <p class="m-b-0">Users</p>
            </div>
            <div class="media-action col-md-12">
              <button class="btn-info btn btn-md">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
</script>
