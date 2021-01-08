<template>
  <div>
    <banner></banner>
    <MainContent></MainContent>
  </div>
</template>
<script>
import banner from "./MainBanner";
import MainContent from "./MainContent";
export default {
  components: {
    banner: banner,
    MainContent: MainContent
  }
};
</script>