//TODO: add env var
const stripe = require('stripe')(
  'sk_test_51OLD86L96zAJCbihOsbsRDuuDyM1MrjOW50HdU5tQpvPfcesJjal6r3Im7u4dW2KyCsZ3AR6T037OKJfZq7BgV9L003bTtfAJJ'
)

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: true, credentials: true }))

//TODO: add env var
const YOUR_DOMAIN = 'http://localhost:4242'

app.post('/checkout', async (req, res, next) => {
  const items = req.body.items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [item.product],
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
    // price: '{{PRICE_ID}}',
  }))

  try {
    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500,
              currency: 'usd',
            },
            display_name: 'Next day air',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 1,
              },
            },
          },
        },
      ],
      line_items: items,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    })

    res.status(200).json(session)
    // res.redirect(303, session.url)
  } catch (error) {
    next(error)
  }
})

app.listen(4242, () => console.log('Running on port 4242'))
