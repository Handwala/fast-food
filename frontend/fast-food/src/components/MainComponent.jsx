import React from 'react'
import "../css/App.css"
import "../css/Main-content.css"
import PRODUCTS from '../product'
import humburger from "../assets/humburger.png"


const mainComponent = (props) => {
  const {onAdd} = props;
  return (
   <div className="main-content">
    <div className="main-content2">
      <div className="greeting-section">
        <h1>Hello, hazuu</h1>
        <input type="text" placeholder="What do you want to eat today?" />
      </div>
      <div className="discount-banner">
        <h2>Get Discount Voucher Up To 20%</h2>
        <p>Order now to save more!</p>
        <img src={humburger} alt=""  />
      </div>
      <div className="category-section">
        <h3>Category</h3>
        <div className="categories">
          <div className="category">Bakery</div>
          <div className="category">Burgers</div>
          <div className="category">Beverages</div>
          <div className="category">Chicken</div>
          <div className="category">Pizza</div>
          <div className="category">Seafood</div>
        </div>
      </div>
      <div className="popular-dishes">
        <h3>Popular Dishes</h3>
        <div className="dishes">
  {PRODUCTS.map((product) => (
    <div key={product.id} className="product-card">
      {product.discount && (
        <span className="discount-badge">{product.discount}% off</span>
      )}
      <img src={product.image} alt={product.productName} />
      <h4>{product.productName}</h4>
      <p>${product.price}</p>
      <button onClick={() => onAdd(product)}>Add to Cart</button>
    </div>
    ))}
   </div>
      </div>
    </div>
   </div>
  )
}

export default mainComponent