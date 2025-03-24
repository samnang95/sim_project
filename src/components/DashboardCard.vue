<template>
  <div class="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
    <svg class="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
    <div>
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <p class="text-2xl font-bold">{{ value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    title: String,
    value: String,
    icon: String,
  },
};
</script>