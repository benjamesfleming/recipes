import React from "react";

export default ({ header, content }) => {
    return (
        <div className="layout">
            <div className="header w-full p-6 bg-black text-white">
                <div className="max-w-3xl mx-auto">
                    {header}
                </div>
            </div>
            <div className="content max-w-3xl mx-auto py-6">
                {content}    
            </div>
        </div>
    );
}