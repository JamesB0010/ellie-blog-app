import { ToastPromiseParams } from "react-toastify";

export const GenerateBlogPostPromiseParams = (title: string): ToastPromiseParams<string, string, string> => {
    return {
        pending: `Uploading blog post: ${title} ... ⏳`,
        success: `Blog post: ${title} uploaded successfully! 🥳`,
        error: `Failed to upload blog post: ${title} 😢`
    } as const;
};