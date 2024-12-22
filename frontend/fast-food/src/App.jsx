import React, { useState } from "react";
import RightSideBar from "./components/RightSideBar";
import Sidebar from "./components/Sidebar"
import MainComponent from "./components/mainComponent";
import "./css/App.css"
import PRODUCTS from "./product";

function App() {
  const {products} = PRODUCTS;
  const [cartItems,setCartItems] = useState([]);
  
  const onAdd = (product) => {
    const exist = cartItems.find(x => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map(x => 
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };


  const onRemove = (product) =>{
    const exist = cartItems.find(x => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems( cartItems.filter((x) => x.id !== product.id)
      );
    } else {
      setCartItems(
        cartItems.map(x => 
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  }

  return (
    <React.Fragment>
      <div className="app-container">
        <Sidebar/>
        <MainComponent onRemove={onRemove} onAdd={onAdd} />
        <RightSideBar countCartItems={cartItems.length} onRemove={onRemove} onAdd={onAdd} cartItems={cartItems} />
      </div>
    </React.Fragment>
  );
}

export default App;
