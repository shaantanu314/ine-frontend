import { useEffect,useState } from 'react';
import axios from 'axios';
import '../css/Lottery.css';
import Portfolio from './Portfolio';
import Market from './Market';
import Typewriter from "typewriter-effect";
import {backendURL} from "../config"


const Lottery = (props)=>{

    const introText = "Hey There! We want you to be a part of a survey. ";
    const [isLotteryDisplay,setLotteryDisplay] = useState(false);
  
    function displayLottery(){
      setLotteryDisplay(true);
    }
    return (
      <div style={{color:"white",fontSize:"22px"}}>
        <Typewriter
          onInit={(typewriter)=> {
  
          typewriter
          
          .typeString(introText)
            
          .pauseFor(1000)
          .deleteAll()
          .typeString("Please select one of the following lotteries to get started with")
          .start()
          .callFunction(displayLottery)
          }}
          />
  
        {
          (isLotteryDisplay)?(
            <div>
              <h4>Choose among the following options</h4>
              <div style={{display:"flex"}}>
                <div class="lottery-choice" >
                <h5>
                A sure shot prize money with gain of &#8377;600
                </h5>
                <button onClick={()=>{
                  props.handleLottery(600);
                  props.setPhase("market");
                }} class="lottery-button">Choose</button>
                </div>
                <div class="lottery-choice" >
                <h5>
                  30% chance of winning &#8377;2000 
                </h5>
                <h5>
                  70% chance of winning nothing
                </h5>
                <button onClick={()=>{
                  let lottery = Math.random();
                  if(lottery<=0.3){
                    props.handleLottery(2000);
                  }
                  props.setPhase("market");
  
                }} class="lottery-button">Choose</button>
                </div>
              </div>
            </div>
          ):(
            <></>
          )
        }
        
      </div>
    )
  }
  
const StockMarket = (props)=>{
    console.log(props.responseHolder.response)
    const initialCapital = props.initialCapital;
    const [cash,setCash] = useState(initialCapital);
    const [stock,setStockState] = useState({
      quantity:0,
      price:500,
    });
    useEffect(()=>{
      props.responseHolder.setNetWorth(initialCapital);
      props.responseHolder.setStockState(stock);
    },[]);
  
    const portfolio = {
      initialCapital:initialCapital,
      cash:cash,
      stock:stock
  };
  
  
    function buyStock(quantity){
      if(quantity*stock.price>cash){
        return {
          status:0,
          err : "Not Enough Money"
        }
      }
      else if(quantity<=0){
        return {
          status:0,
          err : "Enter Positive Value"
        }
      }
      else{
        setStockState({
          quantity:stock.quantity+parseInt(quantity),
          price:stock.price
        })
        setCash(cash-quantity*stock.price);
  
        props.responseHolder.setNetWorth(cash);
        props.responseHolder.setStockState(stock);
        props.responseHolder.addNewResponse({
          'type':'buy',
          'quantity':quantity
        })
  
  
        return {
          status:1,
          err:null
        };
  
      }
  
    }
  
    function sellStock(quantity){
      if(quantity>stock.quantity){
        return {
          status:0,
          err : "Selling more than available stocks"
        }
      }
      else if(quantity<=0){
        return {
          status:0,
          err : "Enter Positive Value"
        }
      }
      else{
        setStockState({
          quantity:stock.quantity-quantity,
          price:stock.price
        })
        setCash(cash+quantity*stock.price);
  
        props.responseHolder.setNetWorth(cash);
        props.responseHolder.setStockState(stock);
        props.responseHolder.addNewResponse({
          'type':'sell',
          'quantity':quantity
        })
        return {
          status:1,
          err:null
        };
      }
    }
  
    function holdStock(isHold){
      if(!isHold)
      {
        return {
          status:0,
          err : "Please check the checkbox"
          }
      }
      else
      {
        props.responseHolder.setNetWorth(cash);
        props.responseHolder.setStockState(stock);
        props.responseHolder.addNewResponse({
          'type':'buy',
          'quantity':null
        })
        return {
        status:1,
        err : null
        }
      }
    }
    return (
      <>
      <Portfolio portfolio={portfolio} />
       <Market cbBuy={buyStock} cbSell={sellStock} cbHold={holdStock} setStockState={setStockState} stock={stock} setPhase={props.setPhase}/>
      </>
    )
  }

const  Finish = (props)=>{
    const[isSubmmitted,setsubmitState] = useState(false); 
    function submitResponse(){
        const submitURL = backendURL+'submit-form'
        axios.post(submitURL,{
            'responses':props.responseHolder.responses
        })
        .then((res)=>{
            //
            console.log(res)
            setsubmitState(true);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    console.log(isSubmmitted)
    return(
        <>
        {
            (!isSubmmitted)?(
                <div style={{textAlign:"center"}}>
                    <h3 style={{color:"white"}}>Thanks a lot for being part of this survey! Please click on the Finish button to end the survey.</h3>
                <div onClick={submitResponse} style={{color:"white",padding:"20px",backgroundColor:"#70D592", border:"none",borderRadius:"10px", margin:"auto",width:"40px"}}>
                    Finish
                </div>
                </div>
            ):(
                <div style={{textAlign:"center"}}>
                <h3 style={{color:"white"}}>Thanks for partipating, your response has been added</h3>
                
                 </div>
            )
        }
       </>
    );
  }
  
export {
    Lottery,
    StockMarket,
    Finish
}