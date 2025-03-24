<template>
  <div class="flex min-h-screen">
    <!-- Left Side: Illustration -->
    <div class="hidden lg:block w-1/2 bg-gray-50 p-10">
      <img src="../assets/inventory-illustration.png" alt="Inventory Illustration" class="w-full h-auto" />
    </div>
    <!-- Right Side: Register Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-10">
      <div class="w-full max-w-md">
        <h1 class="text-3xl font-bold mb-4">Register</h1>
        <p class="text-gray-600 mb-6">Manage all your inventory efficiently</p>
        <Form @submit="handleRegister" v-slot="{ errors }">
          <div class="flex gap-4 mb-4">
            <div class="w-1/2">
              <FormInput
                name="firstName"
                label="First name"
                rules="required"
                v-model="firstName"
                placeholder="Enter your name"
              />
            </div>
            <div class="w-1/2">
              <FormInput
                name="lastName"
                label="Last name"
                rules="required"
                v-model="lastName"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div class="flex gap-4 mb-4">
            <div class="w-1/2">
              <FormInput
                name="email"
                label="Email"
                type="email"
                rules="required|email"
                v-model="email"
                placeholder="Enter your email"
              />
            </div>
            <div class="w-1/2">
              <FormInput
                name="phone"
                label="Phone no."
                type="tel"
                rules="required|phone"
                v-model="phone"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          <FormInput
            name="password"
            label="Password"
            type="password"
            rules="required|min:8"
            v-model="password"
            placeholder="Enter your password"
          />
          <label class="flex items-center mb-6">
            <Field
              name="terms"
              type="checkbox"
              :value="true"
              :unchecked-value="false"
              rules="required"
              v-model="terms"
              class="mr-2"
            />
            I agree to terms, privacy policies, and fees
            <span class="text-red-500 text-sm ml-2">{{ errors.terms }}</span>
          </label>
          <button
            type="submit"
            class="w-full bg-blue-900 text-white py-2 rounded-lg"
            :disabled="authStore.loading"
          >
            {{ authStore.loading ? 'Registering...' : 'Sign Up' }}
          </button>
        </Form>
        <p class="mt-4 text-center">
          Already have an account? <router-link to="/login" class="text-blue-600">Log in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from 'vee-validate';
import FormInput from '@/components/FormInput.vue';
import { useAuthStore } from '@/stores/auth';
import { db } from '@/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default {
  name: 'Register',
  components: {
    Form,
    Field,
    FormInput,
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      terms: false,
    };
  },
  methods: {
    async handleRegister() {
      try {
        await this.authStore.register(this.email, this.password, this.firstName, this.lastName);

        const user = this.authStore.user;
        await setDoc(doc(db, 'users', user.uid), {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          createdAt: new Date(),
        });

        this.$router.push('/dashboard');
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>