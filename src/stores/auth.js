import { defineStore } from 'pinia';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  registerWithEmail,
  loginWithEmail,
  signInWithGoogle,
  logout as firebaseLogout,
} from '@/firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),
  actions: {
    // Initialize the auth state by listening to Firebase auth changes
    init() {
      this.loading = true;
      onAuthStateChanged(auth, (user) => {
        this.user = user ? { uid: user.uid, email: user.email, displayName: user.displayName } : null;
        this.loading = false;
      });
    },
    // Register a new user
    async register(email, password, firstName, lastName) {
      this.loading = true;
      this.error = null;
      try {
        const user = await registerWithEmail(email, password, firstName, lastName);
        this.user = { uid: user.uid, email: user.email, displayName: user.displayName };
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // Login with email and password
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const user = await loginWithEmail(email, password);
        this.user = { uid: user.uid, email: user.email, displayName: user.displayName };
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // Sign in with Google
    async signInWithGoogle() {
      this.loading = true;
      this.error = null;
      try {
        const user = await signInWithGoogle();
        this.user = { uid: user.uid, email: user.email, displayName: user.displayName };
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // Logout
    async logout() {
      this.loading = true;
      this.error = null;
      try {
        await firebaseLogout();
        this.user = null;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    userName: (state) => state.user?.displayName || state.user?.email?.split('@')[0] || 'User',
  },
});