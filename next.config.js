const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
});
