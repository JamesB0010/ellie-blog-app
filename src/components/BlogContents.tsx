import React, {forwardRef} from 'react';

const BlogContents = forwardRef((props, ref) =>
{
    return (
        <div className = "blog-contents-container section">
            <h1>Blog Contents</h1>
            <textarea placeholder='Enter your blog contents here...' />
        </div>

    );
});

export default BlogContents;