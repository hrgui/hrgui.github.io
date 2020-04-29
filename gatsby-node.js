/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

async function createPortfolioPages({actions, graphql}) {
  const { createPage } = actions;

  // TODO yeah, blog templates needed here.
  const portfolioTemplate = path.resolve(`src/templates/portfolioTemplate.tsx`)

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    return Promise.reject(result.errors);
  }

  const edges = result.data.allMarkdownRemark.edges;

  for (const {node} of edges) {
    if (!node.frontmatter.path) {
      console.log(node);
      continue;
    }


    createPage({
      path: node.frontmatter.path,
      component: portfolioTemplate,
      context: {
        apple: true
      }, // additional data can be passed via context
    })
  }
}

exports.createPages = async (props) => {
  await createPortfolioPages(props); 
}