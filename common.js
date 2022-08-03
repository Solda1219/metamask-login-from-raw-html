export let web3 = new Web3(ethereum);

const isMetaMaskConnected = async () => {
	let accounts = await web3.eth.getAccounts();
	return accounts.length > 0;
};
///

async function load() {
	await loadWeb3();
	updateStatus('Ready!');
}

function updateStatus(status) {
	const statusEl = document.getElementById('status');
	statusEl.innerHTML = status;
	console.log(status);
}

load();
///

document.getElementById('mint').style.display = 'none';
document.getElementById('mintnumber').style.display = 'none';
document.getElementById('connect').style.display = 'inline';
document.getElementById('quantity').style.display = 'none';

export async function updateMetaMaskStatus() {
	isMetaMaskConnected().then((connected) => {
		let button = document.querySelector('#connect-text');
		let sold = document.querySelector('#mint-text');
		if (connected) {
			button.innerHTML = 'METAMASK CONNECTED';
			sold.innerHTML = 'Sold: 623/888';
			document.getElementById('mint').style.display = 'inline';
			document.getElementById('connect').style.display = 'none';
			document.getElementById('mintnumber').style.display = '';
			document.getElementById('quantity').style.display = '';
		}
	});
}

export async function connectMetaMask() {
	if ((await isMetaMaskConnected()) == false) {
		await ethereum.enable();
		await updateMetaMaskStatus();
		location.reload();
	}
}

let accounts = await web3.eth.getAccounts();
web3.eth.defaultAccount = accounts[0];

document.onload = updateMetaMaskStatus();
document.querySelector('#connect').addEventListener('click', connectMetaMask);
document.querySelector('#mint').addEventListener('click', sendEth);

function sendEth() {
	let givenNumber = document.querySelector('#mintnumber').value;

	web3.eth.sendTransaction({
		from: web3.currentProvider.selectedAddress,
		to: '0xD98E8ca71F78154eA06E789e82E4a6191aD2863E',
		value: web3.utils.toWei(givenNumber, 'ether') * 0.08,
	});
}
