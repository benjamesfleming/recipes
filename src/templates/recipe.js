import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import * as _ from "lodash";
import * as moment from "moment";
import useTimeout from "../utils/use-timeout";
import DynamicText from "../utils/dynamic-text";
import Layout from "../layout";

export default ({ data }) => {
    const { markdownRemark } = data;
    const { frontmatter, html } = markdownRemark;
    const { title, category, date, time } = frontmatter;

    // split the time string. `cook=20m prep=20m` => `[['cook', '20m'], ['prep', '20m']]`
    const timeComponents = useMemo(() => {
        return _.chunk(time.split(/[ =]/), 2);
    }, [time]);

    // generate a finished by date
    const finishedByFormat = "h:mm:ss A";
    const finishedBy = useTimeout(
        () =>
            timeComponents
                .reduce((date, [, tc]) => {
                    const regex = new RegExp(/([0-9]{1,}) ?(s|m|h)/);
                    const [, duration, unit] = regex.exec(tc);

                    return date.add(duration, unit);
                }, moment())
                .format(finishedByFormat),
        1000
    );

    const RecipeHeader = (
        <>
            <a href="/">
                <h1>My Recipe Book</h1>
            </a>
            <div className="mb-4">
                <DynamicText tag="h1">{title}</DynamicText>
            </div>
            <div
                className="flex flex-row items-center justify-between shadow-inner rounded w-full p-2"
                style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            >
                <span className="flex flex-row items-center justify-start">
                    <span className="text-3xl hidden md:block whitespace-no-wrap">
                        {category} \\&nbsp;
                    </span>
                    <span>
                        <DynamicText>
                            {timeComponents.map(([k, v], i) => (
                                <>
                                    {_.startCase(k)} Time: {v}
                                    {i < timeComponents.length - 1 && ` \\\\ `}
                                </>
                            ))}
                        </DynamicText>
                        <br />
                        <span>Finished By {finishedBy}</span>
                    </span>
                </span>
                <span className="hidden md:block">
                    {moment(date).format("dddd Do of MMM YYYY")}
                </span>
            </div>
        </>
    );

    const RecipeContent = (
        <>
            <div className="w-100 relative">
                <DynamicText>
                    <Link to="/">Home</Link>
                    &nbsp;\\&nbsp;
                    {title}
                </DynamicText>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </>
    );

    return (
        <>
            <Helmet defer={false}>
                <title>{title} \\ RecipeBook</title>
            </Helmet>
            <Layout header={RecipeHeader} content={RecipeContent} />
        </>
    );
};

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date
                path
                title
                tags
                time
                category
            }
        }
    }
`;
