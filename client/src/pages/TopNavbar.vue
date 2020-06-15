<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <img :src="mainLogo" />
      </div>
      <div class="md-toolbar-section-end">
        <div class="md-collapse">
          <el-menu
            :default-active="activeMenu"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="Home">Home</el-menu-item>
            <el-menu-item index="Calculation">Calculation</el-menu-item>
            <el-menu-item index="Summary">Summary</el-menu-item>
          </el-menu>
          <md-list>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <md-icon class="md-size-2x">account_circle</md-icon>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="Profile">Profile</el-dropdown-item>
                <el-dropdown-item command="Save">Save Settings</el-dropdown-item>
                <el-dropdown-item command="Load">Load Settings</el-dropdown-item>
                <el-dropdown-item command="Log out">Log out</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: "Home"
    };
  },
  props: {
    mainLogo: {
      type: String,
      default: require("@/assets/img/logo.png")
    }
  },
  // mounted() {
  //   this.activeMenu = this.$router.currentRoute.name;
  // },
  methods: {
    handleCommand(command) {
      if (command === "Profile") {
        this.$router.push("/profile");
      } else if (command === "Save") {
        this.$store.dispatch(
          "constants/set",
          this.$store.getters["constants/getState"]
        );
        this.$store.dispatch(
          "generalAssumptions/set",
          this.$store.getters["generalAssumptions/getState"]
        );
        this.$store.dispatch(
          "incumbents/set",
          this.$store.getters["incumbents/getState"]
        );
        this.$store.dispatch(
          "pathwayCalc/set",
          this.$store.getters["pathwayCalc/getState"]
        );
        this.$store.dispatch(
          "pathways/set",
          this.$store.getters["pathways/getState"]
        );
        this.$store.dispatch(
          "summary/set",
          this.$store.getters["summary/getState"]
        );
      } else if (command === "Load") {
        this.$store.dispatch("constants/fetchAndAdd");
        this.$store.dispatch("generalAssumptions/fetchAndAdd");
        this.$store.dispatch("incumbents/fetchAndAdd");
        this.$store.dispatch("pathwayCalc/fetchAndAdd");
        this.$store.dispatch("pathways/fetchAndAdd");
        this.$store.dispatch("summary/fetchAndAdd");
      } else if (command === "Log out") {
        this.$store
          .dispatch("auth/signOut")
          .then(() => {
            this.$router.push("/login");
          })
          .catch(error => {
            this.$message.error(error);
          });
      }
    },
    handleSelect(key, keyPath) {
      this.activeMenu = key;
      this.$emit("tabClick", this.activeMenu);
    }
  }
};
</script>

<style lang="css">
img {
  /* margin-top: 10px; */
  width: 200px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

md-toolbar {
  position: sticky;
  top: 1px;
}
</style>
