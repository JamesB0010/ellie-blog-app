import React, {forwardRef, ForwardedRef} from 'react';

const BlogTitle = forwardRef((props: unknown, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
        <div className = "blog-title-container section">
         <div className="textInner">
            <h1>BLOG TITLE</h1>
            <textarea
                ref={ref}
                placeholder='Enter your blog title here...' />
         </div> 
        </div>
    );
});

export default BlogTitle;