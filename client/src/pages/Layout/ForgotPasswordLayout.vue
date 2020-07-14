<template>
  <div>
    <el-card class="forgotpassword-card">
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
      <el-form
        :model="forgotPasswordForm"
        ref="forgotPasswordForm"
        label-width="90px"
        class="forgotpassword-form"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model="forgotPasswordForm.email" placeholder="Enter your email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validate('loginForm')">Submit</el-button>
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
      forgotPasswordForm: {
        email: ""
      },
      validationErrors: []
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
      if (!this.forgotPasswordForm.email) {
        this.validationErrors.push("<strong>E-mail</strong> cannot be empty.");
      }
      if (/.+@.+/.test(this.forgotPasswordForm.email) != true) {
        this.validationErrors.push("<strong>E-mail</strong> must be valid.");
      }

      // when valid then sign in
      if (this.validationErrors.length <= 0) {
        this.forgotPassword();
      }
    },
    forgotPassword() {
      this.$store
        .dispatch("auth/resetPassword", {
          email: this.forgotPasswordForm.email
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  }
};
</script>
<style scoped>
.forgotpassword-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>