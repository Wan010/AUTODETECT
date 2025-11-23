```jsx
import React, { useEffect, useState } from 'react'


const STORAGE_KEY = 'staking_demo_state_v1'


function loadState(){
try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { staked: 0, since: null } }catch(e){ return { staked:0, since:null } }
}
function saveState(s){ localStorage.setItem(STORAGE_KEY, JSON.stringify(s)) }


export default function StakePanel({ price, apy, setApy }){
const [stakeAmount, setStakeAmount] = useState('0.1')
const [state, setState] = useState(loadState())
const [now, setNow] = useState(Date.now())


useEffect(()=>{ const id = setInterval(()=>setNow(Date.now()), 10_000); return ()=>clearInterval(id) },[])


useEffect(()=> saveState(state), [state])


function stake(){
const amt = Number(stakeAmount)
if(!amt || amt <= 0) return alert('Enter valid amount')
setState(prev => ({ staked: prev.staked + amt, since: prev.since || Date.now() }))
setStakeAmount('0.1')
}


function unstake(){
setState({ staked: 0, since: null })
}


function earned(){
if(!state.since || state.staked <= 0) return 0
const seconds = (now - state.since) / 1000
const years = seconds / (3600*24*365)
const rate = apy/100
return state.staked * (Math.pow(1+rate, years) - 1)
}


return (
<div className="card">
<h2>Staking (Simulated)</h2>


<div style={{marginTop:8}}>
<label>APY (%): </label>
<input className="input" value={apy} onChange={e=>setApy(Number(e.target.value))} style={{width:80, marginLeft:8}} />
</div>


<div style={{marginTop:12}}>
<div><strong>Currently staked:</strong> {state.staked} ETH</div>
<div style={{marginTop:6}}><strong>Estimated rewards:</strong> {earned().toFixed(6)} ETH</div>
<div style={{marginTop:6}}><strong>USD value (staked + rewards):</strong> {price ? `$${((state.staked + earned()) * price).toFixed(2)}` : '...'}</div>
</div>


<div style={{marginTop:12}}>
<input className="input" value={stakeAmount} onChange={e=>setStakeAmount(e.target.value)} style={{width:120}} />
<button className="button" onClick={stake} style={{marginLeft:8}}>Stake</button>
<button className="button" onClick={unstake} style={{marginLeft:8}}>Unstake (all)</button>
</div>


<div style={{marginTop:12, opacity:0.9}}>
<small>Note: This demo simulates staking locally in your browser (no real transactions). Use only to learn UX & flows.</small>
</div>
</div>
)
}
```
