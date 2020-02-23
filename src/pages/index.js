import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import * as _ from "lodash";
import Layout from "../layout";

export default ({ data }) => {
    const { allMarkdownRemark } = data;
    const { nodes } = allMarkdownRemark;

    const [filters, setFilters] = useState([]);

    const recipes = nodes.map(n => n.frontmatter);
    const categories = _.uniq(recipes.map(r => r.category));
    const tags = _.uniq(
        recipes.reduce((current, r) => [...current, ...r.tags], [])
    );

    const filteredRecipes = useMemo(
        () =>
            filters.length > 0
                ? recipes.filter(
                      r =>
                          filters.filter(f => r.tags.indexOf(f) > -1).length >
                              0 || filters.indexOf(r.category) > -1
                  )
                : recipes,
        [filters, recipes]
    );

    const toggle = f => {
        setFilters(
            filters.indexOf(f) > -1
                ? filters.filter(_f => _f !== f)
                : [...filters, f]
        );
    };

    const PageHeader = (
        <>
            <h1>My Recipe Book</h1>
        </>
    );

    const PageContent = (
        <>
            <h3>Categories</h3>
            <div className="flex flex-wrap justify-start -mx-1">
                {categories.map((c, i) => (
                    <div
                        key={i}
                        tabIndex={i + 1}
                        role="button"
                        onClick={() => toggle(c)}
                        onKeyUp={e => e.keyCode === 13 && toggle(c)}
                        className={`
                            mx-1 mt-2 p-1 cursor-pointer border-b-4 rounded
                            ${
                                filters.indexOf(c) > -1
                                    ? "border-green-600 bg-green-200 shadow-lg"
                                    : "border-transparent"
                            }
                        `.trim()}
                    >
                        {c}
                    </div>
                ))}
            </div>
            <h3 className="mt-6">All Tags</h3>
            <div className="flex flex-wrap justify-between -mx-2">
                {tags.map((t, i) => (
                    <div
                        key={i}
                        tabIndex={categories.length + i + 1}
                        role="button"
                        onClick={() => toggle(t)}
                        onKeyUp={e => e.keyCode === 13 && toggle(t)}
                        className={`
                            mt-2 mx-2 cursor-pointer font-bold
                            ${
                                filters.indexOf(t) > -1
                                    ? "text-green-600"
                                    : "text-gray-800"
                            }
                        `.trim()}
                    >
                        {t}
                    </div>
                ))}
            </div>
            <hr className="mt-4 mb-0" />
            <div>
                {filteredRecipes.map((r, i) => (
                    <div
                        key={i}
                        className="mt-3 flex items-start justify-start"
                    >
                        <span className="whitespace-no-wrap">
                            {r.category} \\&nbsp;
                        </span>
                        <Link to={r.path}>{r.title}</Link>
                    </div>
                ))}
            </div>
        </>
    );

    return (
        <>
            <Helmet defer={false}>
                <title>Home \\ RecipeBook</title>
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
                    path
                    tags
                    title
                }
            }
        }
    }
`;
