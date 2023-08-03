import React from 'react'

export default function ProductsList({products, handleAddButton}) {
  return (
    <div>
        <div style={{width:'400px'}} className="h-96 rounded overflow-hidden shadow-lg">
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
          
          <hr />
    </div>
        </div>
    </div>
  )
}
