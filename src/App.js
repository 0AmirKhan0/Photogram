import { userGenerator, postGenerator, storyGenerator } from "./lib/faker"
export default function App() {
  const handleClick = () => {
    const user = storyGenerator()
    console.log(user);
  }
  return (
    <button onClick={handleClick}>click</button>    
  )
}
