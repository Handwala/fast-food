import React from 'react';
import axios from 'axios';
import "../css/App.css";
import "../css/rightSideBar.css";

const rightSideBar = (props) => {
  const { cartItems, onAdd, onRemove } = props;
  const itemPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const taxPrice = itemPrice * 2;
  const totalPrice = itemPrice + taxPrice;
  const { countCartItems } = props;

  // Function to initiate payment
  const initiatePayment = () => {
    const phone_number = '0742429368'; // Example phone number, replace with actual
    const amount = totalPrice; // Set the payment amount to the total price

    axios.get('http://127.0.0.1:8000/payments/paybill-online/', {
      params: { phone_number, amount }
    })
    .then(response => {
      console.log('Payment initiated:', response.data);
    })
    .catch(error => {
      console.error('Error initiating payment:', error);
    });
  };

  return (
    <div className="right-sidebar">
      <div className="right-sidebar1">
        <div className="order-summary">
          <h3>Order Menu {''}
            {countCartItems ? <button>{countCartItems}</button> : ''}
          </h3>

          <div className="cartitems">
            {cartItems.length === 0 && <div>Cart is empty</div>}
            {cartItems.map((item) => (
              <div key={item.id} className="row">
                <img src={item.image} alt={item.productName} style={{ width: "50px", height: "50px" }} />
                <div>{item.productName}</div>
                <div className="col-2">
                  <button onClick={() => onAdd(item)}> + </button>
                  <button onClick={() => onRemove(item)}>-</button>
                </div>
                <div className="col-2">
                  {item.qty} * {item.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="total">
        {cartItems.length !== 0 && (
          <>
            <hr />
            <div>Total</div>
            <div><strong>{totalPrice.toFixed(2)}</strong></div>
          </>
        )}
      </div>
      <div className="checkout">
        <button onClick={initiatePayment}>Checkout</button>
      </div>
    </div>
  );
};

export default rightSideBar;
