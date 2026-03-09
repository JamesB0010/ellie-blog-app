import React, { forwardRef } from 'react';
import PageTitle from '../components/PageTitle';
import BlogTitle from '../components/BlogTitle';
import BlogContents from '../components/BlogContents';
import PublishPost from '../components/PublishPost';

const MainPage = forwardRef((props, ref) => {
    return (
        <div className="page-column-container">
            <PageTitle />
          <div className="boxesContainer">
            <BlogTitle />
            <div className = "blog-title-contents-buffer"/>
            <BlogContents />
            <div className = "blog-contents-publish-buffer"/>
            <PublishPost />
            <div className = "end-buffer"/>
          </div>
        </div>

    )
});

export default MainPage;