import Gallery from "./pages/Gallery"
import Home from "./pages/Home"
import "./App.css"
import Nav from "./components/Nav"
import { Outlet } from "react-router-dom"
function App() {

  return (
   <>
    <Nav/>
    <main>
      <Outlet/>
    </main>
   </>
  )
}

export default App