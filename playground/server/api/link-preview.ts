import useLinkPreview from "../../../src/composables/useLinkPreview";
export default defineEventHandler(async (event) => {
  const body = getQuery(event);
  const preview = await useLinkPreview(body.url as string);
  return { preview };
});
