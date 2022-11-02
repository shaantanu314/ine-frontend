import {useEffect,useState} from 'react';

function DecisionButton(props){
 
    const [quantity,setQuantity] = useState(null);
    const [isHold,setHold] = useState(false);
    const isCheckbox = (props.text === "Hold");

    function handleQuantityChange(event){
        props.setTransactionChoice(props.text);
        setQuantity(event.target.value);
        if(event.target.value==="")
        {
            props.setTransactionChoice("none");
        }

    }
    function handleCB(){
        let res = null;
        if(!isCheckbox){
            res = props.cb(quantity);
        }
        else{
            res = props.cb(isHold);
        }
        props.setError(res.err);
        if(res.status===1)
        {
            props.nextState();
            props.setTransactionChoice("none");     
            if(isCheckbox)
                setHold(false);
            else
                setQuantity(''); 
        }
    }

    const isDisabled = (props.transactionChoice!==props.text && props.transactionChoice!=="none" );

    return(
        <>
        <div class="button-holder" >
        <div style={{width:"30%"}}>
            {
                (!isCheckbox)? (
                    <input 
                    onChange={handleQuantityChange} 
                    class="decision-input" type={"number"} 
                    disabled={isDisabled} 
                    value = {quantity}
                    ></input>
                ):(
                    <input onChange={(event)=>{
                        if(!event.target.checked)
                        {
                            setHold(false);
                            props.setTransactionChoice("none");
                        }
                        else{
                            setHold(true);
                            props.setTransactionChoice(props.text);
                        }
                    }} class="decision-checkbox"  type={"checkbox"} disabled={isDisabled} checked={isHold}></input>
                )
            }
        </div>
        <div>
            <button onClick={handleCB} style={{backgroundColor: (isDisabled)? "grey":props.color}} class="decision-button" disabled={isDisabled}>
            {props.text}
            </button>
        </div>
        </div>
        </>
    );
}

function Transaction(props){
    const [err,setError] = useState(null);
    const state = props.state;
    const [transactionChoice , setTransactionChoice] = useState("none"); 

    

    return (
        <>
        <div class="transaction" >
        <DecisionButton  text="Buy" cb={props.cb.cbBuy} nextState={props.nextState} setError={setError} color="#15df07" transactionChoice={transactionChoice} setTransactionChoice={setTransactionChoice}/>
        <DecisionButton text="Sell" cb={props.cb.cbSell} nextState={props.nextState} setError={setError} color="#e04646" transactionChoice={transactionChoice} setTransactionChoice={setTransactionChoice}/>
        <DecisionButton text="Hold" cb = {props.cb.cbHold} nextState={props.nextState} setError={setError} color="#0866d0" transactionChoice={transactionChoice} setTransactionChoice={setTransactionChoice}/>
        {/* <DecisionButton text="Hold" cb={cb}/> */}

        </div>
        {(err!==null) ? (<div class="err-msg" >{err}</div>):<></>}

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

   
   
    return (
        <>
        <div style={{color:"white",fontSize:"larger",textAlign:"center"}}>Market </div>
        <hr></hr>
        <div class="stock-price"> Current Trading Price: &#8377;{props.stock.price}</div>
        <div class="info-viewer" >
            {data[state]["infoP"]}
        </div>
        </>
        
    )
}


  
export {
    DecisionButton,
    Transaction,
    InfoBox,
}