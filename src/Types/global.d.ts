import { BlogPost } from "./BlogPost";

export {}

declare global {
    interface Window {
        api: {
            postBlog: (postData: BlogPost) => Promise<void>;
        };
    }
}