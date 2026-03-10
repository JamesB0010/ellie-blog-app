import { toast } from 'react-toastify';
import { MINIMUM_POST_UPLOAD_TIME } from '../constants/UploadBlogPostConstants';
import { useEffect } from 'react';

export const useBlogPostStatusUpdates = (afterPostUpload: () => void) => {
  const listenToBlogPostUpdateStarted = () => {
    const blogUploadStartedCallback = (title: string) => {
      const thisPostTitle = title;
      toast.promise(new Promise<void>((resolve, reject) => {
        const postStarted = Date.now();

        window.api.onBlogPostUploadFinished((title: string) => {
          if (title !== thisPostTitle)
            return;

          const delta = Date.now() - postStarted;
          setTimeout(resolve, MINIMUM_POST_UPLOAD_TIME - delta);
        });

        window.api.onBlogPostUploadFailed((title: string) => {
          if (title !== thisPostTitle)
            return;

          const delta = Date.now() - postStarted;
          setTimeout(reject, MINIMUM_POST_UPLOAD_TIME - delta);
        });
      }), {
        pending: `Uploading blog post: ${thisPostTitle} ... ⏳`,
        success: `Blog post: ${thisPostTitle} uploaded successfully! 🥳`,
        error: `Failed to upload blog post: ${thisPostTitle} 😢`
      }, {
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      }).then(() => {
        afterPostUpload();
      }).catch((e) => {
        console.log("Failed to upload blog post");
        console.log(e);
      });

    };


    const unsubscribe = window.api.onBlogPostUploadStarted(blogUploadStartedCallback);
    return unsubscribe;
  }

  useEffect(() => {
    const unsubscribe = listenToBlogPostUpdateStarted();

    return unsubscribe;
  }, []);
}