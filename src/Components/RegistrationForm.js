import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from '../loggedSlice';
import background from '../Components/Event.avif'
import './Style.css'

export default function RegistrationForm() {

    const init = {
        user_name: {value:"",valid: false, touched: false, error:""},
        password: {value:"",valid: false, touched: false, error:""},
        contact: {value:0,valid: false, touched: false, error:""},
        email: {value:"",valid: false, touched: false, error:""},
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

    const[user,dispatch] = useReducer(reducer,init);
    const[msg,setMsg] = useState("xx");
    const[flag,setFlag]=useState(false);
    const[flag1,setFlag1]=useState(false);
    const[insertMsg, setInsertMsg] = useState("")

    let navigate = useNavigate();

    useEffect(()=>{
        setMsg(localStorage.getItem("msg"))
    },[]);



    var submitData=(e)=>{
        e.preventDefault();
        const reqOptions={
            method:"POST",
            headers:{'content-type':'application/json'},
            body: JSON.stringify({
            user_name:user.user_name.value,
            password:user.password.value,
            contact:user.contact.value,
            email: user.email.value,
        })
    }
    fetch("http://localhost:9000/register", reqOptions)
    .then(resp => resp.text())
    .then(data => {
        if (data==='true') {
            // Redirect or perform other actions for successful login
            alert('Registration Successful');
              navigate("/login")
          } 
          else {
            // Handle unsuccessful login
            alert('User already exists');
          }
        })
    }
    

    const validateData = (key,val) => {
        let valid = true;
        let error = ""
        switch(key)
        {
            case 'user_name':
               var pattern = /^[A-Z]{1}[a-z]+ [A-Z]{1}[a-z]{3,}$/ 
               if(!pattern.test(val))
               {
                  valid = false;
                  error = "Username shoud of form 'Firstname Lastname'"
               }

               break;
            case 'password': 
                var pattern = /^[A-Za-z0-9@_]{8,15}$/ 
                if(!pattern.test(val))
                {
                    valid = false;
                    error = "Password should be between 8-15 characters"
                }
                break;
            case 'contact':
                var pattern = /^[0-9]{9}$/ 
               if(!pattern.test(val))
               {
                  valid = false;
                  error = "Contact no should be 10 digits only"
               }

               break;
            case 'email':
                var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
               if(!pattern.test(val))
               {
                  valid = false;
                  error = "Invalid email"
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
        dispatch({type: "update",data:{key,value,touched:true,valid,error,formValid}})
    }


    return (
        <div className="container d-flex justify-content-center " >
            {/* backgroundImage: `url(${background})` */}
            
        <div className="shadow-lg p-4 m-5 background" style={{"width": '50rem'}}>

            <h1 className="d-flex justify-content-center text-success mb-3">Registration Form !</h1>
            
            <form >
               <span> Username : </span><input type="text" name="user_name" 
                value={user.user_name.value}
                onChange={(e)=>{handleChange("user_name",e.target.value)}} 
                onBlur={(e)=>{handleChange("user_name",e.target.value)}} className="form-control" required placeholder="Enter username"/>
                <br/>
                <div style={{ display: user.user_name.touched && !user.user_name.valid  ?"block":"none", color:"red"}}>
                    { user.user_name.error}
                </div>


                <span> Password : </span> <input type="password" name="password" 
                value={user.password.value}
                onChange={(e)=>{handleChange("password",e.target.value)}} 
                onBlur={(e)=>{handleChange("password",e.target.value)}} className="form-control" placeholder="Enter Password" required/>
                <br/>
                <div style={{ display: user.password.touched && !user.password.valid  ?"block":"none",color:"red"}}>
                    { user.password.error}
                </div>

                <span> Contact : </span> <input type="contact" name="contact" 
                value={user.contact.value}
                onChange={(e)=>{handleChange("contact",e.target.value)}} 
                onBlur={(e)=>{handleChange("contact",e.target.value)}} className="form-control" placeholder="Enter Mobile no" required/>
                <br/>
                <div style={{ display: user.contact.touched && !user.contact.valid  ?"block":"none",color:"red"}}>
                    { user.contact.error}
                </div>

                <span> Email :</span>  <input type="email" name="email" 
                value={user.email.value}
                onChange={(e)=>{handleChange("email",e.target.value)}} 
                onBlur={(e)=>{handleChange("email",e.target.value)}}className="form-control" placeholder="Enter email"required/>
                <br/>
                <div style={{ display: user.email.touched && !user.email.valid  ?"block":"none",color:"red"}}>
                    { user.email.error}
                </div>

                <input type="submit" value="Insert"
                disabled={!user.formValid} 
                onClick={(e)=>{submitData(e)}}className="form-control"style={{opacity:"0.8"}}/>
                <br/>
                <input type="reset" value="Clear" 
                onClick={()=>{dispatch({type:"reset"})}}className="form-control btn btn-primary" style={{opacity:"0.8"}}/>
            </form>
            </div>
        </div>
    )




}