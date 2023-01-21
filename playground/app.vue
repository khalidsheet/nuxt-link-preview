<script setup>
import { ref } from "vue";

const url = ref("");
const meta = ref(null);

const getMetaTags = async () => {
  const data = await $fetch("/api/link-preview", {
    query: {
      url: url.value,
    },
  });
  console.log(data.preview);
  meta.value = data.preview.meta;
};

console.log("ss", meta.value);
</script>

<template>
  <input type="text" v-model="url" />
  <button @click="getMetaTags">Get MetaTags</button>
  <div>
    <div class="meta" v-for="property in meta">
      <div class="property">{{ property.name }}</div>
      <div class="value">{{ property.value || "N/A" }}</div>
    </div>
  </div>
</template>
<style scoped>
.meta {
  background-color: #e5e5e5;
  margin-top: 16px;
  padding: 10px;
  border-radius: 6px;
}

.meta .property {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}
</style>
