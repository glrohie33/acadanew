<template>
  <div class="section admin-section">
    <div class="dashboard-content">
      <info></info>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <barChart></barChart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import info from "./Info";
import bar from "./UserChart";
export default {
  components: {
    info: info,
    barChart: bar
  }
};
</script>