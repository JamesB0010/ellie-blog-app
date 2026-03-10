import React, { forwardRef, useRef} from 'react';
import PageTitle from '../components/PageTitle';
import BlogTitle from '../components/BlogTitle';
import BlogContents from '../components/BlogContents';
import PublishPost from '../components/PublishPost';
import { ToastContainer, toast } from 'react-toastify';
import { useBlogPostStatusUpdates as useBlogPostStatusUpdates } from '../hooks/useBlogPostStatusUpdates';
import { BLOG_TITLE_EMPTY_ERROR_MESSAGE, BLOG_CONTENTS_EMPTY_ERROR_MESSAGE } from '../constants/UploadBlogPostConstants';

const MainPage = forwardRef((props, ref) => {
  const blogTitleRef = useRef<HTMLTextAreaElement | null>(null);
  const blogContentsRef = useRef<HTMLTextAreaElement | null>(null);

  const clearFields = () =>
  {
    if (blogTitleRef.current)
      blogTitleRef.current.value = "";

    if (blogContentsRef.current)
      blogContentsRef.current.value = "";
  }
  
  useBlogPostStatusUpdates(clearFields);

  const validateFields = (): [valid: boolean, errorMessage: string] =>
  {
    let valid = true;

    if (blogTitleRef.current.value.length === 0)
    {
      valid = false;
      return [valid, BLOG_TITLE_EMPTY_ERROR_MESSAGE];
    }

    if (blogContentsRef.current.value.length === 0)
    {
      valid = false;
      return [valid, BLOG_CONTENTS_EMPTY_ERROR_MESSAGE];
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