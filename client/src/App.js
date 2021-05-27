import {useState, useEffect} from "react"
import {Route} from "react-router-dom"
import Nav from "./components/Nav/Nav.jsx"
import SignUp from "./components/Forms/SignUp.jsx"
import SignIn from "./components/Forms/SignIn.jsx"
import Profile from "./components/Profile.jsx"
import Question from "./components/List/Question.jsx"
import QuestionDetails from "./components/Details/QuestionDetails.jsx"
import {verifyUser, findUser} from "./services/user"
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [userData, setUserData] = useState(null)

  const logout = async () => {
    await localStorage.clear()
    setCurrentUser(null)
  }

  useEffect(() => {
    requestVerification()
  }, [])

  useEffect(() => {
    if(currentUser) {
      getData()
    }
  }, [currentUser])

  const requestVerification = async () => {
    const user = await verifyUser()
    setCurrentUser(user)
  }

  async function getData() {
      const res = await findUser({email: currentUser.email})
      setUserData(res._id)
  }

  return (
    <div className="App">
      <Nav logout={logout} userData={userData}/>
      <Route path="/sign-in">
        <SignIn setCurrentUser={setCurrentUser}/>
      </Route>
      <Route path="/sign-up">
        <SignUp setCurrentUser={setCurrentUser}/>
      </Route>
      <Route path="/profile/:id">
        <Profile/>
      </Route>
      <Route path="/explore">
        <Question userData={userData}/>
      </Route>
      <Route path="/question/:id">
        <QuestionDetails userData={userData}/>
      </Route>
    </div>
  );
}

export default App;
