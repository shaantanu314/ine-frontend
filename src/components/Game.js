import { useEffect,useState } from 'react';
import '../css/Game.css';
import {Lottery,StockMarket,Finish} from './phases.js'
import Login from './login.js';
import {backendURL} from "../config"
import responseHolder from './responseHolder';
import axios from 'axios';

function Logout(){
  function logout(){
    window.localStorage.removeItem("INE-email");
    window.localStorage.removeItem("INE-token");

  }
  return(
    <button onClick={()=>{
      logout();
    }}>Logout</button>
  )
}


function Game() {

  const [phase,setPhase] = useState("");
  const [initialCapital,setInitialCapital] = useState(5000);
  const [responses,setResponses] = useState(new responseHolder());
  const [isSubmitted,setisSubmitted] = useState(false);

  useEffect(()=>{
    const submitURL = backendURL +"is-logged-in";
    const email = localStorage.getItem("INE-email");
    const token = localStorage.getItem("INE-token");
    if(email && token){
      axios.post(submitURL,{
          'email':email,
          'token':token
      })
      .then((res)=>{
          const user = res.data;
          console.log(user);
          if(user.completed)
          {
            setPhase("finish");
            setisSubmitted(true);
          }
          else{
            setPhase("lottery");
          }
      })
      .catch((err)=>{
          console.log(err);
          setPhase("login")
      })
    }
    else{
      setPhase("login");
    }
    
  },[])


  function handleLottery(prize){
    setInitialCapital(initialCapital+prize);
  }
  console.log('from main',responses.responses)
  function renderGamePhase(){
    switch (phase) {
      case "login":
        return (<Login setPhase={setPhase} setisSubmitted={setisSubmitted}/>)
      case "lottery":
        return (<Lottery setPhase={setPhase} handleLottery={handleLottery}/>)
      case "market":
        return (<StockMarket initialCapital={initialCapital} responses={responses} setResponses={setResponses} setPhase={setPhase}/>)
      case "finish":
        return (<Finish responses={responses} isSubmitted={isSubmitted}/>);
      default:
        return (<h3 style={{color:"white",textAlign:"center"}}>Loading...</h3>)
  }
}

  return (
    <div className="Game">
      {
        (phase!=="login")?(<Logout/>):(<></>)
      }
      {
        renderGamePhase()
      }
    </div>
  );
}

export default Game;
