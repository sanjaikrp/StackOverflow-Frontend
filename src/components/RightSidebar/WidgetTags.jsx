import React from "react";

import "./RightSidebar.css"

const WidgetTags = () => {

const tags= ["c","css","express","firebase","html","java","javascript","mern","mongodb","mysql","next.js","php","python","react.js"]

    return (
        <div className="widget-tags">
           <h4>Watched Tags</h4>
           <div className="widget-tags-div">
               {
                tags.map((tag)=>(
                    <p key={tag}>{tag}</p>
                ))
               }
           </div>

        </div>
    )
}

export default WidgetTags;