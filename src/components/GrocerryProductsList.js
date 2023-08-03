import React from 'react'

export default function GrocerryProductsList({allProduts,qty,setProductQuantity,subTotal,savings,totalAmount}) {
  return (
    <div><div style={{width:'500px'}} className="rounded overflow-hidden shadow-lg">
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
  )
}
