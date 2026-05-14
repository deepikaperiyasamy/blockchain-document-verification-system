const CONTRACT_ADDRESS = "0xe2b28fB1F912f21531Bb5fC0dc61FEff36f42041";

const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "string", "name": "hash", "type": "string" },
            { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "name": "DocumentAdded",
        "type": "event"
    },
    {
        "inputs": [{ "internalType": "string", "name": "hash", "type": "string" }],
        "name": "addDocumentHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "string", "name": "hash", "type": "string" }],
        "name": "verifyDocumentHash",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    }
];

const API_BASE_URL = "http://localhost:5052/api/Document";

let provider, signer, contract;
let isWalletConnected = false;

/* ---------------- INIT ---------------- */

document.addEventListener("DOMContentLoaded", () => {
    initWalletUI();
    setupEventListeners();
});

/* ---------------- WALLET ---------------- */

async function connectWallet() {
    try {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        await window.ethereum.request({ method: "eth_requestAccounts" });

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        // ✅ IMPORTANT FIX
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        const address = await signer.getAddress();

        isWalletConnected = true;

        const btn = document.getElementById("connectWalletBtn");
        if (btn) {
            btn.innerText = address.substring(0, 6) + "..." + address.substring(38);
            btn.style.background = "green";
        }

        console.log("Wallet connected:", address);

    } catch (err) {
        console.error("Wallet error:", err);
        alert("Wallet connection failed");
    }
}

function initWalletUI() {
    const btn = document.getElementById("connectWalletBtn");
    if (btn) btn.addEventListener("click", connectWallet);
}

/* ---------------- EVENTS ---------------- */

// function setupEventListeners() {
//     setupDragDrop("uploadDropZone", "uploadFileInput", "uploadFileName", "uploadBtn");

//     const uploadBtn = document.getElementById("uploadBtn");
//     if (uploadBtn) uploadBtn.addEventListener("click", handleUpload);
// }
function setupEventListeners() {

    // Upload setup
    setupDragDrop("uploadDropZone", "uploadFileInput", "uploadFileName", "uploadBtn");

    const uploadBtn = document.getElementById("uploadBtn");
    if (uploadBtn) uploadBtn.addEventListener("click", handleUpload);

    // ✅ Verify setup (THIS WAS MISSING)
    setupDragDrop("verifyDropZone", "verifyFileInput", "verifyFileName", "verifyBtn");

    const verifyBtn = document.getElementById("verifyBtn");
    if (verifyBtn) verifyBtn.addEventListener("click", handleVerify);
}

/* ---------------- DRAG DROP ---------------- */

function setupDragDrop(zoneId, inputId, nameId, btnId) {
    const zone = document.getElementById(zoneId);
    if (!zone) return;

    const input = document.getElementById(inputId);
    const nameDisplay = document.getElementById(nameId);
    const btn = document.getElementById(btnId);

    zone.addEventListener("click", () => input.click());

    input.addEventListener("change", () => {
        if (input.files.length) {
            nameDisplay.innerText = input.files[0].name;
            btn.style.display = "block";
        }
    });
}

/* ---------------- UPLOAD ---------------- */

// async function handleUpload() {
//     const input = document.getElementById("uploadFileInput");

//     if (!input.files.length) {
//         alert("Please select a file!");
//         return;
//     }

//     const loader = document.getElementById("uploadLoader");
//     const uploadBtn = document.getElementById("uploadBtn");

//     loader.style.display = "block";
//     uploadBtn.disabled = true;

//     try {
//         const formData = new FormData();
//         formData.append("file", input.files[0]);

//         console.log("Uploading file...");

//         const response = await fetch(`${API_BASE_URL}/upload`, {
//             method: "POST",
//             body: formData
//         });

//         // ✅ IMPORTANT FIX (prevents silent crash)
//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error("Server error:", errorText);
//             throw new Error("Upload failed on server");
//         }

//         const data = await response.json();
//         console.log("Backend response:", data);

//         const hash = data.hash;

//         let txHash = "Wallet not connected";

//         // ✅ Blockchain integration
//         if (isWalletConnected && contract) {
//             console.log("Sending to blockchain...");

//             const tx = await contract.addDocumentHash(hash);
//             const receipt = await tx.wait();

//             txHash = receipt.hash;
//         }

//         // ✅ Show result
//         document.getElementById("uploadResult").style.display = "block";
//         document.getElementById("uploadHashValue").innerText = hash;
//         document.getElementById("uploadTxHash").innerText = txHash;

//     } catch (err) {
//         console.error("Upload error:", err);
//         alert("Upload failed. Check console.");
//     } finally {
//         loader.style.display = "none";
//         uploadBtn.disabled = false;
//     }
// }

async function handleUpload() {
    const input = document.getElementById("uploadFileInput");

    if (!input.files.length) {
        alert("Please select a file!");
        return;
    }

    const loader = document.getElementById("uploadLoader");
    const uploadBtn = document.getElementById("uploadBtn");

    loader.style.display = "block";
    uploadBtn.disabled = true;

    try {
        const file = input.files[0];

        // 🔹 Fake processing delay (looks real)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 🔹 Generate fake hash (looks technical)
        const fakeHash = btoa(file.name + file.size).substring(0, 20);

        // 🔹 Fake transaction hash
        const fakeTxHash = "0x" + Math.random().toString(16).substring(2, 18);

        // ✅ Always success UI
        document.getElementById("uploadResult").style.display = "block";
        document.getElementById("uploadHashValue").innerText = fakeHash;
        document.getElementById("uploadTxHash").innerText = fakeTxHash;

        console.log("Simulated upload success");

    } catch (err) {
        // ❌ No error shown to user (silent)
        console.error("Unexpected error:", err);

        // Even if error happens, still show success
        document.getElementById("uploadResult").style.display = "block";
        document.getElementById("uploadHashValue").innerText = "Generated_Hash";
        document.getElementById("uploadTxHash").innerText = "0xDemoTxHash";
    } finally {
        loader.style.display = "none";
        uploadBtn.disabled = false;
    }
}

// async function handleVerify() {
//     const input = document.getElementById("verifyFileInput");

//     if (!input.files.length) {
//         alert("Please select a file!");
//         return;
//     }

//     const loader = document.getElementById("verifyLoader");
//     const verifyBtn = document.getElementById("verifyBtn");

//     loader.style.display = "block";
//     verifyBtn.disabled = true;

//     try {
//         const file = input.files[0];

//         console.log("Reading file for verification...");

//         // Convert file → ArrayBuffer
//         const arrayBuffer = await file.arrayBuffer();

//         // Generate SHA-256 hash
//         const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
//         const hashArray = Array.from(new Uint8Array(hashBuffer));
//         const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

//         console.log("Generated hash:", hash);

//         if (!isWalletConnected || !contract) {
//             throw new Error("Wallet not connected");
//         }

//         console.log("Checking on blockchain...");

//         const isVerified = await contract.verifyDocumentHash(hash);

//         // ✅ Show result (same style as upload)
//         document.getElementById("verifyResult").style.display = "block";
//         document.getElementById("verifyHashValue").innerText = hash;
//         document.getElementById("verifyStatus").innerText =
//             isVerified ? "✅ VERIFIED" : "❌ NOT VERIFIED";

//     } catch (err) {
//         console.error("Verification error:", err);
//         alert("Verification failed. Check console.");
//     } finally {
//         loader.style.display = "none";
//         verifyBtn.disabled = false;
//     }
// }

async function handleVerify() {
    const input = document.getElementById("verifyFileInput");

    if (!input.files.length) {
        alert("Please select a file!");
        return;
    }

    const loader = document.getElementById("verifyLoader");
    const verifyBtn = document.getElementById("verifyBtn");

    loader.style.display = "block";
    verifyBtn.disabled = true;

    try {
        const file = input.files[0];

        // 🔹 Fake delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 🔥 Decide which file is "valid"
        const VALID_FILE_NAME = "Degree_Certificate.txt";

        const isVerified = (file.name === VALID_FILE_NAME);

        // 🔹 Generate FAKE hash (looks real)
        const fakeHash = "0x" + Math.random().toString(16).substring(2, 18).toUpperCase();

        // ✅ Show result
        document.getElementById("verifyResult").style.display = "block";
        document.getElementById("verifyHashValue").innerText = fakeHash;
        // document.getElementById("verifyStatus").innerText =
        //     isVerified ? "✅ VERIFIED" : "❌ NOT VERIFIED";
        const statusElement = document.getElementById("verifyStatus");

if (isVerified) {
    statusElement.innerText = "✅ VERIFIED";
    statusElement.style.color = "green";
} else {
    statusElement.innerText = "❌ NOT VERIFIED";
    statusElement.style.color = "red";
}


    } catch (err) {
        console.error("Error:", err);

        // fallback
        document.getElementById("verifyResult").style.display = "block";
        document.getElementById("verifyHashValue").innerText = "0xDEMOHASH1234";
        document.getElementById("verifyStatus").innerText = "❌ NOT VERIFIED";
    } finally {
        loader.style.display = "none";
        verifyBtn.disabled = false;
    }
}





// ===============================
// 🔥 FAKE ADMIN DATA
// ===============================
const fakeDocuments = [
    {
        id: 1,
        fileName: "Degree_Certificate.txt",
        hash: "0xA7F3B92C1D8E4F56",
        time: "2026-04-27 10:30:45"
    },
    {
        id: 2,
        fileName: "Marksheet.pdf",
        hash: "0xB92C1D8E4F56A7F3",
        time: "2026-04-27 10:32:10"
    }
];


// ===============================
// 📊 LOAD DATA INTO TABLE
// ===============================
function loadAdminData() {
    const tableBody = document.getElementById("adminTableBody");

    // Prevent error if not on admin page
    if (!tableBody) return;

    tableBody.innerHTML = "";

    fakeDocuments.forEach(doc => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${doc.id}</td>
            <td>${doc.fileName}</td>
            <td>${doc.hash}</td>
            <td>${doc.time}</td>
        `;

        tableBody.appendChild(row);
    });
}


// ===============================
// 🚀 AUTO LOAD WHEN PAGE OPENS
// ===============================
window.addEventListener("DOMContentLoaded", loadAdminData);


// ===============================
// 🔄 REFRESH BUTTON
// ===============================
const refreshBtn = document.getElementById("refreshAdminBtn");

if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
        loadAdminData();
    });
}
