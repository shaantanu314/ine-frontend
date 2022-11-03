import { useEffect,useState } from 'react';
import {backendURL} from "../config"
import axios from 'axios';


function MailInput(props){

    return (
        <div style={{textAlign:"center", color:"white"}}>
            <h3>Please enter your Email Id.</h3>
            <input onChange={(e)=>{
                props.setEmail(e.target.value)
                }
            } style={{padding:"10px",textAlign:"center"}} value={props.email}></input>
            <br></br>
            <button style={{
                marginTop:"20px",
                padding:"20px",
                backgroundColor:"#70D592",
                border:"none",
                borderRadius:"10px",
                fontSize:"15px"}} onClick={()=>{props.getOTP(props.email)}}>
                    Get OTP
            </button>
        </div>
    )
}

function VerifyOTP(props){
    const [otp,setOTP] = useState("");
    return (
        <div style={{textAlign:"center",color:"white"}}> 
             <h3>Please enter the OTP that has been sent to {props.email}</h3>
            <input onChange={(e)=>{
                setOTP(e.target.value)
                }
            } style={{padding:"10px",textAlign:"center"}} value={props.otp}></input>
            <br></br>
            <button style={{
                marginTop:"20px",
                padding:"20px",
                backgroundColor:"#70D592",
                border:"none",
                borderRadius:"10px",
                fontSize:"15px"}} onClick={()=>{props.verifyOTP(otp)}}>
                    Verify
            </button>
        </div>
    )
}

function Login(props){

    const [verifyMode,setVerifyMode] = useState(false);
    const [email,setEmail] = useState("");


    function getOTP(email){
        const submitURL = backendURL+'send-otp'
        axios.post(submitURL,{
            'email':email
        })
        .then((res)=>{
            console.log('OTP',res.data);
            setVerifyMode(true);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    function verifyOTP(otp){
        const submitURL = backendURL+'verify-otp'
        axios.post(submitURL,{
            'email':email,
            'otp':otp
        })
        .then((res)=>{
            localStorage.setItem('INE-email', email);
            localStorage.setItem('INE-token',res.data.token);
            if(res.data.user.completed){
                props.setisSubmitted(true);
                props.setPhase("finish")
            }
            else{
                props.setPhase("lottery")
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <>
        {
            (verifyMode)?(
                <VerifyOTP email={email} verifyOTP={verifyOTP}/>
            ):(
                <MailInput getOTP={getOTP} setEmail={setEmail} email={email}/>
            )
        }
        </>
    )
}

export default Login;