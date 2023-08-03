const allproducts = (prods)=>{
    return (dispatch)=>{
        dispatch({
            type:"allProducts",
            payload:prods
        })
    }
}

const subTotal = (amount)=>{
    return (dispatch)=>{
        dispatch({
            type:"subTotal",
            payload:amount
        })
    }
}

const savings = (sav)=>{
    return (dispatch)=>{
        dispatch({
            type:"savings",
            payload:sav
        })
    }
}

const totalAmount = (amount)=>{
    return (dispatch)=>{
        dispatch({
            type:"totalAmount",
            payload:amount
        })
    }
}

export {allproducts,savings,subTotal,totalAmount}