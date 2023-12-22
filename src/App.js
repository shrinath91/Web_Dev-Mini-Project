import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './Components/Home';
import RegistrationForm from './Components/RegistrationForm';
import Logout from './Components/LogoutPage';
import { ErrorBoundary } from 'react-error-boundary';
import LoginPage from './Components/LoginPage';
import UpdatePassword from './Components/UpdatePassword';
import History from './Components/History';

function App() {
  const mystate = useSelector(state=> state.logged)
  
  return (
    <div className="App">
    <div style={{display: mystate.loggedIn?"none":"block"}}>
      <ul className="nav navbar">
            <li className="nav-item">
                <Link to="/register" className="nav-link">REGISTER</Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">LOGIN</Link>
            </li>
            <li className="nav-item">
                <Link to="/updatepassword" className="nav-link">UPDATE PASSWORD</Link>
            </li>
      </ul>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />}  />
        <Route path="/home" element={<Home/>} />
        <Route path="/history" element={<History/>}></Route>
        <Route path='/updatepassword' element={<UpdatePassword/>}></Route>
        <Route path="/register" element={<ErrorBoundary fallback={()=>{
          return(
            <h1>Oops, Something Went Wrong</h1>
          )
        }}><RegistrationForm/></ErrorBoundary>}></Route>
        <Route path="/logout" element={ <LoginPage /> } />
        
      </Routes>
    </div>
  );
}
export default App;
