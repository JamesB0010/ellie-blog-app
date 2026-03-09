import React, {forwardRef} from "react";

export interface PublishPostProps {
    onClick: () => void;
}

const PublishPost = forwardRef(({onClick}: PublishPostProps, ref) => {

    return (
        <div className = "publish-post-container section">
            <button onClick={onClick}> Publish Post </button>
        </div>
    );
});

export default PublishPost;