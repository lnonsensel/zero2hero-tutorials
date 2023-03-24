//0xe2Ab25Cb5F1D40168B951e57582c786Df210F005  -With history
//0x4e1433fb16f9be999d9f2c24e1fc5cacee9c5897 -Without history


const contractAddress = "0xe2Ab25Cb5F1D40168B951e57582c786Df210F005"
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
		"inputs": [],
		"name": "getMyHistory",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
		"outputs": [],
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
let usersChoice;

provider.send("eth_requestAccounts", []).then(() => {
	provider.listAccounts().then((accounts) => {
		signer = provider.getSigner(accounts[0]);
		contract = new ethers.Contract(contractAddress, abi, signer);
		console.log(contract);
	});
});

function getButtonRock() {
	console.log('rock');
	usersChoice = 0;
}

function getButtonScissors() {
	console.log('scissors');
	usersChoice = 1;
}


function getButtonPaper() {
	console.log('paper');
	usersChoice = 2;
}



async function playGame() {
	let stake = document.getElementById('stake').value;
	contract.on("GamePlayed",
		(player, contractValue, userValue, userWon, contractWon) => {
			if (userWon == contractWon) {
				document.getElementById("game-status").innerText = 'Draw. Your funds will be sent back to you';
			}
			else if (userWon < contractWon) {
				document.getElementById("game-status").innerText = 'You lost';
			}
			else {
				document.getElementById("game-status").innerText = 'You won and doubled your stake';
			}
		});
	result = await contract.playGame(usersChoice, { value: ethers.utils.parseEther(stake) }).then(document.getElementById("game-status").innerText = 'Transaction pending...');
}

async function getHistory() {
	await contract.getMyHistory().then((result) => {
		result = result.slice(-5,);
		document.getElementById('history1').innerText = result[4];
		document.getElementById('history2').innerText = result[3];
		document.getElementById('history3').innerText = result[2];
		document.getElementById('history4').innerText = result[1];
		document.getElementById('history5').innerText = result[0];
	});
}
