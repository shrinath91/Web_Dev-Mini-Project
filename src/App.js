import logo from './logo.svg';
import './App.css';
import RegisterComp from './components/RegisterComp';
import LoginComp from './components/LoginComp';
import {Link, Routes, Route } from 'react-router-dom'
import HomeComp from './components/HomeComp';
import { useSelector } from 'react-redux';
import LogoutComp from './components/LogoutComp';

function App() {

   const mystate = useSelector(state=> state.logged)

  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
      <div style={{display: mystate.loggedIn?"none":"block"}}>
      <ul className="nav navbar">
            <li className="nav-item">
                <Link to="/register" className="nav-link">REGISTER</Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">LOGIN</Link>
            </li>
      </ul>
      </div>
      <Routes>
        <Route path="/register" element={<RegisterComp/>}  />
        <Route path="/login" element={<LoginComp />}  />
        <Route path="/home" element={ <HomeComp/> } >
            <Route path="logout" element={ <LogoutComp /> } />
         </Route>
        
      </Routes>

    </div>
  );
}

export default App;
