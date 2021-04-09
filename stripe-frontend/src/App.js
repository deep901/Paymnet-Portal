import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';



function App() {

  const [product,setProduct]=useState({
    name:"Ruskin Bond book",
    price:10,
    productBy:"roushan"
  })


const makePayment=(token)=>{
  const body={
    token,
    product
  }
  const headers={
    contentType:"application/json"
  }
  const url='http://localhost:80/payment';
  return fetch(url,{
    method:"POST",
    body:JSON.stringify(body),
    headers
  })
  .then(response=>{
    consolimport logo from './logo.svg';
import './App.css';
import React,{useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';



function App() {

  const [product,setProduct]=useState({
    name:"Ruskin Bond book",
    price:10,
    productBy:"roushan"
  })


const makePayment=(token)=>{
  const body={
    token,
    product
  }
  const headers={
    contentType:"application/json"
  }
  const url='http://localhost:80/payment';
  return fetch(url,{
    method:"POST",
    body:JSON.stringify(body),
    headers
  })
  .then(response=>{
    console.log(response)
    const {status}=response
    console.log(status)
  })
  .catch(err=>console.log(err))
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StripeCheckout 
          stripeKey="pk_test_51I80jRLxxYzXmYPET0lNWKfbllyoxR87z1daQMAqRW7x5WNeumnmAXqPrlAKLgWZzqOpupDtlp7Y9J2Ol6pgXqFv00x6BmnriX"
         token={makePayment}
         name="React-Buy"
         amount={product.price}
         billingAddress
         shippingAddress
        >
           <button className="btn-large pink">
             Buy react at ${product.price}
           </button>
          </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
