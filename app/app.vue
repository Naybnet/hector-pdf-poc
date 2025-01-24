<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    <div v-if="data">
      {{ data }}
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, error } = await useFetch('/api/generate', { method: 'post', body: { name: 'sample.pdf', role: 'admin' } })
</script>
