// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@showcase": path.resolve(__dirname, "../showcase/src"),
      },
    },
  },
  redirects: {
    "/": "/getting-started/introduction",
  },
  integrations: [
    starlight({
      title: "shadcn-rn",
      favicon: "./src/assets/logo.svg",
      logo: {
        src: "./src/assets/logo.svg",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/AlexanderHOtt/shadcn-rn",
        },
      ],
      customCss: ["./src/global.css"],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Installation", slug: "getting-started/installation" },
            { label: "Resources", slug: "getting-started/resources" },
          ],
        },
        // {
        //   label: "Guides",
        //   items: [
        //     // Each item here is one entry in the navigation menu.
        //     { label: "Example Guide", slug: "guides/example" },
        //   ],
        // },
        // {
        //   label: "Reference",
        //   autogenerate: { directory: "reference" },
        // },
        {
          label: "Components",
          autogenerate: { directory: "components" },
        },
      ],
      editLink: {
        baseUrl:
          "https://github.com/AlexanderHOtt/shadcn-rn/edit/main/apps/docs/",
      },
    }),
  ],
  site: "https://shadcn-rn.vercel.app/",
});
