import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import * as _ from "lodash";
import Layout from "../layout";

export default ({ data }) => {
    const { allMarkdownRemark } = data;
    const { nodes } = allMarkdownRemark;

    const recipes = nodes.map(n => n.frontmatter);
    const categories = _.uniq(recipes.map(r => r.category));

    const PageHeader = (
        <>
            <h1>My Recipe Book</h1>
        </>
    );

    const PageContent = (
        <>
            <h3>All Recipes</h3>
            <div>
                {categories.map((c, i) => (
                    <span key={i}>{c}</span>
                ))}
            </div>
            <hr className="mt-4 mb-0" />
            <div>
                {recipes.map((r, i) => (
                    <p key={i}>
                        {r.category} | <Link to={r.path}>{r.title}</Link>
                    </p>
                ))}
            </div>
        </>
    );

    return (
        <>
            <Helmet defer={false}>
                <title>Home | RecipeBook</title>
            </Helmet>
            <Layout header={PageHeader} content={PageContent} />
        </>
    );
};

export const pageQuery = graphql`
    query {
        allMarkdownRemark {
            nodes {
                frontmatter {
                    category
                    date(formatString: "DD/MM/YYYY")
                    path
                    tags
                    time
                    title
                }
            }
        }
    }
`;
