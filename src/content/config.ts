// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    hidden: z.boolean().optional(),
  }),
});

const portfolioItemsCollection = defineCollection({
  type: "content",
  schema: z.object({
    date: z.string().optional(),
    title: z.string().optional(),
    category: z.string().optional(),
    githubUrl: z.string().optional(),
    images: z
      .array(
        z.object({
          src: z.string(),
          thumbnail: z.string(),
        })
      )
      .optional(),
    demoUrl: z.string().optional(),
    url: z.string().optional(),
    urls: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
    iframe: z
      .object({
        scrolling: z.string(),
        height: z.number().optional(),
        src: z.string(),
        // Define the shape of PortfolioIframe
      })
      .optional(), // Assuming PortfolioIframe is another Zod schema
    whatIDid: z.array(z.string()).optional(),
    technologiesUsed: z
      .array(
        z.object({
          type: z.string(),
          value: z.number(),
          // Define the shape of PortfolioTechnology
        })
      )
      .optional(), // Assuming PortfolioTechnology is another Zod schema
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
  portfolio: portfolioItemsCollection,
};
