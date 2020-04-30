/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

async function createPages({actions, graphql}) {
  const { createPage } = actions;
  // ask for all markdown pages
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              template
              path
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    return Promise.reject(result.errors);
  }
  const componentMap = {
    'blog': path.resolve(`src/templates/blogTemplate.tsx`),
    'portfolio': path.resolve(`src/templates/portfolioTemplate.tsx`)
  };

  const edges = result.data.allMarkdownRemark.edges;

  for (const {node} of edges) {
    if (!node.frontmatter.path || !node.frontmatter.template) {
      console.error(node, 'is missing fronmatter.path or frontmatter.template');
      continue;
    }

    createPage({
      path: node.frontmatter.path,
      component: componentMap[node.frontmatter.template]
    })
  }
}

exports.createPages = async (props) => {
  await createPages(props); 
}