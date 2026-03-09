import React, {ForwardedRef, forwardRef} from 'react';

const BlogContents = forwardRef((props: unknown, ref: ForwardedRef<HTMLTextAreaElement>) =>
{
    return (
        <div className = "blog-contents-container section">
            <h1>Blog Contents</h1>
            <textarea
                ref={ref}
                placeholder='Enter your blog contents here...' />
        </div>

    );
});

export default BlogContents;