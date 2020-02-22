import React, { useRef, useEffect } from "react";
import fitty from "fitty";

export default ({ tag = "span", children }) => {
    const element = useRef(null);
    const props = {
        ref: el => (element.current = el),
        style: {
            width: "100%",
        },
    };

    // refit the text on element changes
    useEffect(() => {
        if (element.current !== null) {
            let ref = fitty(element.current, {});
            return () => {
                ref.unsubscribe();
            };
        }
    }, [element]);

    return React.createElement(tag, props, children);
};
