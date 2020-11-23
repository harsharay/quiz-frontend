import React, { useEffect } from "react"


const Results = (props) => {

    useEffect(() => {
        console.log(props.location)
    },[])

    return (
        <div>
            <h1>Hi, <b>{props.location.username}</b>, your results are:</h1>
            { props.location.score>0 
                && 
            <>
                <h1>Total Score: {props.location.score}</h1>
                <p>Detailed info below</p>
                { props.location.data.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <h1>{item.question}</h1>
                    <p>Correct Answer: {item.correctAnswer}</p>
                    <p>Your answer: {props.location.userAnswers[item.questionId]}</p>
                        </React.Fragment>
                    )
                }) }
            </>  
            }
        </div>
    )
}

export default Results;