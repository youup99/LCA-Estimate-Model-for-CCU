<template>
  <el-container direction="vertical">
      <top-navbar></top-navbar>
      <dashboard></dashboard>
  </el-container>
</template>

<script>
import TopNavbar from "../TopNavbar.vue";
import ContentFooter from "../ContentFooter.vue";
import Dashboard from "../Dashboard.vue";

export default {
  components: {
    TopNavbar,
    Dashboard,
  },
  data() {
    return {};
  },
};
</script>
