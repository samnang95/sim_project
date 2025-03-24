<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4">Top Selling Products</h3>
    <table class="w-full text-left">
      <thead>
        <tr>
          <th class="py-2">order ID</th>
          <th>Quantity</th>
          <th>Alert amt.</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in inventoryStore.topSellingProducts" :key="item.id">
          <td class="py-2">{{ item.orderId }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.alertAmount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useInventoryStore } from '@/stores/inventory';

export default {
  name: 'TopSellingTable',
  setup() {
    const inventoryStore = useInventoryStore();
    inventoryStore.fetchTopSellingProducts();
    return { inventoryStore };
  },
};
</script>