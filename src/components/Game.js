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
    <button style={{backgroundColor:"white",color:"black",padding:"15px",borderRadius:"10px"}} onClick={()=>{
      logout();
      window.location.reload();
    }}>Logout</button>
  )
}

function UserDetails(props){
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const responses = props.responses;
    console.log(responses)
    responses.setUserDetails(inputs);
    props.setResponses(responses);
    props.setPhase("lottery");
    console.log(inputs);
  }

  return (
  
    <form class="details-form" style={{color:"white",marginTop:"20px"}} onSubmit={handleSubmit}>
    
      <label>Age </label>
      <br></br>
        <input 
          type="number" 
          name="age" 
          min = "0"
          max = "100"
          value={inputs.age || ""} 
          required
          onChange={handleChange}
        />
        <br></br>
        <label>Gender </label>
        <br></br>
        <select  
        name="gender"
        onChange={handleChange} value={inputs.gender} required>
          <option disabled selected value>---select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="Other">Other</option>
        </select>
      <br></br>
      <label>Education </label>
        <br></br>
        <select  
        name="education"
        onChange={handleChange} value={inputs.education} required>
          <option disabled selected value>---select</option>
          <option value="Engineering">Engineering</option>
          <option value="Commerce">Commerce</option>
          <option value="Law">Law</option>
          <option value="Management">Management</option>
          <option value="Arts">Arts</option>
          <option value="Others">Others</option>

        </select>
      <br></br>
        <input style={{backgroundColor:"#70D592",borderRadius:"10px",border:"none"}} type="submit" />

    </form>
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
            setPhase("details");
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
      case "details":
        return (<UserDetails setPhase={setPhase} setResponses={setResponses} responses={responses}/>)
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
