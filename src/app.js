import Web3, { currentProvider, eth } from "web3";
// import web3 from "web3";
App = {
  loading: false,
  contracts: {},
  load: async () => {
    //load app...
    await App.connectToBlockchain();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },
  connectToBlockchain: async () => {
    if (typeof web3 !== "undefined") {
      App.web3Provider = currentProvider;
      web3 = new Web3(currentProvider);
    } else {
      window.alert("Please connect to Metamask.");
    }
    //Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new web3(ethereum);
      try {
        // request account access if needed
        await ethereum.enable();
        // Accounts now exposed
        eth.sendTransaction({});
      } catch (error) {}
    }
    // legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = currentProvider;
      window.web3 = new Web3(currentProvider);
      eth.sendTransaction({});
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying Metamask!"
      );
    }
  },
  loadAccount: async () => {
    App.account = web.eth.accounts[0];
    console.log(account);
  },
};

// what is this function doing?

$(() => {
  $(window).load(() => {
    App.load();
  });
});
