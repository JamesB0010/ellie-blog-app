import React, { forwardRef } from "react";
import fairyBook from "../assets/images/poch.png";

const PageTitle = forwardRef(() => {
    return (
        <div className = "page-title-container">
            <div className = "header-container">
                <h1>* ELLIE'S BLOG POSTING APP *</h1>
            </div>
            <div className = "fairy-book-container">
                <img src={fairyBook} alt={"cool fairy book"}/>
            </div>
        </div>
    )
});

export default PageTitle;