const cors = require("cors")
const express = require("express")

const stripe = require("stripe")(
  "sk_test_51GtyUOBDQ0rXecVJRL1lKFnNot4Ke4vOE5XoeVicmT514JgXuUe4vyG37m2p5IDnTzQ3hyxsJPZnr9nr89sWt3GW00hJMENVox"
);
const {v4: uuidv4} = require("uuid")


const app = express();



//middleware
app.use(express.json())
app.use(cors())

//routes
app.get("/", (req, res) => {
    res.send("it worls at my website learncodeonline")
})


app.post("/payment", (req, res) => {
    const {product, token} = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);

    const idempotencyKey = uuid() //keeps track of that the user is not charged twice by generating a unique key
     
    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then(customer => {
        stripe.charges.create({
            amount: product.price * 100,  //(in stripe everything displays in cents to to display in dollars we need to multiply price by 100)
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, {idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err)) 
})



//listen

app.listen(8282, () => console.log("LISTENING AT PORT 8282")
)