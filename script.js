const contractAddress = "0x6848aeCa0006aEd53ec302b40ce48BA410727E30"
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "noteSender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "addedNote",
				"type": "string"
			}
		],
		"name": "NoteAdded",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getNote",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNoteWithArray",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_note",
				"type": "string"
			}
		],
		"name": "setNote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_note",
				"type": "string"
			}
		],
		"name": "setNoteWithArray",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let contract;

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(contractAddress, abi, signer);
        console.log(contract);
    });
});

async function setNote(){
    const note = document.getElementById("note").value;
    await contract.setNote(note);
}

async function getNote(){
    const note = await  contract.getNote();
    document.getElementById("result").innerText = note;
}