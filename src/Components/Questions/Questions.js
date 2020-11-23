import React, { useState, useEffect } from "react"

import "./Questions.css"
import { GET_QUESTIONS, SAVE_FORM_DATA } from "../../constants"


const Questions = (props) => {

    // const [username, setUsername] = useState("")
    const [data, setData] = useState([])
    // const [questions, setQuestions] = useState([])
    const [actualAnswers, setActualAnswers] = useState([])
    const [userAnswers, setUserAnswers] = useState({})
    const [finalScore, setFinalScore] = useState(0)
    const [testFinished, setTestFinished] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if(props.propsData.location.username){
            fetch(GET_QUESTIONS)
            .then(data => data.json())
            .then(json => {
                setData([...json])
                json.forEach(item => {
                    return (
                        setActualAnswers(prevValue => {
                            return {
                                ...prevValue,
                                [item.questionId] : {
                                    correctAnswer : item.correctAnswer, 
                                    marks: item.marks
                                }
                            }
                        })
                    )
                })
            })
        } else {
            setError(true)
        }
        
    },[props])


    const handleRadioChange = e => {
        let value = e.target.value
        let id = e.target.id

        //SEND THE RESPONSE BACK TO THE SERVER ONCE THE TEST IS SUBMITTED
        setUserAnswers(prevValue => {
            return {
                ...prevValue,
                [id] : value
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        let score = 0
        //Comparing the actual answers with user answers and display the score
        for(let i in actualAnswers) {
            console.log(actualAnswers[i].correctAnswer, userAnswers[i], actualAnswers[i].marks)
            if(actualAnswers[i].correctAnswer === userAnswers[i]) {
                score += actualAnswers[i].marks
            } else {
                score -= actualAnswers[i].marks/4
            }
            
        }
        setFinalScore(score)
        setTestFinished(true)

        //Calling the POST API
            fetch(SAVE_FORM_DATA, {
                method: 'POST',
                body: JSON.stringify({
                    username : props.propsData.location.username,
                    score,
                    userAnswers,
                    data
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(data => data.json())
            .then(json => console.log(json))
    
    
            props.propsData.history.push({
                pathname : "/result",
                username : props.propsData.location.username,
                score,
                userAnswers,
                data
            })
        
    }

    return (
        <div className="questions-block">
            
            {!error ? 
                <form className="questions-grid" onSubmit={handleSubmit}>
                { data && data.map((item,index) => {
                    return (
                        <div key={index} className='question'>
                            <h1>{index+1}: {item.question}</h1>
                            { item.options.map((i, ind) => {
                                return (
                                    <div key={ind}>
                                        <input type='radio' value={i} onChange={handleRadioChange} id={item.questionId} name={item.questionId} required={true}/>
                                        <span>{i}</span>
                                    </div>
                                )
                            }) }
                        </div>
                    )
                }) }
                { !testFinished && <button type="submit" className="submitButton">Submit</button>}
            </form>
            :
            <h1>Cant take the test without username, go back to login page</h1>}
        </div>
    )
}

export default Questions;