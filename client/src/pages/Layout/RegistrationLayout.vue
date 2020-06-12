<template>
  <div>
    <el-card class="signup-card">
      <div slot="header" style="text-align: center;">
        <img :src="mainLogo" />
      </div>
      <div v-if="validationErrors.length" class="notification is-danger is-light">
        <div class="content">
          Please resolve the following error(s) before proceeding.
          <ul style="margin-top:0.3em; margin-left: 1em">
            <li v-for="(error, index) in validationErrors" :key="`error-${index}`" v-html="error" />
          </ul>
        </div>
      </div>
      <el-form :model="signUpForm" ref="signUpForm" label-width="120px" class="signup-form">
        <el-form-item label="Email" prop="email">
          <el-input v-model="signUpForm.email" placeholder="example@email.com"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="signUpForm.password" placeholder="Password" show-password></el-input>
        </el-form-item>
        <el-form-item label="Repeat Password" prop="repeatPassword">
          <el-input v-model="signUpForm.repeatPassword" placeholder="Password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validate()">Register</el-button>
          <el-button type="secondary" @click="cancel()">Cancel</el-button>
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
      signUpForm: {
        email: "",
        password: "",
        repeatPassword: ""
      },
      validationErrors: []
      //   rules: {
      //     username: [
      //       {
      //         required: true,
      //         message: "Please enter a username",
      //         trigger: "blur"
      //       }
      //     ],
      //     password: [
      //       {
      //         required: true,
      //         message: "Please enter a password",
      //         trigger: "blur"
      //       }
      //     ]
      //   }
    };
  },
  methods: {
    cancel() {
      this.$router.push("/login");
    },
    resetError() {
      this.validationErrors = [];
    },
    validate() {
      // Clear the errors before we validate again
      this.resetError();

      // email validation
      if (!this.signUpForm.email) {
        this.validationErrors.push("<strong>E-mail</strong> cannot be empty.");
      }
      if (/.+@.+/.test(this.signUpForm.email) != true) {
        this.validationErrors.push("<strong>E-mail</strong> must be valid.");
      }
      // password validation
      if (!this.signUpForm.password) {
        this.validationErrors.push("<strong>Password</strong> cannot be empty");
      }
      if (/.{6,}/.test(this.signUpForm.password) != true) {
        this.validationErrors.push(
          "<strong>Password</strong> must be at least 6 characters long"
        );
      }
      if (!(this.signUpForm.password === this.signUpForm.repeatPassword)) {
        this.validationErrors.push("<strong>Passwords</strong> did not match");
      }

      // when valid then sign in
      if (this.validationErrors.length <= 0) {
        this.signUp();
      }
    },
    signUp() {
      this.$store.dispatch("auth/signUp", {
        email: this.signUpForm.email,
        password: this.signUpForm.password
      }).then(() => {
          this.$router.push("/");
      }).catch((error) => {
          this.$message.error(error);
      })
    }
  }
};
</script>
<style scoped>
.signup-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>