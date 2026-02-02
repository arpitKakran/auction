import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Auction from "./pages/Auction"
import Admin from "./pages/Admin"
import Footer from "./components/Footer"
import Login from "./pages/Login"

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/auction" element={<Auction/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
