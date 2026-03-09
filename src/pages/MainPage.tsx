import React, { forwardRef, useRef} from 'react';
import PageTitle from '../components/PageTitle';
import BlogTitle from '../components/BlogTitle';
import BlogContents from '../components/BlogContents';
import PublishPost from '../components/PublishPost';
import { ToastContainer, toast } from 'react-toastify';

const MainPage = forwardRef((props, ref) => {
  const blogTitleRef = useRef<HTMLTextAreaElement | null>(null);
  const blogContentsRef = useRef<HTMLTextAreaElement | null>(null);

  const onUploadPostClick = async () =>
  {
    if (blogTitleRef.current.value.length === 0)
      return;

    if (blogContentsRef.current.value.length === 0)
      return;

    await window.api.postBlog({
      title: blogTitleRef.current.value,
      content: blogContentsRef.current.value
    })

    toast.success("Blog post uploaded successfully!");
    clearFields();
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