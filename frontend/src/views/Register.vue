<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>
    <p v-if="success" style="color:green">{{ success }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: null,
      success: null,
    };
  },
  methods: {
    async register() {
      try {
        await axios.post("http://127.0.0.1:8000/api/register/", {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.success = "Account created! Please login.";
        this.error = null;
        this.$router.push("/login");
      } catch (err) {
        this.error = err.response?.data?.detail || "Registration failed!";
        this.success = null;
      }
    },
  },
};
</script>
