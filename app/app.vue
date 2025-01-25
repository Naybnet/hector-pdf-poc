<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    <div if="error">
      {{ error }}
    </div>
    <a @click="download">
      Download
    </a>
  </div>
</template>

<script setup lang="ts">
const { data, error } = await useFetch<Buffer>('/api/pdf', {
  method: 'post',
  body: { name: 'sample.pdf', role: 'admin' },
  responseType: 'blob',
})

function download() {
  if (data.value) {
    const file = URL.createObjectURL(new Blob([data.value]))
    window.location.assign(file)
  }
}
</script>
