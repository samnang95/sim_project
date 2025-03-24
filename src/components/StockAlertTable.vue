<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4">Stock Alert</h3>
    <table class="w-full text-left">
      <thead>
        <tr>
          <th class="py-2">order ID</th>
          <th>Date</th>
          <th>Quantity</th>
          <th>Alert amt.</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in inventoryStore.stockAlerts" :key="item.id">
          <td class="py-2">{{ item.orderId }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.alertAmount }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useInventoryStore } from '@/stores/inventory';

export default {
  name: 'StockAlertTable',
  setup() {
    const inventoryStore = useInventoryStore();
    inventoryStore.fetchStockAlerts();
    return { inventoryStore };
  },
};
</script>