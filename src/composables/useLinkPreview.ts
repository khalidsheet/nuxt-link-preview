import { LinkPreview } from "./../runtime/types";

export default async function (url: string): Promise<Partial<LinkPreview>> {
  const request = await $fetch(url);

  const html = (request as string).replaceAll("\\", "");

  const { metaTagsContent } = extractMetaTag(html);

  return {
    url,
    meta: metaTagsContent,
  };
}

function extractMetaTag(tags: string) {
  const regexp = new RegExp("<meta.*?(|</meta)>", "g");
  let metaTagsContent: any[] = [];
  let metaTagsList: RegExpMatchArray | null = null;
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
        metaTagsContent.push({
          name: name[0],
          value: content[0],
        });
      }
    });
  }
  return { metaTagsList, metaTagsContent };
}
