export function extractTags(html: string) {
  const keys = /(property|name).+\"(og:|twitter:)?([a-zA-Z-+])+\"/i;
  return keys.exec(html);
}
