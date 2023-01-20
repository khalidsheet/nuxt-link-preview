<script setup>
import { ref } from "vue";

const url = ref("");
const meta = ref({});

const getMetaTags = async () => {
  const data = await $fetch("/api/link-preview", {
    query: {
      url: "https://nuxt.com/docs/guide/concepts/esm",
    },
  });
  console.log(data.data);
  meta.value = data.data;
};

console.log(meta.value);
</script>

<template>
  <input type="text" v-model="url" />
  <button @click="getMetaTags">Get MetaTags</button>
</template>
