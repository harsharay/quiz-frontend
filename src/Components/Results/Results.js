import React from "react"
import { Link } from "react-router-dom"

import "./Results.css"

const Results = (props) => {

    // useEffect(() => {
    //     console.log(props.location)
    // },[])

    return (
        <div className="results-block">
            {props.location.data ? 
                <div>
                    <h1>Hi, <b>{props.location.username}</b>, your results are:</h1>
                
                    <div className="test-title">
                        <h1>Total Score: <span className="score">{props.location.score}</span></h1>
                        <p>Detailed info below</p>
                    </div>
                    { props.location.data.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <h1>{item.question}</h1>
                                <p>Correct Answer: {item.correctAnswer}</p>
                                <p>Your answer: {props.location.userAnswers[item.questionId]}</p>
                            </React.Fragment>
                        )
                    })}
                </div>
                :
                <div>
                    <h1>No results to show</h1>
                    <Link to="/">Go Home</Link>
                </div> 
            } 
        </div>
    )
}

export default Results;