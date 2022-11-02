import { useEffect,useState } from 'react';
import '../css/Game.css';
import {Lottery,StockMarket,Finish} from './phases.js'
import responseHolder from './responseHolder';


function Game() {

  const [phase,setPhase] = useState("finish");
  const [initialCapital,setInitialCapital] = useState(5000);
  const responses = new responseHolder();
  

  function handleLottery(prize){
    setInitialCapital(initialCapital+prize);
  }

  function renderGamePhase(){
    switch (phase) {
      case "lottery":
        return (<Lottery setPhase={setPhase} handleLottery={handleLottery}/>)
      case "market":
        return (<StockMarket initialCapital={initialCapital} responseHolder={responses} setPhase={setPhase}/>)
      case "finish":
        return (<Finish responseHolder={responses}/>);
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
