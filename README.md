# Blockchain-Based Document Verification System

Welcome to the Document Verification System! This full-stack application anchors the integrity of files on the Ethereum blockchain, guaranteeing they cannot be tampered with.

## 🚀 Built With
* **Blockchain:** Ethereum, Solidity, Truffle, Ethers.js, MetaMask
* **Backend:** ASP.NET Core Web API (C#), Entity Framework Core (MSSQL)
* **Frontend:** Vanilla HTML/CSS/JS with Glassmorphism Design

---

## ⚙️ Setup & Installation Instructions

### 1. Prerequisites
- **Node.js**: [Download](https://nodejs.org/)
- **.NET 9 SDK**: [Download](https://dotnet.microsoft.com/download)
- **Ganache / Truffle**: Run local blockchain network.
- **MetaMask**: Chrome/Edge Extension to interact with Blockchain.

### 2. Blockchain Setup (Truffle + Ganache)
1. Install Truffle globally: `npm install -g truffle`
2. Open Ganache locally and start a Quickstart workspace (Default Port: 7545).
3. Open a terminal in the `Blockchain` directory of this project.
4. Run deployment:
   ```bash
   truffle migrate --network development
   ```
5. **CRITICAL STEP**: After deployment, copy the deployed Contract Address shown in the terminal.
6. Open `Frontend/app.js` and update line 1:
   ```javascript
   const CONTRACT_ADDRESS = "0xYourDeployedContractAddress"; // Paste here!
   ```

### 3. Backend Setup (ASP.NET Core)
1. Open a terminal in the `Backend` directory.
2. Ensure you have the `dotnet-ef` tool installed: `dotnet tool install --global dotnet-ef`
3. Since EF Core is set to `EnsureCreated()`, the database will automatically spin up on the first run.
4. Run the project:
   ```bash
   dotnet run
   ```
   > Note the port displayed (e.g., `https://localhost:7289`). If it is different, update the `API_BASE_URL` in `Frontend/app.js`.

### 4. Frontend & Testing
1. Configure your MetaMask extension to connect to your local Ganache network (Network Name: Ganache, RPC URL: `http://127.0.0.1:7545`, Chain ID: 1337).
2. Import one of Ganache's dummy accounts into MetaMask using the Private Key.
3. Simply double-click `Frontend/index.html` to open it in your browser!
4. Navigate to `Upload`, click `Connect Wallet`, and try uploading the provided sample documents.

---

## 🎨 Design & Experience
The frontend is built using Vanilla CSS incorporating modern aesthetic features like:
- **Glassmorphism panels**
- **Animated background blobs** for dynamic styling
- **Color Variables** ensuring consistency across views.
- **Drag and drop targets** for intuitive UX.

## 🧪 Sample Documents
Included in the `Sample Files` directory are two minimal text documents you can use to test out the verification workflow:
- `original-document.txt`
- `fake-document.txt`
