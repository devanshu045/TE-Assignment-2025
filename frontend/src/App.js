import './App.css';
import CreateProject from './Components/CreateProject';
import Dashboard from './Components/Dashboard';
import UpdateProject from './Components/UpdateProject';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
         <Route path="/" element={<Dashboard/>}/>
         <Route path="/update/:id" element={<UpdateProject/>}/>
         <Route path="/create" element={<CreateProject/>}/>
      </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
