import React, { useState } from "react";
import "./Questions.css"
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import moment from "moment"
import copy from "copy-to-clipboard"

import upVote from "../../ass/sort-up-solid.svg"
import downVote from "../../ass/sort-down-solid.svg"
import Avatar from "../../components/Avatar/Avatar"
import DisplayAnswer from "./DisplayAnswer"
import { postAnswer } from "../../actions/question";
import { deleteQuestion, voteQuestion } from "../../actions/question";


const QuesDetailsDisplay = () => {

  const { id } = useParams();

  
const questionList =useSelector((state) => (state.questionReducer))
// console.log(questionList.data.filter((question) => question._id === id));
  

  const [AnswerBody, setAns]= useState("")

  const dispatch= useDispatch();
  const Navigate = useNavigate()
  const User = useSelector((state)=>(state.currentUser));
  const location = useLocation()
  const url = "http://localhost:3000"

  const handlePostAns=(e, answerLength)=>{
       e.preventDefault()
       if(User === null){
        alert("Login or SignUp to answer the question")
        Navigate('/Auth')
       }else{
        if(AnswerBody === ""){
          alert("Enter answer for submitting")
        }else{
          dispatch(postAnswer({id, noOfAnswers: answerLength+1, answerBody: AnswerBody, userAnswered: User.result.name, userId: User.result._id}))
        }
       }
  }

  const handleShare = () => {
    copy(url + location.pathname)
    alert('copied url: ' + url + location.pathname)
}

 const handleQuesDelete = ()=>{
   dispatch(deleteQuestion(id, Navigate ));
 }

 const handleUpvote= ()=>{
  dispatch(voteQuestion(id,"upVote", User.result._id))
 }

 const handleDownvote=()=>{
  dispatch(voteQuestion(id,"downVote", User.result._id))
 }

  return (
    <div className="question-details-page">
      {
        questionList.data === null ?
          <h1> loading..</h1> :
          <>
            {
              questionList.data.filter((question) => question._id === id).map((question) => {
                return (
                  <div key={question._id}>
                    <section className="question-details-conatiner">
                      <h1>{question.questionTitle}</h1>
                      <div className="question-details-container-2">
                        <div className="question-votes">
                          <img src={upVote} className="votes-icon" onClick={handleUpvote} alt="" width="18px" />
                          <p>{question.upVote.length - question.downVote.length}</p>
                          <img src={downVote} className="votes-icon" onClick={handleDownvote} alt="" width="18px" />
                        </div>
                        <div style={{ width: "100%" }}>
                          <p className="question-body">{question.questionBody}</p>
                          <div className="question-details-tags">
                            {
                              question.questionTags.map((tag) => (
                                <p key={tag}>{tag}</p>
                              ))
                            }
                          </div>
                          <div className="question-actions-user">
                            <div>
                              <button type="button" onClick={handleShare}>Share</button>
                              {
                                User?.result?._id === question?.userId && 
                                  (<button type="button" onClick={handleQuesDelete}>Delete</button>)
                              }
                            </div>
                            <div >
                              <p>asked {moment(question.askedOn).fromNow()}</p>
                              <Link to={`/Users/${question.userId}`} className="user-link" style={{ color: '#00086d8' }}>
                                <Avatar backgroundColor="orange" px="8px" py="5px" style={{}}>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                <div>
                                  {question.userPosted}
                                </div>
                              </Link>
                            </div>
                          </div>

                        </div>
                      </div>
                    </section>
                    {
                      question.noOfAnswers !== 0 && (
                        <section>
                          <h3>{question.noOfAnswers} answers</h3>
                          <DisplayAnswer key={question._id} question={question} handleShare={handleShare}></DisplayAnswer>
                        </section>
                      )
                    }
                    <section className="post-ans-container">
                      <h3>Your Answer</h3>
                      <form  onSubmit={(e) =>{handlePostAns(e, question.answer.length)}}>
                        <textarea name="" id="" cols="30" rows="10" onChange={e => setAns(e.target.value)}></textarea> <br />
                        <input type="submit" className="post-ans-btn" value="Post your Answer"/>
                      </form>
                      <p>
                        Browse other question tagged
                        {
                          question.questionTags.map((tag) => (
                            <Link to="/Tags" key={tag} className="ans-tags">{tag}</Link>
                          ))
                        } or
                        <Link to="/AskQuestion" style={{ textDecoration: "none", color: "#009dff" }}> Ask your question</Link>
                      </p>
                    </section>
                  </div>
                )
              })
            }
          </>
      }


    </div>
  )
}

export default QuesDetailsDisplay;
