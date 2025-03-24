<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div class="w-16 bg-blue-900 text-white flex flex-col items-center py-4">
      <div class="mb-6">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h18v18H3V3zm2 2v14h14V5H5z" />
        </svg>
      </div>
      <nav class="flex flex-col space-y-4">
        <router-link to="/dashboard" class="p-2 hover:bg-blue-700 rounded">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
          </svg>
        </router-link>
      </nav>
    </div>
    <!-- Main Content -->
    <div class="flex-1 p-6">
      <header class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <div class="flex items-center space-x-4">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          <div class="flex items-center space-x-2">
            <img src="https://via.placeholder.com/40" alt="User Avatar" class="w-10 h-10 rounded-full" />
            <span>{{ authStore.userName }}</span>
            <button @click="handleLogout" class="text-blue-600 hover:underline">Logout</button>
          </div>
        </div>
      </header>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Revenue" value="+30,000" icon="money" />
        <DashboardCard title="Sales Return" value="+30,000" icon="return" />
        <DashboardCard title="Purchase" value="+30,000" icon="purchase" />
        <DashboardCard title="Income" value="+30,000" icon="income" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div class="col-span-2 bg-white p-4 rounded-lg shadow">
          <BarChart />
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Top Selling Products</h3>
          <div class="w-48 h-48 bg-gray-800 rounded-full mx-auto"></div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StockAlertTable />
        <TopSellingTable />
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import DashboardCard from '../components/DashboardCard.vue';
import BarChart from '../components/BarChart.vue';
import StockAlertTable from '../components/StockAlertTable.vue';
import TopSellingTable from '../components/TopSellingTable.vue';

export default {
  name: 'Dashboard',
  components: {
    DashboardCard,
    BarChart,
    StockAlertTable,
    TopSellingTable,
  },
  setup() {
    const authStore = useAuthStore();
    authStore.init(); // Initialize the auth state
    return { authStore };
  },
  methods: {
    async handleLogout() {
      try {
        await this.authStore.logout();
        this.$router.push('/login');
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>