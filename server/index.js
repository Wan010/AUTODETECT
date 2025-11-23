```js
import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.json())


// Simulated APR endpoint
app.get('/api/apr', (req, res) => {
// In a real system you'd pull on-chain or oracle data. Here we return a simple object.
res.json({ apy: 6.5, source: 'simulated' })
})


// Proxy price from CoinGecko
app.get('/api/price/:id', async (req, res) => {
const id = req.params.id || 'ethereum'
const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(id)}&vs_currencies=usd`
try{
const r = await fetch(url)
const json = await r.json()
res.json(json)
}catch(err){ res.status(500).json({error: 'price fetch failed'}) }
})


const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log('Server listening on', PORT))
```
