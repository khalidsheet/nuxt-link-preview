# Nuxt3 Link Preview

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) ![npm bundle size](https://img.shields.io/bundlephobia/min/nuxt-link-preview)

A Nuxt.js 3.x module for previewing links using the Composition API.

## Installation
1. Add the module to your Nuxt.js project:
```bash
npm install --save nuxt-link-preview
```
2. Add nuxt-link-preview to the modules section of your nuxt.config.js file:
```typescript
modules: [
  'nuxt-link-preview'
],
```

## Types
```ts
interface Preview {
    title: string,
    description: string,
    image: string,
    url: string,
    meta: Meta[]
}

interface Meta {
        name: string;
        value: string
}
```

## Usage
In your project, you may create a new api endpoint inside `/server/api` called `preview.ts` or `preview.get.ts`

```typescript
export default defineEventHandler(async (event) => {
  const body = getQuery(event);
  const preview = await useLinkPreview(<string>body.url);
  return { preview };
});
```

## API
`useLinkPreview(url: string): Preview`

Fetches link preview data for the given url. Returns an object of the Preview interface with the following properties:

* `title` The title of the page
* `description` A short descriprion of the page
* `image` A URL to the main image of the page
* `url` The URL of the page
* `meta` The whole meta tags inside `<head>` tag


## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.


## Contributing
1. Fork the Repo
2. Create your feature/bugfix branch (git checkout -b my-branch)
3. Commit your changes (git commit -am "Add/fixed something somewhere")
4. Push to the branch (git push origin my-branch)
5. Create new Pull Request

## License
The project is licensed under the MIT License -- see the [LICENSE](https://opensource.org/licenses/MIT) file for details.