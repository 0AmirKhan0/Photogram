import { userGenerator, postGenerator, storyGenerator } from "./lib/faker"
import "./css/queries/queries.css"
import "./css/style/general.css"
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Explore from "./Pages/Explore";
import { useAuthState } from "./Context/auth-context";
import Profile from "./Pages/Profile";
export default function App() {
  const handleClick = () => {
    const user = postGenerator()
    console.log(user);
  }
  const {user} = useAuthState()
  return (
    <>
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        nomodule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>


      {/* <button onClick={handleClick}>click</button> */}
      
      {/* <Home /> */}
      {/* <Explore/> */}
      {(user)? <Profile/> : <Login/>}
      {/* <Login /> */}
    </>
  )
}
