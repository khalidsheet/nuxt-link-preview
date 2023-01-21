export type LinkPreview = {
  url: string;
  image: string;
  title: string;
  description: string;
  meta: Meta[];
};

export type Meta = {
  name: string;
  value: string;
};
