```markdown
# Staking Dashboard (Beginner-friendly)


This project contains a React frontend that connects to a user's MetaMask wallet, shows ETH balance, fetches a live price from CoinGecko, simulates staking/unstaking (local state + localStorage) and shows estimated rewards based on a configurable APY.


There's also an optional small Express server that exposes an `/api/apr` endpoint (returns a simulated APY) and proxies price requests if you prefer not to call CoinGecko directly from the browser.


### Local run (frontend only)
1. Install Node.js (v18+ recommended).
2. Open terminal in `/client` and run:
```bash
npm install
npm run dev
```
3. Open the URL printed (usually http://localhost:5173)


### Run server (optional)
1. In `/server`:
```bash
npm install
npm start
```
2. Server runs at http://localhost:4000


### Deploy
- Frontend: easiest deploy to Vercel or Railway static service (Railway supports static sites). Connect your GitHub repo and let it build.
- Backend: deploy to Railway as a Node.js service.


---
```
