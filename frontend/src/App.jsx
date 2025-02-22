import { Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Createpage from "./pages/Createpage"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
 
  return (
   
   <div>
   <Navbar/>
   <ToastContainer/>
   <Routes>
   <Route path='/' element={ <Home/> } />
   <Route path='/create' element={ <Createpage/> } />
   </Routes>
   </div>
   
   
    
    
  
  )
}

export default App
