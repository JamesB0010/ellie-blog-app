import React, {ForwardedRef, forwardRef} from 'react';

const BlogContents = forwardRef((props: unknown, ref: ForwardedRef<HTMLTextAreaElement>) =>
{
    return (
        <div className = "blog-contents-container section">
         <div className="textInner">
            <h1>BLOG CONTENTS</h1>
            <textarea
                ref={ref}
                placeholder='Enter your blog contents here...' />
         </div>
        </div>

    );
});

export default BlogContents;