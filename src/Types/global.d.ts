import { BlogPost } from "./BlogPost";
import { BlogPostUploadStateCallbackType } from "./IcpCommunication/IcpCommunicationCallbackTypes";

export {}

declare global {
    interface Window {
        api: {
            postBlog: (postData: BlogPost) => Promise<void>;

            onBlogPostUploadStarted: (callback: BlogPostUploadStateCallbackType) => void;
            onBlogPostUploadFinished: (callback: BlogPostUploadStateCallbackType) => void;
            onBlogPostUploadFailed: (callback: BlogPostUploadStateCallbackType) => void;
        };
    }
}