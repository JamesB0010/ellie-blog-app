import { MINIMUM_POST_UPLOAD_TIME } from "./UploadBlogPostConstants";

const listenToBlogPostUploadFailed = (postTitle: string, postStarted: number, callback: () => void): void =>
{
  window.api.onBlogPostUploadFailed((title: string) => {
    if (title !== postTitle)
      return;

    const delta = Date.now() - postStarted;
    setTimeout(callback, MINIMUM_POST_UPLOAD_TIME - delta);
  });
}

const listenToBlogPostUploadFinish = (postTitle: string, postStarted: number, callback: () => void): void =>
{
  window.api.onBlogPostUploadFinished((title: string) => {
    if (title !== postTitle)
      return;

    const delta = Date.now() - postStarted;
    setTimeout(callback, MINIMUM_POST_UPLOAD_TIME - delta);
  });
}

const listenToBlogPostUploadEvents = (postTitle: string, resolve: () => void, reject: () => void) => {
  const postStarted = Date.now();

  listenToBlogPostUploadFinish(postTitle, postStarted, resolve);

  listenToBlogPostUploadFailed(postTitle, postStarted, reject);
  
}

export const CreateUploadBlogPostPromise = (postTitle: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        listenToBlogPostUploadEvents(postTitle, resolve, reject);
  }); 
}