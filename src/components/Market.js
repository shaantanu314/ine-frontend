import { useEffect,useState } from 'react';
import '../css/Market.css';

function DecisionButton(props){
 
  const [quantity,setQuantity] = useState(null);

  function handleQuantityChange(event){
    props.setTransactionChoice(props.text);
    setQuantity(event.target.value);
    if(event.target.value==="")
    {
      props.setTransactionChoice("none");
    }
  }

  function handleCB(){
    
    const res = props.cb(quantity);
    props.setError(res.err);
    if(res.status===1)
    {
      props.nextState();
    }
    console.log(res)
  }
  return(
    <>
    <div style={{textAlign:"center",width:"50%"}}>
      <div>
        <button onClick={handleCB} style={{backgroundColor:props.color}} class="decision-button">
          {props.text}
          </button>
      </div>
      <input onChange={handleQuantityChange} class="decision-input" type={"number"} disabled={props.transactionChoice!==props.text && props.transactionChoice!=="none"} ></input>
    </div>
    </>
  );
}

function Transaction(props){
  const [err,setError] = useState(null);
  const state = props.state;
  const [transactionChoice , setTransactionChoice] = useState("none"); 

  if(!props.GameStatus)
  {
    return (<></>);
  }

  return (
    <>
    <div class="transaction" style={{display:"flex"}}>
      <DecisionButton  text="Buy" cb={props.cb.cbBuy} nextState={props.nextState} setError={setError} color="green" transactionChoice={transactionChoice} setTransactionChoice={setTransactionChoice}/>
      <DecisionButton text="Sell" cb={props.cb.cbSell} nextState={props.nextState} setError={setError} color="red" transactionChoice={transactionChoice} setTransactionChoice={setTransactionChoice}/>
      {/* <DecisionButton text="Hold" cb={cb}/> */}

    </div>
    {(err!==null && state!==0) ? (<div class="err-msg" >{err}</div>):<></>}

    </>
  );
}

function InfoBox(props){
  
  const state = props.state;
  const data = props.data;
  

  if(data===null || state==null)
  {
    return (<div style={{color:"white"}}>Loading...</div>);
  }
  
  const framingP = data[state]["infoP"].map((d) =>{
    return (<li>{d}</li>);
  });
  const framingN = data[state]["infoN"].map((d) =>{
    return (<li>{d}</li>);
  });
  
  if(!props.GameStatus)
  {
    return (<></>);
  }

  return (
    <>
    <div class="info-viewer" style={{display:"flex",color:"white"}}>
      <div style={{width:"50%"}}>
        {framingP}
      </div>
      <div style={{width:"50%"}}>
        {framingN}
      </div>
    </div>
    </>
    
  )
}

function Market(props) {
  const [state, setState] = useState(0);
  const [data , setData] = useState(null);
  const [GameStatus,setGameStatus] = useState(true);
  useEffect(()=>{
    let url = "/situation.json";
    fetch(url)
    .then(res=>{
      res = res.json();
      return res;
    })
    .then(res=>{
      setData(res);
    })
  });
  function nextState(){
    if(state+1===data.length) {
      setGameStatus(false);
      return;
    } 
    setState(state+1)
  }

  return (
    <div className="Market">
        <InfoBox class="info-box" state={state} data={data} GameStatus={GameStatus}/>
        <Transaction class="transaction" cb={props} nextState={nextState} state={state} GameStatus={GameStatus}/>
    </div>
  );
}

export default Market;
