import { useEffect,useState } from 'react';
import {Transaction,InfoBox,Finish} from './marketComponents'
import '../css/Market.css';



function Market(props) {
  const [state, setState] = useState(null);
  const [GameStatus,setGameStatus] = useState(true);
  const [data , setData] = useState(null);
  const stock = props.stock;
 
  useEffect(()=>{
    let url = "/situation.json";
    fetch(url)
    .then(res=>{
      res = res.json();
      return res;
    })
    .then(res=>{
      setData(res);
      setState(0);
    })
  },[]);

  useEffect(()=>{
    if(state!==null){
      props.setStockState({
        quantity:props.stock.quantity,
        price:data[state].nextPrice,
      });
    }
  },[state])

  function nextState(){
    if(state+1===data.length) {
      setGameStatus(false);
      return;
    } 
    setState(state+1)
  }

  return (
    <div class="Market">
      {
        (GameStatus)?(<>
        <InfoBox class="info-box" state={state} data={data}  stock={stock}/>
        <Transaction class="transaction" cb={props} nextState={nextState} state={state}/>
        </>
        ):(
          <Finish/>
        )
      } 
    </div>
  );
}

export default Market;
