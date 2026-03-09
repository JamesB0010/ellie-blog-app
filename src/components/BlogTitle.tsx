import React, {forwardRef} from 'react';

const BlogTitle = forwardRef((props, ref) => {
    return (
        <div className = "blog-title-container section">
            <h1>Blog Title</h1>
            <textarea placeholder='Enter your blog title here...' />
        </div>
    );
});

export default BlogTitle;