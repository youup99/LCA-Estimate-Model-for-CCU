<template>
  <el-container direction="vertical">
    <top-navbar></top-navbar>
    <summary-tables></summary-tables>
  </el-container>
</template>

<script>
import TopNavbar from "../TopNavbar.vue";
import SummaryTables from "../SummaryTables.vue";

export default {
  components: {
    TopNavbar,
    SummaryTables,
  },
  data() {
    return {};
  },
};
</script>
