import { LinkPreview } from "./../runtime/types";
import { useNuxtApp } from "#app";

/**
 * useLinkPreview
 * @param url A url to fetch
 * @returns Promise<Partial<LinkPreview>>
 * @throws Error
 */
export default async function (url: string): Promise<Partial<LinkPreview>> {
  const request = await $fetch(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  const html = (request as string).replaceAll("\\", "");
  const { metaTagsContent, others } = extractMetaTag(html);

  return {
    url,
    title: others["og:title"],
    image: others["og:image"],
    description: others["og:description"] || others["description"],
    meta: metaTagsContent,
  };
}

/**
 * extractMetaTags
 * @param tags string
 * @returns Object
 */
function extractMetaTag(tags: string) {
  const regexp = new RegExp("<meta.*?(|</meta)>", "g");
  let metaTagsContent: any[] = [];
  let metaTagsList: RegExpMatchArray | null = null;
  let others: any = {};
  if (tags) {
    metaTagsList = tags.match(regexp);
    metaTagsList?.map((tag) => {
      let nameRegexp = new RegExp('((?<=name=")|(?<=property=")).*?(?=")', "g");
      let contentRegexp = new RegExp('(?<=content=").*?(?=")', "g");
      let contentRegexp1 = new RegExp("<meta*?>(.*?)</meta>", "g");
      let name = tag.match(nameRegexp);
      let content = tag.match(contentRegexp);
      content = content || tag.match(contentRegexp1);
      if (name && content) {
        if (
          checkForOG(name, "title") ||
          checkForOG(name, "image") ||
          checkForOG(name, "title") ||
          checkForOG(name, "description")
        ) {
          others[name[0]] = content[0];
        } else {
          metaTagsContent.push({
            name: name[0],
            value: content[0],
          });
        }
      }
    });
  }
  return { metaTagsContent, others };
}

/**
 * checkForOG
 * @param name RegExp match name
 * @param property Property Name to check
 * @returns boolean
 */
function checkForOG(name: RegExpMatchArray, property: string): boolean {
  return name[0].startsWith("og:" + property) || name[0].startsWith(property);
}
