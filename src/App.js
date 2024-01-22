import "./css/queries/queries.css"
import "./css/style/general.css"
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Explore from "./Pages/Explore";
import Profile from "./Pages/Profile";
import AddPost from "./Pages/AddPost";
import Message from "./Pages/Message";
import NotFound from "./Pages/NotFound";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Post from "./Pages/Post";
import Chat from "./Pages/Chat";
import Page from "./Pages/Page";
import SavedPosts from "./Pages/SavedPosts";
import Setting from "./Pages/Setting";
import Generator from "./Pages/Generator";
import Story from "./Pages/Story";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        nomodule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/add' element={<AddPost />} />
          <Route path='/message' element={<Message />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/saved-posts' element={<SavedPosts />} />
          <Route path='/chat/:id' element={<Chat />} />
          <Route path='/user/:id' element={<Page />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/generator' element={<Generator />} />
          <Route path='/story/:id' element={<Story />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}
