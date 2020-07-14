<template>
  <el-container direction="vertical">
    <top-navbar v-on:tabClick="tabClick"></top-navbar>
    <home v-show="activeTab === 'Home'"></home>
    <calculation v-show="activeTab === 'Calculation'"></calculation>
    <summary-page v-show="activeTab === 'Summary'"></summary-page>
  </el-container>
</template>

<script>
import TopNavbar from "../TopNavbar.vue";
import Home from "../Home.vue";
import Calculation from "../Calculation.vue";
import SummaryPage from "../Summary.vue";

export default {
  components: {
    TopNavbar,
    Home,
    Calculation,
    SummaryPage
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
