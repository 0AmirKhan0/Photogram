import { userGenerator, postGenerator, storyGenerator, messageGenerator } from "./lib/faker"
import "./css/queries/queries.css"
import "./css/style/general.css"
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Explore from "./Pages/Explore";
import { useAuthState } from "./Context/auth-context";
import Profile from "./Pages/Profile";
import AddPost from "./Pages/AddPost";
import Message from "./Pages/Message";
import NotFound from "./Pages/NotFound";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Post from "./Pages/Post";
export default function App() {
  const handleClick = () => {
    const user = messageGenerator()
  }
  const { user } = useAuthState()
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
      {/* {(user)? <Message/> : <Login/>} */}
      {/* <Login /> */}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/add' element={<AddPost />} />
          <Route path='/message' element={<Message />} />
          <Route path='/post/:id' element={<Post />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}
