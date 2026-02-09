import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Auction from "./pages/Auction"
import Admin from "./pages/Admin"
import Footer from "./components/Footer"
import Login from "./components/Login"
import { AppContext } from "./context/AppContext"
import { useContext } from "react"
import { ToastContainer } from "react-toastify"
function App() {

  const {showLogin} = useContext(AppContext);

  return (
    <>
     <div className="bg-gradient-to-b from-white to-orange-50/90 min-h-screen">
      {/* ✅ Toast Container — customize here */}
      <ToastContainer
        position="top-right"
        autoClose={1077} // ⏳ Duration (in ms)
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"

        // ✅ Tailwind-based styling
        toastClassName={() =>
          "relative flex items-center p-4 rounded-xl bg-white shadow-md text-gray-600 text-xs sm:text-base mb-4 "
        }
        bodyClassName={() => "text-xs sm:text-base"} // font size & family
        progressClassName="bg-orange-400" // progress bar color
      />
          <Navbar/>
    {showLogin && <Login/>}
      <Routes>
          <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/auction" element={<Auction/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
      <Footer/>

    </div>
    </>
  )
}

export default App
