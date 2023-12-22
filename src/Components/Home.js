import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
export default function Home() {

    const[emps, setEmps] = useState([]);

    useEffect(()=> {
        fetch("http://localhost:9000/home")
        .then( resp => resp.json() )
        .then( data => setEmps(data));
    },[]);

    const mystate = useSelector(state=>state.logged)
    return (
        <div>
            <h1>Welcome User</h1>
            
            <ul className="nav navbar">
                <li className="nav-item">
                    <Link to="/history" className="nav-link">Order history</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">LOGOUT</Link>
                </li>
            </ul>
            
            <div>
        <div>
            <h1> Services </h1>
            <table className='table table-dark table-striped'>
            <thead>
            <tr>
                    <th>Service Name</th>
                    <th>Price</th>
            </tr>
            </thead>
            <tbody>
                {
                   emps.map((v)=>{
                        return (
                            <tr>
                                <td>{v.service_name}</td>
                                <td>{v.service_price}</td>
                            </tr>
                        )
                   }) 
                }
            </tbody>
            </table>
        </div>
            </div>
        {/* <p> Login status: {mystate.loggedIn.toString()}</p> */}

        <Outlet />
        </div>
    )

}