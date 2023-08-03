
import { useEffect, useState } from "react";

// Importing products from groceries 
import { products } from './GrocceryDetails/groceries.js'
import ProductsList from "./components/ProductsList.js";
import GrocerryProductsList from "./components/GrocerryProductsList.js";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "./state/index.js";
import { bindActionCreators } from "redux";


function App() {
  // State for Storing Products
  const [allProduts,setAllProducts] = useState(JSON.parse(localStorage.getItem("cart")));

  
  // State for Calculating  Products Total Amount;
  const amount = useSelector(state=>state.amountReducer)

  // State for Calculating  Products SubTota;
  const subTotalRe = useSelector(state=>state.subTotalReducer)
  // State for Calculating  Products savings;
  const savingRe = useSelector(state=>state.savingsReducer)

  const dispatch = useDispatch()


  // Function for calculating prices
  const calculatePrices = ()=>{
    let total = 0;
    let saves = 0;

    // Calculating Savings
    JSON.parse(localStorage.getItem("cart")).map((p)=>{
      console.log(p);
      if(p.name === "Butter"){
        saves += (p.price/3); 
      }
      if(p.name === "Cheese"){
        saves += (p.price/2); 
      }
      if(p.name === "Soup"){
        JSON.parse(localStorage.getItem("cart")).forEach((p)=>{
          if(p.name === "Bread"){
            saves += p.price/2;
          }
        })
      }

      // Calculating Total
      total += p.qty * p.price;
    })

    console.log("Saves ",saves)
   
    // Dispatching savings
    dispatch(actionCreators.savings(saves))

    // Dispatching subTotal
    dispatch(actionCreators.subTotal(total))

    // Dispatching TotalAmount
    dispatch(actionCreators.totalAmount(total-saves))

    
  }

// Saving in local storage
  const saveCartLS = (cart)=>{
    // Setting Items in Local Storage
    localStorage.setItem("cart",JSON.stringify(cart))
    
    calculatePrices();
    

    
  }

  //When product changes it get added to LS
  useEffect(()=>{
    console.log("In use effect")
    try{
      //Checking if localstorage is null
      if(localStorage.getItem("cart")!==null){
        console.log("setting item in ls")
        let newProducts = allProduts
        //Checking products array is not nll
        if(newProducts.length !== 0){
          console.log("Checking ",newProducts)
          saveCartLS(newProducts)
          
        }
        else{
          saveCartLS([])
        }
      }
      
    }catch(error){
      console.log(error)
      // localStorage.clear()
    }
  },[allProduts])
 
// Adding product to Basket
  const handleAddButton = (e)=>{
    
    

    let objContainsArray = false;
    let newCart = allProduts;
    
    if(newCart.length===0){
      setAllProducts([...newCart,e])
    }
    else{
      // Checking if Products is already in cart
      for(let p in newCart){
        if(newCart[p].name===e.name){
          console.log("contains ",newCart[p])
          objContainsArray = true;
        }

      }

      console.log("Contains obj",objContainsArray)

      if(!objContainsArray){
        setAllProducts([...newCart,e])
        console.log(newCart)
      }
    }
    

    saveCartLS(newCart);
    calculatePrices();
   
  }


  let qty = 1;

// Handling adding and subtracting quantities

  const setProductQuantity = (qty,product,operation)=>{
    let newCart = allProduts; 
  
    for(let p in newCart){
      if(newCart[p].name === product.name){
        if(operation==="plus"){
          newCart[p].qty = newCart[p].qty+qty;
          console.log(newCart[p].name)

        }
        else{
          if(newCart[p].qty>0){
            newCart[p].qty = newCart[p].qty-qty;

          }
          if(newCart[p].qty ===0){
            newCart.splice(p,1);
          }
        }
        
      }
    }
    setAllProducts([...newCart]);
    console.log(newCart)

    // Saving to Local Strage
    saveCartLS(newCart);
  }


  return(
    <div className="App">
     
      <h1 className="mb-8 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Grocery Management System</h1>

      <div className="flex justify-around">

        <ProductsList products={products} handleAddButton={handleAddButton}  />
        <GrocerryProductsList allProduts={allProduts} setProductQuantity={setProductQuantity} subTotal={subTotalRe} savings={savingRe} totalAmount={amount} />

      </div>
    </div>
  )
}

export default App;
