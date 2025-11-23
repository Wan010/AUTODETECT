```jsx
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'


export default function WalletCard({ price }){
const [provider, setProvider] = useState(null)
const [address, setAddress] = useState(null)
const [ethBalance, setEthBalance] = useState('0')


useEffect(() => {
if(window.ethereum){
const p = new ethers.BrowserProvider(window.ethereum)
setProvider(p)
// Auto-detect accounts if connected
p.listAccounts().then(list => { if(list.length) setAddress(list[0].address) }).catch(()=>{})
}
}, [])


async function connect(){
if(!window.ethereum) return alert('Please install MetaMask')
try{
await window.ethereum.request({ method: 'eth_requestAccounts' })
const p = new ethers.BrowserProvider(window.ethereum)
setProvider(p)
const signer = await p.getSigner()
const addr = await signer.getAddress()
setAddress(addr)
const bal = await p.getBalance(addr)
setEthBalance(ethers.formatEther(bal))
}catch(e){ console.error(e) }
}


async function refresh(){
if(!provider || !address) return
const bal = await provider.getBalance(address)
setEthBalance(ethers.formatEther(bal))
}


return (
<div className="card">
<h2>Wallet</h2>
<div style={{marginTop:10}}>
<div><strong>Address:</strong> {address ? `${address.substring(0,6)}...${address.slice(-4)}` : 'Not connected'}</div>
<div style={{marginTop:8}}><strong>ETH Balance:</strong> {Number(ethBalance).toFixed(6)} ETH</div>
<div style={{marginTop:8}}><strong>USD Value:</strong> {price ? `$${(Number(ethBalance || 0) * price).toFixed(2)}` : 'Loading...'}</div>


<div style={{marginTop:12}}>
{!address ? (
<button className="button" onClick={connect}>Connect MetaMask</button>
) : (
<>
<button className="button" onClick={refresh}>Refresh Balance</button>
</>
)}
</div>
</div>
</div>
)
}
```
