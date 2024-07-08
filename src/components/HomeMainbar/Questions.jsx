import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Questions = ({ question }) => {
    return (
        <div className="display-question-container">
           
            <div className="display-votes-ans">

                <p>{question.upVote.length} votes</p> 
                <p>{question.downVote.length} downvote</p>
                <p>{question.answer.length} answers</p>

            </div>
            {/* <div className="display-votes-ans">
                <p>{question.noOfAnswers}</p>
                <p>answers</p>
            </div> */}
            <div className="display-question-details">
                <Link style={{textDecoration:"none",fontSize:"17px"}} to={`/Questions/${question._id}`}>{question.questionTitle}</Link>
                <div className="question-body">
                    <p>{question.questionBody.substring(0, 150)}...</p>
                </div>
                <div className="display-tags-time">
                    <div className="display-tags">
                        {
                            question.questionTags.map((tag) => (
                                <p key={tag}>{tag}</p>
                            ))
                        }
                    </div>
                    <p className="display-time">
                        asked {moment(question.askedOn).fromNow()} {question.userPosted.charAt(0).toUpperCase() + question.userPosted.slice(1)}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Questions;
