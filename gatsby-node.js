const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const component = path.resolve(`src/templates/recipe.js`);
    const result = await graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
            ) {
                edges {
                    node {
                        frontmatter {
                            path
                        }
                    }
                }
            }
        }
    `);

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    // Create the pages
    for (let { node } of result.data.allMarkdownRemark.edges) {
        createPage({
            path: node.frontmatter.path,
            component, context: {},
        });
    }
}