import React,{ useState, useEffect } from "react"
import { GET_USER_DATA } from "../../constants"
import "./UserData.css"

const UserData = () => {

    const [username, setUsername] = useState("")
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)
    const [dataReceived, setDataReceived] = useState(false)


    const handleUsernameChange = e => {
        let name = e.target.value
        setUsername(name)
    }

    const handleSubmitClick = () => {
        setDataReceived(true)
        setLoading(true)
        let getUserDataApiCall = GET_USER_DATA.replace('_USERNAME_', username)
        
        fetch(getUserDataApiCall)
        .then(data => data.json())
        .then(json => {
            setUserData(json)
            setLoading(false)
        })
    }

    return (
        <div>
            <h1>UserData</h1>
            <p>Search your user name to see tour previous results(if any)</p>
            <input type="text" placeholder="type here" value={username} onChange={handleUsernameChange}/>
            <button onClick={handleSubmitClick}>Submit</button>
            {loading && <h1>Loading...</h1>}
            { dataReceived && 
            <div>
                {(userData.length>0) ? 
                <div>
                    { userData.map((item, index) => {
                        return (
                        <React.Fragment key={index}>
                            <hr/>
                            <h3>Test {index+1}</h3>
                            { item.data.map((i, ind) => {
                                return (
                                <React.Fragment key={ind}>
                                    <h2>{i.question}</h2>
                                    <p>Your answer: {i.correctAnswer}</p>
                                    <p>Actual answer: {item.userAnswers[i.questionId]}</p>
                                </React.Fragment>
                                )
                            }) }
                            <hr/>
                        </React.Fragment>
                        )
                    }) }
                </div>
                :
                <div>
                    <h1>Looks like you haven't taken any test</h1>
                </div> }
            </div> }
        </div>
    )
}

export default UserData;