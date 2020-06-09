<template>
  <el-container direction="vertical">
    <top-navbar v-on:tabClick="tabClick"></top-navbar>
    <dashboard v-show="activeTab === 'Home'"></dashboard>
    <calculation v-show="activeTab === 'Calculation'"></calculation>
    <summary-tables v-show="activeTab === 'Summary'"></summary-tables>
  </el-container>
</template>

<script>
import TopNavbar from "../TopNavbar.vue";
import ContentFooter from "../ContentFooter.vue";
import Dashboard from "../Dashboard.vue";
import Calculation from "../Calculation.vue";
import SummaryTables from "../SummaryTables.vue";

export default {
  components: {
    TopNavbar,
    Dashboard,
    Calculation,
    SummaryTables,
  },
  data() {
    return {
      activeTab: "Home"
    };
  },
  methods: {
    tabClick(name) {
      this.activeTab = name;
    }
  }
};
</script>
