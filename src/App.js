import { userGenerator, postGenerator, storyGenerator } from "./lib/faker"
import "./css/queries/queries.css"
import "./css/style/general.css"
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
export default function App() {
  const handleClick = () => {
    const user = postGenerator()
    console.log(user);
  }
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
      <Explore/>
    </>
  )
}
