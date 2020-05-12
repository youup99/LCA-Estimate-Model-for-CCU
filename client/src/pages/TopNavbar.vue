<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <img :src="mainLogo" />
      </div>
      <div class="md-toolbar-section-end">
        <div class="md-collapse">
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
import { mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapActions('auth', ["logout"])
  },
  data() {
    return {};
  },
  props: {
    mainLogo: {
      type: String,
      default: require("@/assets/img/logo.png"),
    },
  },
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
  },
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
</style>
