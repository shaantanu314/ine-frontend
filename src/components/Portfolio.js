import React, { useState, useEffect } from 'react';
import '../css/Portfolio.css';


function Wallet(props) {

    const {initialCapital,currentValue} = props.info
    const netChange = currentValue-initialCapital;
    return (
      <div className="wallet">
          <div style={{display:"flex"}}>
            <div style={{width:"50%"}}>
                <h3>
                    Initial Capital: &#8377;{initialCapital}
                </h3>
                <h3>
                    Current Value: &#8377;{currentValue}
                </h3>
            </div>
            <div style={{width:"50%"}}>
                {
                    (netChange>0)?(
                        <h3 style={{color:"#66e64c"}}>
                            + &#8377;{Math.abs(netChange)} ( +{Math.round(10*netChange*100/initialCapital)/10}% )
                        </h3>
                    ):(
                        <h3 style={{color:"#d9423a"}}>
                            - &#8377;{Math.abs(netChange)} ( {Math.round(10*netChange*100/initialCapital)/10}% )
                        </h3>
                    )
                }
            </div>
          </div>
      </div>
    );
  }

function Portfolio(props) {

    const portfolio = props.portfolio
    const [windowWidth,setWindowWidth] = useState(getWindowWidth());
    const totalWidth = 0.8*windowWidth;
    const cashValue = portfolio.cash;
    const stockValue = portfolio.stock.quantity*portfolio.stock.price;
    const totalValue = cashValue + stockValue;
    const cashWidth = Math.min(Math.ceil(cashValue*totalWidth/totalValue),totalWidth-50);
    const stockWidth = Math.max(totalWidth - cashWidth,50);

    useEffect(()=>{

        function updateWidth(){
            setWindowWidth(getWindowWidth());
        }
        window.addEventListener('resize',updateWidth);
        return () => {
            window.removeEventListener('resize',updateWidth);
        }
    },[]);

    return (
        <div className="portfolio" >
            <Wallet class="wallet" info={{
            initialCapital:portfolio.initialCapital,
            currentValue:totalValue
            }}/>
            <div class="portfolio-viewer">
            <div class="cashInfo" style={{width:cashWidth}}>
                Cash: &#8377;{cashValue}
            </div>
            <div class="stockInfo" style={{width:stockWidth}}>
                Stock: &#8377;{stockValue}
            </div>
            </div>

        </div>
    );
}

function getWindowWidth(){
    const {innerWidth} = window;
    return innerWidth;
}

export default Portfolio;
