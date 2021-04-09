const express = require('express');
const app = express();
const cors=require('cors');
const stripe = require('stripe')('sk_test_51IWf3dFOe4FAgoEJ4z3wnC7pcK8k2C1AMvJSUNz3aHygmCVGzQWjfhQR7H65nJpspObmfCUEaBaGDRo7YLNxoFA100dMIATDA8');
const { v4: uuidv4 } = require('uuid');
uuidv4();                          // to make sure payment is not done twice


// middleware
app.use(express.json());
app.use(cors());

// routes
app.get('/',(req,res)=>{
    res.status(200).send('running application');
})

    app.post('/payment',(req,res)=>{
    const {product,token}=req.body;
    console.log('product',product);
    console.log('price',product.price);
    const idempotencyKey =uuidv4(); // not charged twice for same product


    return stripe.customers.create({
        email: token.email,
        source:token.id,
      })
        .then((customer=>{
            stripe.charges.create({
             amount: (product.price)*100,
             currency:'usd',
             customer:customer.id,
             receipt_email:token.email,
             description:product.name,
             shipping:{
               name:token.card.name,
                 adress:{country:token.card.adress_country}
                 
             }
            },{idempotencyKey:idempotencyKey})
        }))
        .then(val=>res.status(200).json(val))
        .catch(error => console.error(error));

})


// listen
app.listen(8080, function() {
    console.log("Your app has started!");
});