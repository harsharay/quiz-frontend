import React,{ useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { GET_USER_DATA } from "../../constants"

import "./Welcome.css"

const Welcome = () => {

    const [username, setUsername] = useState("")
    const [data, setData] = useState([])
    const [dataReceived, setDataReceived] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleUsernameChange = e => {
        let value = e.target.value

        setUsername(value)
    }

    const handleUsernameSubmit = () => {
        setLoading(true)
        let userDataValidationApiCall = GET_USER_DATA.replace('_USERNAME_', username.toLowerCase())

        fetch(userDataValidationApiCall)
        .then(data => data.json())
        .then(json => {
            setData(json)
            setDataReceived(true)
            setLoading(false)
        })
    }



    return (
        <div className="welcome-block">
            <h1>Welcome to the login page</h1>
            <div className="welcome-login-block">
                <p>Enter your username</p>
                <input type="text" placeholder="type here..." onChange={handleUsernameChange} value={username}/>
                <button onClick={handleUsernameSubmit}>Submit</button>
            </div>
            {loading && <h4>Loading...</h4>}
            {dataReceived && 
                <div>
                    {(data.length === 0) ? 
                       <div>
                           <h3>This is the first time you are taking this test</h3>
                           <Link to={{
                                 pathname : '/questions',
                                 username
                            }}>Go to questions page</Link>
                       </div>
                        :
                        <div>
                            <h3>You have previously taken tests</h3>
                            <Link to={{
                                 pathname : '/questions',
                                 username
                            }}>Go to questions page</Link>
                        </div> 
                    }
                </div>
            }
        </div>
    )
}

export default Welcome;