import { toast} from 'react-toastify';
import { useEffect } from 'react';
import { GenerateBlogPostPromiseParams } from '../helpers/GenerateBlogPoastPromiseParams';
import { BLOG_POST_UPLOAD_TOAST_OPTIONS } from '../constants/BlogPostUploadToastOptions';
import { CreateUploadBlogPostPromise } from '../constants/CreateUploadBlogPostPromise';


const blogPostStarted = (async (title: string, afterPostUploadCallback: () => void) => {
  const uploadPromise = CreateUploadBlogPostPromise(title);
  const toastPromiseParams = GenerateBlogPostPromiseParams(title);

  try
  {
    await toast.promise(uploadPromise, toastPromiseParams, BLOG_POST_UPLOAD_TOAST_OPTIONS);
    afterPostUploadCallback();
  }
  catch(error)
  {
    console.log("Failed to upload blog post");
    console.log(error);
  }
});

const listenToBlogPostUpdateStarted = (afterPostUpload: () => void) => {
  const unsubscribe = window.api.onBlogPostUploadStarted((title: string) => {
    blogPostStarted(title, afterPostUpload);
  });

  return unsubscribe;
}


export const useBlogPostStatusUpdates = (afterPostUpload: () => void) => {
  useEffect(() => {
    const unsubscribe = listenToBlogPostUpdateStarted(afterPostUpload);

    return unsubscribe;
  }, []);
}