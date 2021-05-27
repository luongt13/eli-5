import {useState, useEffect} from "react"
import {Route} from "react-router-dom"
import Nav from "./components/Nav/Nav.jsx"
import SignUp from "./components/Forms/SignUp.jsx"
import SignIn from "./components/Forms/SignIn.jsx"
import Profile from "./components/Profile.jsx"
import Posts from "./components/PostList/Posts.jsx"
import {verifyUser} from "./services/user"
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const logout = async () => {
    await localStorage.clear()
    setCurrentUser(null)
  }

  useEffect(() => {
    requestVerification()
    return () => {}
  }, [])

  const requestVerification = async () => {
    const user = await verifyUser()
    setCurrentUser(user)
  }
  return (
    <div className="App">
      <Nav logout={logout}/>
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
        <Posts/>
      </Route>
    </div>
  );
}

export default App;
