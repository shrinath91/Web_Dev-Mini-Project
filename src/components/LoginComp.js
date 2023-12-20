import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { login } from "../loggedSlice";

export default function LoginComp() {
    const dispatch = useDispatch()
    const mystate = useSelector((state) => state.logged)
    let navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(login());
        navigate('/home')
    }
    return (
        <div>
            <form>
                Enter uid :
                <input type="text" name="uid" />
                <br/>
                Enter pwd :
                <input type="password" name="pwd" />
                <br/>
                <input type="button" value="Login"
                onClick={handleClick}/>
            </form>
            <p> Logged in : {mystate.loggedIn.toString()} </p>
        </div>
    )
}