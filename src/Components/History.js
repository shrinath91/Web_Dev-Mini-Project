import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
export default function History() {

    const[emps, setEmps] = useState([]);

    useEffect(()=> {
        fetch("http://localhost:9000/history")
        .then( resp => resp.json() )
        .then( data => setEmps(data));
    },[]);

    const mystate = useSelector(state=>state.logged)
    return (
        <div>
            <h1>Welcome User</h1>
            
            <ul className="nav navbar">
                <li className="nav-item">
                    <Link to="history" className="nav-link">Order history</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">LOGOUT</Link>
                </li>
            </ul>
            
            <div>
        <div>
        <h1> Bookings </h1>
            <table className='table table-dark table-striped'>
            <thead>
            <tr>
                    <th>Booking id</th>
                    <th>Booking Date</th>
                    <th>Event Date</th>
                    <th>Event Venue</th>
                    <th>Total Amount</th>
            </tr>
            </thead>
            <tbody>
                {
                   emps.map((v)=>{
                        return (
                            <tr>
                                <td>{v.Booking_id}</td>
                                <td>{v.Booking_date}</td>
                                <td>{v.event_date}</td>
                                <td>{v.Venue}</td>
                                <td>{v.Total_amount}</td> 
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