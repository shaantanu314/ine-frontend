import { useEffect,useState } from 'react';
import '../css/Game.css';
import {Lottery,StockMarket,Finish} from './phases.js'
import responseHolder from './responseHolder';


function Game() {

  const [phase,setPhase] = useState("market");
  const [initialCapital,setInitialCapital] = useState(5000);
  const [responses,setResponses] = useState(new responseHolder());
  

  function handleLottery(prize){
    setInitialCapital(initialCapital+prize);
  }
  console.log('from main',responses.responses)
  function renderGamePhase(){
    switch (phase) {
      case "lottery":
        return (<Lottery setPhase={setPhase} handleLottery={handleLottery}/>)
      case "market":
        return (<StockMarket initialCapital={initialCapital} responses={responses} setResponses={setResponses} setPhase={setPhase}/>)
      case "finish":
        return (<Finish responses={responses}/>);
      default:
        break;
  }
}

  return (
    <div className="Game">
      {
        renderGamePhase()
      }
    </div>
  );
}

export default Game;
