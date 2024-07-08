import React from "react";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"

import RightSidebar from "../../components/RightSidebar/RightSidebar"
import QuestionDetails from "./QuesDetailsDisplay.jsx"

const displayQuestions = () => {

    return (
        <div className="home-container-1">
           <LeftSidebar />
           <div className="home-container-2">
                <QuestionDetails />
                <RightSidebar />
           </div>
        </div>
    )
}

export default displayQuestions;
