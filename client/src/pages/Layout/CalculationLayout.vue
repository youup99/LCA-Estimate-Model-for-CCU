<template>
  <el-container direction="vertical">
      <top-navbar></top-navbar>
      <calculation></calculation>
  </el-container>
</template>

<script>
import TopNavbar from "../TopNavbar.vue";
import ContentFooter from "../ContentFooter.vue";
import Calculation from "../Calculation.vue";

export default {
  components: {
    TopNavbar,
    Calculation
  },
  data() {
    return {};
  },
};
</script>
