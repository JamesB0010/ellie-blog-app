import React, {forwardRef} from "react";

const PublishPost = forwardRef((props, ref) => {

    const onClick = () =>
    {
        window.api.postBlog({
            title: "Hello from posting app!",
            content: "This is my first post using the blog posting app"
        });
    }

    return (
        <div className = "publish-post-container section">
            <button onClick={onClick}> Publish Post </button>
        </div>
    );
});

export default PublishPost;