import { defineStore } from 'pinia';
import { db } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    stockAlerts: [],
    topSellingProducts: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchStockAlerts() {
      this.loading = true;
      this.error = null;
      try {
        const querySnapshot = await getDocs(collection(db, 'stockAlerts'));
        this.stockAlerts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchTopSellingProducts() {
      this.loading = true;
      this.error = null;
      try {
        const querySnapshot = await getDocs(collection(db, 'topSellingProducts'));
        this.topSellingProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});