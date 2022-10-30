import { useEffect,useState } from 'react';
import '../css/Game.css';
import Portfolio from './Portfolio';
import Market from './Market';

function Game() {

  const initialCapital = 5000;
  const [cash,setCash] = useState(5000);
  const [stock,setStockState] = useState({
    quantity:0,
    price:500,
  });


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
      return {
      status:1,
      err : null
      }
    }
  }

  const portfolio = {
      initialCapital:initialCapital,
      cash:cash,
      stock:stock
  };

  

  return (
    <div className="Game"  >
     <Portfolio portfolio={portfolio} />
     <Market cbBuy={buyStock} cbSell={sellStock} cbHold={holdStock} setStockState={setStockState} stock={stock}/>
    </div>
  );
}

export default Game;
