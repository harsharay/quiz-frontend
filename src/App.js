import Questions from "./Components/Questions/Questions"
import { Link } from "react-router-dom"
import './App.css';


function App(props) {
  return (
    <div className="App">
      <h1>Welcome to the Quiz</h1>
      <Link to='/userData'>See your previous results(if any)</Link>
      <Questions propsData={props}/>
    </div>
  );
}

export default App;
