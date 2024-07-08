import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"

import "./HomeMainbar.css"

import Questions from "./Questions.jsx";
import { useSelector } from "react-redux";
import QuestionList from "./QuestionList"

const HomeMainbar = () => {

  const location = useLocation();
  const user = 1;
  const questionList =useSelector((state) => (state.questionReducer))
  const navigate = useNavigate();

  





  const redirect = () => {
   if(user === null){
    navigate("/Auth")
   }
   else{
    navigate("/AskQuestion")
   }
    
  }

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {
          location.pathname === '/' ? <h1>Top Questions</h1> : <h1>Questions</h1>
        }
        <button className="ask-btn-1" onClick={redirect}>Ask Question</button>
      </div>
      <div>
        {
          questionList.data === null ? <h1>Loading...</h1> :
            <>
              <div className="main-bar-header2">
                <div>
                  <p>{questionList.data.length} questions with no <br />upvoted or accepted answers</p>

                </div>
                <div className="mainbar-header-buttons">
                  <Link to="/New" ><button type="button" className="ask-btn-2" style={{ borderTopLeftRadius: "3px", borderBottomLeftRadius: "3px" }}>New</button></Link>
                  <Link to="/Active" ><button type="button" className="ask-btn-2 ">Active</button></Link>
                  <Link to="/Bountied" ><button type="button" className="ask-btn-2 Bountied">Bountied</button></Link>
                  <Link to="/Unanswered" ><button type="button" className="ask-btn-2 Unanswered">Unanswered</button></Link>

                  <button type="button" className="ask-btn-2" style={{ borderTopRightRadius: "3px", borderBottomRightRadius: "3px" }}>More</button>
                  <button type="button" className="ask-btn-2 filter">Filter</button>
                </div>

              </div>

              <hr style={{ width: "100%", marginLeft: "0" }} />
              <QuestionList questionsList={questionList.data}/>
              {/* {
                questionList.data.map((question) => (
                  <Questions question={question} />
                ))
              } */}
            </>
        }
      </div>

    </div>
  )
}

export default HomeMainbar;