import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Navbar from './components/Navbar';
import "./styles/tablet.css"
import "./styles/mobile.css"
import SearchPage from './pages/SearchPage';
import Profile from './pages/Profile';
import SingleNote from './pages/SingleNote';
import EditNote from './pages/EditNote';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ImportantNotes from './pages/ImportantNotes';
import { Navigate } from 'react-router-dom';

function App() {

  let userLogin = localStorage.getItem("userLogin");

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path='/' element={userLogin ? <Home /> : <Navigate to="/login" />} />
          <Route path='/searchPage' element={userLogin ? <SearchPage /> : <Navigate to="/login" />} />
          <Route path='/profile' element={userLogin ? <Profile /> : <Navigate to="/login" />} />
          <Route path='/signUp' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/importantNotes' element={userLogin ? <ImportantNotes /> : <Navigate to="/login" />} />
          <Route path='/singleNote/:id' element={userLogin ? <SingleNote /> : <Navigate to="/login" />} />
          <Route path='/editNote/:id' element={userLogin ? <EditNote /> : <Navigate to="/login" />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
