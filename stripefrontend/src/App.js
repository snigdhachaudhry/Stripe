import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';



function App() {

  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "Facebook",
  })

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body : JSON.stringify(body)
    })
    .then(response => {
      console.log("RESPONSE ",response);
      const {status} = response;
      console.log("STATUS ", status);
          
    })
    .catch(error => console.log(error)
    )

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <StripeCheckout
          stripeKey="pk_test_51GtyUOBDQ0rXecVJWkf3HjmMTvkqH1hxRXjWY5xUAOnSpCP9zpfbf19diFLp1Q17eMEa2JDjY2v5e1y0HRaWVs60003WTo8Rrn"
          token={makePayment}
          name="buy react"
          amount={product.price * 100}
          shippingAddress
          billingAddress
        >
          <button className="btn-large blue">
            Buy React in just {product.price} $
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
