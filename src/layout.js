import React from "react";

export default ({ header, content }) => {
    return (
        <div className="layout">
            <div className="header w-full bg-black text-white shadow-lg">
                <div className="max-w-3xl mx-auto p-6">{header}</div>
            </div>
            <div className="content max-w-3xl mx-auto p-6 overflow-hidden">
                {content}
            </div>
        </div>
    );
};
