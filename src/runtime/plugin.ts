import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  return nuxtApp.$linkPreview;
});
