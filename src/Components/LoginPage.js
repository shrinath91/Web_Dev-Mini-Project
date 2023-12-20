import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { login } from "../loggedSlice";
import { useEffect, useReducer, useState } from "react";

export default function LoginPage() 
{
    const init = {
        user_name: {value:"",valid: false, touched: false, error:""},
        password: {value:"",valid: false, touched: false, error:""},
        formValid: false
    }

    const reducer = (state,action) => {
        switch(action.type)
        {
            case 'update':
                //object destructuring
                const {key,value,touched,valid,error,formValid} = action.data;
                return {...state,[key]:{value,touched,valid,error},formValid}
            case 'reset':
                return init;        
        }
    }

    const[user,dispatch1] = useReducer(reducer,init);
    const[msg,setMsg] = useState("xx");
    const[flag,setFlag]=useState(false);
    const[flag1,setFlag1]=useState(false);
    const[insertMsg, setInsertMsg] = useState("")

    const dispatch = useDispatch()
    const mystate = useSelector((state) => state.logged)
    let navigate = useNavigate();

    useEffect(()=>{
        setMsg(localStorage.getItem("msg"))
    },[]);


    const handleClick = (e) => {
        e.preventDefault();
        const reqOptions={
            method:"POST",
            headers:{'content-type':'application/json'},
            body: JSON.stringify({
            user_name:user.user_name.value,
            password:user.password.value,
        })
    }
        fetch("http://localhost:9000/login", reqOptions)
    .then(resp => resp.text())
    .then(data => setInsertMsg(data) )   
        dispatch(login());
        navigate('/home');
    }


    const validateData = (key,val) => {
        let valid = true;
        let error = ""
        switch(key)
        {
            case 'user_name':
               var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
               if(!pattern.test(val))
               {
                  valid = false;
                  error = "username shoud of form 'Arya Bhangale'"
               }

               break;
            case 'password': 
                var pattern = /^[A-Za-z0-9@_]{8,15}$/ 
                if(!pattern.test(val))
                {
                    valid = false;
                    error = "password should be greater than 8 characters"
                }
                break;
        }
        return { valid: valid, error: error}
    }

    
    const handleChange = (key,value) => {
        //1. call validateData function
        const {valid, error} = validateData(key,value);

        //2. check the validity status of the form
        let formValid = true;
        for(let k in user)
        {
            //console.log(user[k].valid)
            if(user[k].valid === false)
            {
                formValid = false;
                break;
            }
        }
        console.log(formValid);

        //3. call to dispatch - updating the state
        dispatch1({type: "update",data:{key,value,touched:true,valid,error,formValid}})
    }

    return (
        <div>
            <form>
                Enter email :
                <input type="email" name="uid" 
                    value={user.user_name.value}
                    onChange={(e)=>{handleChange("user_name",e.target.value)}} 
                    onBlur={(e)=>{handleChange("user_name",e.target.value)}} />
                <br/>
                <div style={{ display: user.user_name.touched && !user.user_name.valid  ?"block":"none"}}>
                    { user.user_name.error}
                </div>
                Enter pwd :
                <input type="password" name="pwd" 
                value={user.password.value}
                onChange={(e)=>{handleChange("password",e.target.value)}} 
                onBlur={(e)=>{handleChange("password",e.target.value)}} />
                <br/>
                <div style={{ display: user.password.touched && !user.password.valid  ?"block":"none"}}>
                    { user.password.error}
                </div>
                
                <input type="button" value="Login"
                onClick={handleClick}/>
            </form>
            <p> {JSON.stringify(user)} </p>
            <p> Logged in : {mystate.loggedIn.toString()} </p>
        </div>
    )
}