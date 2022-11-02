import { useEffect,useState } from 'react';
import Typewriter from "typewriter-effect";
import '../css/Game.css';
import '../css/Lottery.css';
import Portfolio from './Portfolio';
import Market from './Market';
import responseHolder from './responseHolder';

function Lottery(props){

  const introText = "Hey There! We want you to be a part of a survey. ";
  const [isLotteryDisplay,setLotteryDisplay] = useState(false);

  function displayLottery(){
    setLotteryDisplay(true);
  }
  return (
    <div style={{color:"white",fontSize:"30px"}}>
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

function StockMarket(props){
  console.log(props.responses.response)
  const initialCapital = props.initialCapital;
  const [cash,setCash] = useState(initialCapital);
  const [stock,setStockState] = useState({
    quantity:0,
    price:500,
  });
  useEffect(()=>{
    props.responses.setNetWorth(initialCapital);
    props.responses.setStockState(stock);
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

      props.responses.setNetWorth(cash);
      props.responses.setStockState(stock);
      props.responses.addNewResponse({
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

      props.responses.setNetWorth(cash);
      props.responses.setStockState(stock);
      props.responses.addNewResponse({
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
      props.responses.setNetWorth(cash);
      props.responses.setStockState(stock);
      props.responses.addNewResponse({
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
     <Market cbBuy={buyStock} cbSell={sellStock} cbHold={holdStock} setStockState={setStockState} stock={stock}/>
    </>
  )
}

function Game() {

  const [phase,setPhase] = useState("lottery");
  const [initialCapital,setInitialCapital] = useState(5000);
  const responses = new responseHolder();
  

  function handleLottery(prize){
    setInitialCapital(initialCapital+prize);
  }

  return (
    <div className="Game">
      {
        (phase==="market")?(
          <StockMarket initialCapital={initialCapital} responses={responses}/>
        ):(
          <Lottery setPhase={setPhase} handleLottery={handleLottery}/>
        )
      }
    </div>
  );
}

export default Game;
