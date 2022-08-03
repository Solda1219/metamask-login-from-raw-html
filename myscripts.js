import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
// mainnet



document.getElementById('connect-text').addEventListener('click', function (event) {
	const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'))

	const currentProvider = await detectEthereumProvider();

	if (currentProvider) {
		let web3InstanceCopy = new Web3(currentProvider);
		if (!window.ethereum.selectedAddress) {
			await window.ethereum.request({ method: 'eth_requestAccounts' });
		}
		await window.ethereum.enable();
		let currentAddress = window.ethereum.selectedAddress;
		console.log("currentAddress", currentAddress);
	} else {
		console.log('Please install MetaMask!');
	}
});


