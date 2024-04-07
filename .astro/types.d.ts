declare module "astro:content" {
  interface Render {
    ".md": Promise<{
      Content: import("astro").MarkdownInstance<{}>["Content"];
      headings: import("astro").MarkdownHeading[];
      remarkPluginFrontmatter: Record<string, any>;
    }>;
  }
}

declare module "astro:content" {
  type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

  export type CollectionKey = keyof AnyEntryMap;
  export type CollectionEntry<C extends CollectionKey> = Flatten<
    AnyEntryMap[C]
  >;

  export type ContentCollectionKey = keyof ContentEntryMap;
  export type DataCollectionKey = keyof DataEntryMap;

  type AllValuesOf<T> = T extends any ? T[keyof T] : never;
  type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
    ContentEntryMap[C]
  >["slug"];

  export function getEntryBySlug<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C> | (string & {})
  >(
    collection: C,
    // Note that this has to accept a regular string too, for SSR
    entrySlug: E
  ): E extends ValidContentEntrySlug<C>
    ? Promise<CollectionEntry<C>>
    : Promise<CollectionEntry<C> | undefined>;

  export function getDataEntryById<
    C extends keyof DataEntryMap,
    E extends keyof DataEntryMap[C]
  >(collection: C, entryId: E): Promise<CollectionEntry<C>>;

  export function getCollection<
    C extends keyof AnyEntryMap,
    E extends CollectionEntry<C>
  >(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => entry is E
  ): Promise<E[]>;
  export function getCollection<C extends keyof AnyEntryMap>(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => unknown
  ): Promise<CollectionEntry<C>[]>;

  export function getEntry<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C> | (string & {})
  >(entry: {
    collection: C;
    slug: E;
  }): E extends ValidContentEntrySlug<C>
    ? Promise<CollectionEntry<C>>
    : Promise<CollectionEntry<C> | undefined>;
  export function getEntry<
    C extends keyof DataEntryMap,
    E extends keyof DataEntryMap[C] | (string & {})
  >(entry: {
    collection: C;
    id: E;
  }): E extends keyof DataEntryMap[C]
    ? Promise<DataEntryMap[C][E]>
    : Promise<CollectionEntry<C> | undefined>;
  export function getEntry<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C> | (string & {})
  >(
    collection: C,
    slug: E
  ): E extends ValidContentEntrySlug<C>
    ? Promise<CollectionEntry<C>>
    : Promise<CollectionEntry<C> | undefined>;
  export function getEntry<
    C extends keyof DataEntryMap,
    E extends keyof DataEntryMap[C] | (string & {})
  >(
    collection: C,
    id: E
  ): E extends keyof DataEntryMap[C]
    ? Promise<DataEntryMap[C][E]>
    : Promise<CollectionEntry<C> | undefined>;

  /** Resolve an array of entry references from the same collection */
  export function getEntries<C extends keyof ContentEntryMap>(
    entries: {
      collection: C;
      slug: ValidContentEntrySlug<C>;
    }[]
  ): Promise<CollectionEntry<C>[]>;
  export function getEntries<C extends keyof DataEntryMap>(
    entries: {
      collection: C;
      id: keyof DataEntryMap[C];
    }[]
  ): Promise<CollectionEntry<C>[]>;

  export function reference<C extends keyof AnyEntryMap>(
    collection: C
  ): import("astro/zod").ZodEffects<
    import("astro/zod").ZodString,
    C extends keyof ContentEntryMap
      ? {
          collection: C;
          slug: ValidContentEntrySlug<C>;
        }
      : {
          collection: C;
          id: keyof DataEntryMap[C];
        }
  >;
  // Allow generic `string` to avoid excessive type errors in the config
  // if `dev` is not running to update as you edit.
  // Invalid collection names will be caught at build time.
  export function reference<C extends string>(
    collection: C
  ): import("astro/zod").ZodEffects<import("astro/zod").ZodString, never>;

  type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
  type InferEntrySchema<C extends keyof AnyEntryMap> =
    import("astro/zod").infer<
      ReturnTypeOrOriginal<Required<ContentConfig["collections"][C]>["schema"]>
    >;

  type ContentEntryMap = {
    posts: {
      "apollo-client-testing-gotchas.md": {
        id: "apollo-client-testing-gotchas.md";
        slug: "apollo-client-testing-gotchas";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "bad-redux-toolkit-patterns.md": {
        id: "bad-redux-toolkit-patterns.md";
        slug: "bad-redux-toolkit-patterns";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "being-mobile-first.md": {
        id: "being-mobile-first.md";
        slug: "being-mobile-first";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "deploy-from-github-pages.md": {
        id: "deploy-from-github-pages.md";
        slug: "deploy-from-github-pages";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "do-i-know-jest.md": {
        id: "do-i-know-jest.md";
        slug: "do-i-know-jest";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "do-i-know-webpack.md": {
        id: "do-i-know-webpack.md";
        slug: "do-i-know-webpack";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "do-i-use-redux.md": {
        id: "do-i-use-redux.md";
        slug: "do-i-use-redux";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "github-step-summary.md": {
        id: "github-step-summary.md";
        slug: "github-step-summary";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "host-docker-internal.md": {
        id: "host-docker-internal.md";
        slug: "host-docker-internal";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "how-i-feel-about-typescript-part1.md": {
        id: "how-i-feel-about-typescript-part1.md";
        slug: "how-i-feel-about-typescript-part1";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "how-i-feel-about-typescript-part2.md": {
        id: "how-i-feel-about-typescript-part2.md";
        slug: "how-i-feel-about-typescript-part2";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "how-i-work-code-style.md": {
        id: "how-i-work-code-style.md";
        slug: "how-i-work-code-style";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "infinite-scroll.md": {
        id: "infinite-scroll.md";
        slug: "infinite-scroll";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "mermaid-tutorial.md": {
        id: "mermaid-tutorial.md";
        slug: "mermaid-tutorial";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "my-journey.md": {
        id: "my-journey.md";
        slug: "my-journey";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "new-site-who-dis-buildchain-part1.md": {
        id: "new-site-who-dis-buildchain-part1.md";
        slug: "new-site-who-dis-buildchain-part1";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "new-site-who-dis-css-part2.md": {
        id: "new-site-who-dis-css-part2.md";
        slug: "new-site-who-dis-css-part2";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "not-again-astro.md": {
        id: "not-again-astro.md";
        slug: "not-again-astro";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "preact.md": {
        id: "preact.md";
        slug: "preact";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "react-class-vs-function-1-this.md": {
        id: "react-class-vs-function-1-this.md";
        slug: "react-class-vs-function-1-this";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "react-class-vs-function-2-closures-and-memory.md": {
        id: "react-class-vs-function-2-closures-and-memory.md";
        slug: "react-class-vs-function-2-closures-and-memory";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "too-much-useselector.md": {
        id: "too-much-useselector.md";
        slug: "too-much-useselector";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
      "typescript-json-keyof-typeof.md": {
        id: "typescript-json-keyof-typeof.md";
        slug: "typescript-json-keyof-typeof";
        body: string;
        collection: "posts";
        data: InferEntrySchema<"posts">;
      } & { render(): Render[".md"] };
    };
  };

  type DataEntryMap = {};

  type AnyEntryMap = ContentEntryMap & DataEntryMap;

  export type ContentConfig = typeof import("../src/content/config.js");
}
