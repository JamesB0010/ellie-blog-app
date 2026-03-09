import React, {forwardRef} from "react";

const PublishPost = forwardRef((props, ref) => {
    return (
        <div className = "publish-post-container section">
            <button> Publish Post </button>
        </div>
    );
});

export default PublishPost;