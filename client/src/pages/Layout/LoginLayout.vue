<template>
  <div>
    <el-card class="login-card">
      <div slot="header" style="text-align: center;">
        <img :src="mainLogo" />
      </div>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="login-form"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="loginForm.username" placeholder="Enter your username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginForm.password" placeholder="Enter your password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">Login</el-button>
          <el-button type="secondary" @click="forgotPassword">Forgot Password</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    mainLogo: {
      type: String,
      default: require("@/assets/img/logo.png")
    }
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please enter a username",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please enter a password",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { username, password } = this.loginForm;
          this.$store
            .dispatch("auth/login", { username, password })
            .then(() => {
              this.$router.push("/");
            })
            .catch(err => {
              this.$message({
                message: err,
                type: "error"
              });
            });
        } else {
          return false;
        }
      });
    },
    forgotPassword() {
      this.$router.push("/resetPassword");
    }
  }
};
</script>
<style scoped>
.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
