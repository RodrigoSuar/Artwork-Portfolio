import Gallery from "./pages/Gallery"
import Home from "./pages/Home"
import "./App.css"
import Nav from "./components/Nav"
import { Outlet } from "react-router-dom"
import ErrorBoundary from "./components/ErrorBoundary"

function App() {

  return (
   <ErrorBoundary>
    <>
      <Nav/>
      <main>
        <Outlet/>
      </main>
    </>
   </ErrorBoundary>
  )
}

export default App