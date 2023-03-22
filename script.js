const contractAddress = "0x4e1433fb16f9be999d9f2c24e1fc5cacee9c5897"
const abi = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "contractValue",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "userValue",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "userWon",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "contractWon",
				"type": "bool"
			}
		],
		"name": "GamePlayed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_option",
				"type": "uint8"
			}
		],
		"name": "playGame",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let contract;
var userWonl;
var contractWonl;


provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(contractAddress, abi, signer);
        console.log(contract);
    });
});

async function playGame(){
    const usersChoice = document.getElementById("usersChoice").value;
	contract.on("GamePlayed",
	 (player, contractValue, userValue, userWon, contractWon) => {
		if (userWon == contractWon){
			document.getElementById("gameResult").innerText = 'Draw. Your funds will be sent back to you';
		}
		else if (userWon < contractWon){
			document.getElementById("gameResult").innerText = 'You lost';
		}
		else{
			document.getElementById("gameResult").innerText = 'You won and doubled your stake';
		}
	});
    result = await contract.playGame(usersChoice, { value: ethers.utils.parseEther("0.0001")}).then(document.getElementById("gameResult").innerText = 'Transaction pending...');
	
}
