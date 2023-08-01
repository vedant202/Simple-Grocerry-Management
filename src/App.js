
import { useEffect, useState } from "react";

// Importing products from groceries 
import { products } from './GrocceryDetails/groceries.js'


function App() {
  // State for Storing Products
  const [allProduts,setAllProducts] = useState(JSON.parse(localStorage.getItem("cart")));

  // State for Calculating  Products SubTota;
  const [subTotal,setSubTotal] = useState(0);

  // State for Calculating  Products savings;
  const [savings,setSavings] = useState(0);

  // State for Calculating  Products Total Amount;
  const [totalAmount,setTotalAmount] = useState(0);

  // const products_name = ["Bread","Milk", "Cheese", "Soup","Butter"]



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
        JSON.parse(localStorage.getItem("cart")).map((p)=>{
          if(p.name === "Bread"){
            saves += p.price/2;
          }
        })
      }

      // Calculating Total
      total += p.qty * p.price;
    })

    console.log("Saves ",saves)
    setSavings(saves)
    setSubTotal(total);
    
    setTotalAmount(total-saves);
    
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



  return (
    <div className="App">
      <h1 className="mb-8 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Grocery Management System</h1>

      <div className="flex justify-around">
        <div className="w-1/4 h-96 rounded overflow-hidden shadow-lg">
        {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> */}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Products</div>
          <hr />
          
            {
              Object.keys(products).map((p)=>{
                
                return (<>
                  <div key={p} className="products_list flex text-xl mt-2 mb-2 font-medium justify-between	">
                    <div className="product_name">{p}</div>
                    <div className="product_price">£ {products[p]}</div>
                    
                    <button onClick={()=>handleAddButton({name:p,price:products[p],qty:1})} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                      Add
                    </button>
                    
                  </div>
                  <hr />
                </>)
              })
            }


            {/* <div className="products_list flex text-xl mt-2 mb-2 font-medium justify-between	">
              <div className="product_name">Bread</div>
              <div className="product_price">£ 1.10</div>
              
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                Add
              </button>
              
            </div> */}
          
          <hr />
    </div>
        </div>

        <div className="w-1/3 rounded overflow-hidden shadow-lg">
          {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> */}
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Basket</div>
            <hr />
            
             

             

              {
                
                allProduts.length!=0?allProduts.map((p)=>{
                  qty = p.qty;
                  
                  return (<>
                    <div key={p.name} className="products_list flex text-xl mt-2 mb-2 font-medium justify-between	">
                <div className="product_name">{p?.name}</div>
                <div className="product_price">£ {p?.price}</div>
                
                <div>
                  <button onClick={()=>{qty = qty+1;
                    setProductQuantity(1,p,"plus")
                  }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                    +
                  </button>
                  <span className="quantity"> {p.qty} </span>

                  <button onClick={()=>{qty = qty+1;
                    setProductQuantity(1,p,"minus")
                  }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                    -
                  </button>
                </div>

                
              </div>
              <hr />
                  </>)
                }):(<h2>Basket is empty</h2>)
                
              }
            
              
              <div className="products_list flex text-xl mt-2 mb-2 font-medium justify-between	">
                <div className="product_name">Bread</div>
                <div className="product_price">£ 1.10</div>
                
                <div>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                    +
                  </button>
                  <span className="quantity"> 1 </span>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                    -
                  </button>
                </div>

                
              </div>

              <hr />
              
              <div className="products_list flex text-xl mt-2 mb-2 font-medium justify-between">
                <h2>Sub Total:</h2>
                <span className="subTotal">£ {subTotal.toFixed(2)}</span>

              </div>
              <hr />

              <div className="products_list flex text-xl mt-2 mb-2 font-medium justify-between">
                <h2>Savings:</h2>
                <span className="saving">£ {savings.toFixed(2)}</span>

              </div>
              <hr />

              <div className="products_list flex text-xl mt-2 mb-2 font-medium justify-between">
                <h2>Total Amount:</h2>
                <span className="subTotal">£ {totalAmount.toFixed(2)}</span>

              </div>
      </div>
        </div>
      </div>

    </div>
  );
}

export default App;
