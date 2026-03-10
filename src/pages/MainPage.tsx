import React, { forwardRef, useEffect, useRef} from 'react';
import PageTitle from '../components/PageTitle';
import BlogTitle from '../components/BlogTitle';
import BlogContents from '../components/BlogContents';
import PublishPost from '../components/PublishPost';
import { ToastContainer, toast } from 'react-toastify';

const MainPage = forwardRef((props, ref) => {
  const blogTitleRef = useRef<HTMLTextAreaElement | null>(null);
  const blogContentsRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect((() =>
  {
    const unsubscribe = window.api.onBlogPostUploadStarted((title: string) =>{
      const minimumPostUploadTime = 1000; // in milliseconds
      const thisPostTitle = title;
      toast.promise(new Promise<void>((resolve, reject) =>
      {
        const postStarted = Date.now();

        window.api.onBlogPostUploadFinished((title: string) => {
          if(title !== thisPostTitle)
            return;

          const delta = Date.now() - postStarted;
          setTimeout(resolve, minimumPostUploadTime - delta);
        });

        window.api.onBlogPostUploadFailed((title: string) => {
          if(title !== thisPostTitle)
            return;

          const delta = Date.now() - postStarted;
          setTimeout(reject, minimumPostUploadTime - delta);
        });
      }), {
        pending: `Uploading blog post: ${thisPostTitle} ... ⏳`,
        success: `Blog post: ${thisPostTitle} uploaded successfully! 🥳`,
        error: `Failed to upload blog post: ${thisPostTitle} 😢`
      }, {
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      }).then(() => {
        clearFields();
      }).catch((e) =>{
        console.log("Failed to upload blog post");
        console.log(e);
      });
    });

    return unsubscribe;
  }), []);

  const validateFields = (): [valid: boolean, errorMessage: string] =>
  {
    let valid = true;

    if (blogTitleRef.current.value.length === 0)
    {
      valid = false;
      return [valid, "Ruh-oh 🙈 Blog title cannot be empty"];
    }

    if (blogContentsRef.current.value.length === 0)
    {
      valid = false;
      return [valid, "Ruh-oh 🙈 Blog contents cannot be empty"];
    }

    return [valid, ""];
  }

  const onUploadPostClick = async () =>
  {
    const [valid, errorMessage] = validateFields();
    if (!valid)
    {
      toast.error(errorMessage);
      return;
    }

    await window.api.postBlog({
      title: blogTitleRef.current.value,
      content: blogContentsRef.current.value
    })

  }

  const clearFields = () =>
  {
    if (blogTitleRef.current)
      blogTitleRef.current.value = "";

    if (blogContentsRef.current)
      blogContentsRef.current.value = "";
  }

    return (
      <>
        <ToastContainer />
        <div className="page-column-container">
            <PageTitle />
          <div className="boxesContainer">
            <BlogTitle
              ref={blogTitleRef}
            />
            <div className = "blog-title-contents-buffer"/>
            <BlogContents
              ref={blogContentsRef}
            />
            <div className = "blog-contents-publish-buffer"/>
            <PublishPost
              onClick={onUploadPostClick}
            />
            <div className = "end-buffer"/>
          </div>
        </div>
      </>
    )
});

export default MainPage;