/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `recipes`,
                path: `${__dirname}/src/recipes`,
            },
        },
        `gatsby-transformer-remark`,
        `gatsby-plugin-postcss`,
        {
            resolve: `gatsby-plugin-purgecss`,
            options: {
                printRejected: false, // Print removed selectors and processed file names
                tailwind: true, // Enable tailwindcss support
            },
        },
        `gatsby-plugin-react-helmet`,
    ],
};
