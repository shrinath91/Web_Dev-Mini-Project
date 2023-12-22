import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { login } from "../loggedSlice";
import { useEffect, useReducer, useState } from "react";

export default function UpdatePassword() 
{
    const init = {
        user_name:{value:"",valid: false, touched: false, error:""},
        old_password: {value:"",valid: false, touched: false, error:""},
        new_password: {value:"",valid: false, touched: false, error:""},
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
            old_password:user.old_password.value,
            new_password:user.new_password.value,
            user_name:user.user_name.value,
        })
    }
        fetch("http://localhost:9000/updatepassword", reqOptions)
    .then(resp => resp.text())
    .then(data => {
        if (data==='true') {
            // Redirect or perform other actions for successful login
            alert('Password Updated');
              navigate("/login")
          } 
          else {
            // Handle unsuccessful login
            alert('Invalid email or password');
          }
        })

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
            case 'old_password':
               var pattern = /^[A-Za-z0-9@_]{8,15}$/ 
               if(!pattern.test(val))
               {
                  valid = false;
                  error = "Password should have 8-15 charaters"
               }

               break;
            case 'new_password': 
                var pattern = /^[A-Za-z0-9@_]{8,15}$/ 
                if(!pattern.test(val))
                {
                    valid = false;
                    error = "Password should have 8-15 charaters"
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
            <div className="container d-flex justify-content-center " >
            
        <div className="shadow-lg p-4 m-5" style={{"width": '50rem'}}>
       
            <h1 className="d-flex justify-content-center text-success mb-3">Update Password !</h1>
            <form>
            Enter email :
                <input type="email" name="uid" 
                    value={user.user_name.value}
                    onChange={(e)=>{handleChange("user_name",e.target.value)}} 
                    onBlur={(e)=>{handleChange("user_name",e.target.value)}}className="form-control" placeholder="Enter email" required />
                <br/>
                <div style={{ display: user.user_name.touched && !user.user_name.valid  ?"block":"none",color:"red"}}>
                    { user.user_name.error}
                </div>
                
                Enter Old Password :
                <input type="password" name="opwd" 
                    value={user.old_password.value}
                    onChange={(e)=>{handleChange("old_password",e.target.value)}} 
                    onBlur={(e)=>{handleChange("old_password",e.target.value)}} className="form-control" placeholder="Enter old pasword"required/>
                <br/>
                <div style={{ display: user.old_password.touched && !user.old_password.valid  ?"block":"none",color:"red"}}>
                    { user.old_password.error}
                </div>
                
                Enter New Password :
                <input type="password" name="npwd" 
                value={user.new_password.value}
                onChange={(e)=>{handleChange("new_password",e.target.value)}} 
                onBlur={(e)=>{handleChange("new_password",e.target.value)}}className="form-control" placeholder="Enter new password"required />
                <br/>
                <div style={{ display: user.new_password.touched && !user.new_password.valid  ?"block":"none",color:"red"}}>
                    { user.new_password.error}
                </div>
                
                <input type="button" value="Update password"
                 disabled={!user.formValid}
                onClick={handleClick}/>
                <div style={{ display: insertMsg  ?"block":"none"}} className="form-control btn btn-primary">
                    Incorrect Username and/or Password!
                </div>
            </form>
            </div>
        </div>
    )
}