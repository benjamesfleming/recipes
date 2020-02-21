import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import * as _ from "lodash";
import * as moment from "moment";
import useTimeout from "../utils/use-timeout";
import Layout from "../layout";

export default ({ data }) => {
    const { markdownRemark } = data; 
    const { frontmatter, html } = markdownRemark;
    const { title, category, date, time } = frontmatter;

    // split the time string. `cook=20m prep=20m` => `[['cook', '20m'], ['prep', '20m']]`
    // then generate a finishedBy date
    const timeComponents = useMemo(() => _.chunk(time.split(/[ =]/), 2), [time]);
    const finishedBy = useTimeout(
        () => timeComponents.reduce((r, [,v]) => r.add(.../([0-9]{1,}) ?(s|m|h)/.exec(v).splice(1, 2)), moment()).format('h:mm:ss A'), 1000
    );

    const RecipeHeader = (
        <>
            <a href="/"><h1>My Recipe Book</h1></a>
            <h1>{title}</h1>
            <div className="flex flex-row items-center justify-between">
                <span className="flex flex-row items-center justify-start">
                    <span className="text-3xl">{category} |&nbsp;</span>
                    <span>
                        <span>
                        {
                            timeComponents.map(([k, v], i) => 
                                <span key={i}>{_.startCase(k)} Time: {v}{i < timeComponents.length -1 && ` | `}</span>
                            )
                        } 
                        </span>
                        <br/>
                        <span>Finished By {finishedBy}</span>
                    </span>
                </span>
                <span>{date}</span>
            </div>
        </>
    );

    const RecipeContent = (
        <>
            <div className="">
                <Link>Home</Link>&nbsp;<strong>&gt;</strong>&nbsp;{title}
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }}/>
        </>
    );

    return (
        <>
            <Helmet defer={false}>
                <title>{title} | RecipeBook</title>
            </Helmet>
            <Layout header={RecipeHeader} content={RecipeContent}/>
        </>
    );
};

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "DD/MM/YYYY")
                path
                title
                tags
                time
                category
            }
        }
    }
`;