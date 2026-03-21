import React, {forwardRef, ForwardedRef} from 'react';

const BlogTitle = forwardRef((props: unknown, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
        <div className = "blog-title-container section">
          <div className = "blog-title-container-inner">
            <h1>Blog Title</h1>
            <textarea
                ref={ref}
                placeholder='Enter your blog title here...' />
          </div>
        </div>
    );
});

export default BlogTitle;