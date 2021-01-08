<template>
  <!-- toggle and nav items -->
  <ul class="navbar-nav mr-auto mt-md-0">
    <li class="nav-item m-l-10">
      <a class="nav-link sidebartoggler text-muted" @click="handleSidebarToggle">
        <i class="ti-menu"></i>
      </a>
    </li>
    <!-- Messages -->
    <li
      class="nav-item dropdown mega-dropdown"
      :class="{'show': isMegaDropwon, '': !isMegaDropwon }"
      @click="handleMegaDropwon"
    >
      <a
        class="nav-link dropdown-toggle text-muted"
        href="#"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fa fa-th-large"></i>
      </a>
    </li>
    <!-- End Messages -->
  </ul>
</template>

<script>
export default {
  data() {
    return {
      clickable: true,
      isMegaDropwon: false
    };
  },
  methods: {
    toggle(e) {
      e.target.parentElement.classList.toggle("close");
    },
    handleSidebarToggle() {
      if (this.clickable) {
        this.clickable = false;
        document.body.classList.toggle("mini-sidebar");
        this.clickable = true;
      }
    },
    handleMegaDropwon(e) {
      this.isMegaDropwon = !this.isMegaDropwon;
    }
  }
};
</script>