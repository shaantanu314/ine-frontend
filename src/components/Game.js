import { useEffect,useState } from 'react';
import '../css/Game.css';
import Portfolio from './Portfolio';
import Market from './Market';

function Game() {

  const initialCapital = 5000;
  const [cash,setCash] = useState(1300);
  const [stock,setStockState] = useState({
    quantity:2,
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

  const portfolio = {
      initialCapital:initialCapital,
      cash:cash,
      stock:stock
  };

  return (
    <div className="Game"  >
     <Portfolio portfolio={portfolio}/>
     <Market cbBuy={buyStock} cbSell={sellStock}/>
    </div>
  );
}

export default Game;
