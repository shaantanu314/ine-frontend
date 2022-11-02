class responseHolder{
    constructor(){
        this.responses = [] 
        this.netWorth = null
        this.stockQuantity = null
        this.stockValue = null
        // response template
        // {
        //     'netWorth': Int,
        //     'stockQuantity':Int,
        //     'stockValueTotal':Int,
        //     'decision':{
        //         'type':(buy/sell/hold),
        //         'quantity':Int
        //     }

        // }
    }
    setNetWorth(netWorth){
        this.netWorth = netWorth
    }
    setStockState(stock){
        this.stockQuantity = stock.quantity;
        this.stockValue = this.stockQuantity*stock.price
    }
    addNewResponse(newDecision){
        const currResponse = {
            'netWorth': this.netWorth,
            'stockQuantity':this.stockQuantity,
            'stockValueTotal':this.stockValue,
            'decision': newDecision
        }
        this.responses.push(currResponse)
    }
    sendResponseToBackend(){
        return
    }
    
}


export default responseHolder;