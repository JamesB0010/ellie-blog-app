import { BlogPost } from "./BlogPost";

export {}

declare global {
    interface Window {
        api: {
            postBlog: (postData: BlogPost) => Promise<void>;
            onBlogPostUploadStarted: (callback: (postTitle: string) => void) => void;
            onBlogPostUploadFinished: (callback: (postTitle: string) => void) => void;
            onBlogPostUploadFailed: (callback: (postTitle: string) => void) => void;
        };
    }
}