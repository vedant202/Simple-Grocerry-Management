export const amountReducer = (state=0,action)=>{
    
    if(action.type  === 'totalAmount'){
        state = action.payload
        return state
    }
    else{
        return state;
    }

}

export const savingsReducer = (state=0,action)=>{
    if(action.type  === 'savings'){
        state = action.payload
        return state
    }
    else {
        return state;
    }
}
export const subTotalreducer = (state=0,action)=>{
    if(action.type  === 'subTotal'){
        state = action.payload
        return state;
    }
    else{
        return state;
    }
}

export const productReducer = (state={},action)=>{
    if(action.type  === 'allProducts'){
        state = action.payload
        return state
    }
    else{
        return state
    }
}