import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../loggedSlice";

export default function LogoutComp() {
    const dispatch = useDispatch();
    const navigate=useNavigate('/login')
    dispatch(logout());
    const mystate = useSelector(state=>state.logged)
    navigate("/login")
    /*return (
        <div>
            <p> Logged out successfully </p>
            <p> Login status : {mystate.loggedIn.toString()}</p>
        </div>
    )*/
}