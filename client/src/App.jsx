```jsx
import React, { useEffect, useState } from 'react'
import WalletCard from './components/WalletCard'
import StakePanel from './components/StakePanel'
import { fetchPrice } from './utils/api'


export default function App() {
const [price, setPrice] = useState(null)
const [apy, setApy] = useState(6.5) // default APY 6.5%


useEffect(() => {
let mounted = true
async function getPrice() {
try {
const p = await fetchPrice('ethereum')
if (mounted) setPrice(p)
} catch (e) {
console.error('price fetch error', e)
}
}
getPrice()
const id = setInterval(getPrice, 60_000) // refresh every minute
return () => { mounted = false; clearInterval(id) }
}, [])


return (
<div className="app-root">
<header className="topbar">
<h1>Staking Dashboard</h1>
<div className="meta">Simple demo — simulated staking, connects MetaMask</div>
</header>


<main className="container">
<WalletCard price={price} />
<StakePanel price={price} apy={apy} setApy={setApy} />
</main>


<footer className="footer">
<small>Data: CoinGecko. Staking is simulated in localStorage — no real funds are moved.</small>
</footer>
</div>
)
}
```
