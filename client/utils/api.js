```js
// Auto-detect backend API
// 1. Use VITE_API_URL if provided (Vercel)
// 2. Use window.location.origin if served by backend
// 3. Fallback to localhost


export function getBackendURL() {
// Vercel / environment variable
if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL


// If running under Railway or server-served frontend
if (typeof window !== 'undefined') {
const origin = window.location.origin
// If hosted together or if backend proxy is used
if (!origin.includes('localhost')) return origin
}


// Local development backend default
return 'http://localhost:4000'
}


// Fetch APY
export async function fetchAPR() {
const base = getBackendURL()
const res = await fetch(`${base}/api/apr`)
if (!res.ok) throw new Error('Failed to load APR')
return res.json()
}


// Fetch price (proxied or direct)
export async function fetchPrice(id = 'ethereum') {
const base = getBackendURL()
try {
// Try backend proxy first
const r = await fetch(`${base}/api/price/${id}`)
if (r.ok) {
const j = await r.json()
return j[id].usd
}
} catch (e) {}


// Fallback → direct CoinGecko
const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(id)}&vs_currencies=usd`
const res = await fetch(url)
if (!res.ok) throw new Error('CoinGecko error')
const json = await res.json()
return json[id].usd
}
```


```js
export async function fetchPrice(id = 'ethereum'){
// public CoinGecko simple price API
const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(id)}&vs_currencies=usd`
const res = await fetch(url)
if(!res.ok) throw new Error('CoinGecko error')
const data = await res.json()
return data[id].usd
}
```
