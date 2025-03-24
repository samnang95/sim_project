<template>
  <div class="flex min-h-screen">
    <!-- Left Side: Illustration -->
    <div class="hidden lg:block w-1/2 bg-gray-50 p-10">
      <img src="../assets/inventory-illustration.png" alt="Inventory Illustration" class="w-full h-auto" />
    </div>
    <!-- Right Side: Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-10">
      <div class="w-full max-w-md">
        <h1 class="text-3xl font-bold mb-4">Login</h1>
        <p class="text-gray-600 mb-6">See your growth and get support!</p>
        <button
          @click="signInWithGoogle"
          class="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg mb-4"
          :disabled="authStore.loading"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google Icon" class="w-5 h-5 mr-2" />
          {{ authStore.loading ? 'Signing in...' : 'Sign in with Google' }}
        </button>
        <Form @submit="handleLogin">
          <FormInput
            name="email"
            label="Email*"
            type="email"
            rules="required|email"
            v-model="email"
            placeholder="Enter your email"
          />
          <FormInput
            name="password"
            label="Password*"
            type="password"
            rules="required|min:8"
            v-model="password"
            placeholder="minimum 8 characters"
          />
          <div class="flex justify-between items-center mb-6">
            <label class="flex items-center">
              <input type="checkbox" class="mr-2" v-model="rememberMe" />
              Remember me
            </label>
            <a href="#" class="text-blue-600">Forgot password?</a>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-900 text-white py-2 rounded-lg"
            :disabled="authStore.loading"
          >
            {{ authStore.loading ? 'Logging in...' : 'Login' }}
          </button>
        </Form>
        <p class="mt-4 text-center">
          Not registered yet? <router-link to="/register" class="text-blue-600">Create a new account</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Form } from 'vee-validate';
import FormInput from '@/components/FormInput.vue';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'Login',
  components: {
    Form,
    FormInput,
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
    };
  },
  methods: {
    async handleLogin() {
      try {
        await this.authStore.login(this.email, this.password);
        this.$router.push('/dashboard');
      } catch (error) {
        alert(error.message);
      }
    },
    async signInWithGoogle() {
      try {
        await this.authStore.signInWithGoogle();
        this.$router.push('/dashboard');
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>