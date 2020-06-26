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
        label-width="90px"
        class="login-form"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model="loginForm.email" placeholder="Enter your email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="Enter your password"
            @change="submitForm('loginForm')"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">Login</el-button>
          <el-button type="secondary" @click="forgotPassword">Forgot Password</el-button>
        </el-form-item>
      </el-form>
      <el-link type="danger" @click="signUp()">New User? Sign up now!</el-link>
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
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please enter an email",
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
          this.$loading();
          const { email, password } = this.loginForm;
          this.$store
            .dispatch("auth/signIn", { email, password })
            .then(value => {
              this.$router.push("/");
            })
            .catch(error => {
              this.$message.error(error);
            });
        } else {
          return false;
        }
      });
    },
    signUp() {
      this.$router.push("/register");
    },
    forgotPassword() {
      this.$router.push("/forgotpassword");
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
