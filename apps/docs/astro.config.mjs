// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": "getting-started/introduction",
  },
  integrations: [
    starlight({
      title: "shadcn-rn",
      favicon: "./src/assets/logo.svg",
      logo: {
        src: "./src/assets/logo.svg",
      },
      social: {
        github: "https://github.com/AlexanderHOtt/shadcn-rn",
      },
      customCss: ["./src/global.css"],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Installation", slug: "getting-started/installation" },
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
});
