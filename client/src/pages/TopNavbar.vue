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
      } else if (command === "Log out") {
        this.$store.dispatch("auth/logout").then(() => {
          this.$router.push("/login");
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
