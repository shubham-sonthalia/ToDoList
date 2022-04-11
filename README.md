# ToDoList

ToDoList is a web3 web application that allows users to add their to-do tasks, and tick it off when the task is done.

Both "adding a task" and "complete a task" is a function from the smart contract, and so users will have to sign transactions from their Metamask wallet
to complete each transaction. 

Allow me to help you understand my work step-by-step: 

1. Install all required tech stack: 1. node.js 2. truffle framework 3. Ganache 4. Metamask extension
2. Clone this repository and open it in VS Code (or a browser of your choice). 
3. Run `npm install` or `yarn add` to install all the dependencies. A node_modules folder would be downloaded. 
4. Run `truffle compile` to compile all the smart contracts. 
5. Run `truffle migrate` to deploy the contracts on the local blockchain network (Ganache in our case). Now we are ready to 'talk' to the smart contract 
   from the `truffle console` command. 
6. Go to Ganache, and copy the private key of the first address that you see on the list, or address[0]. Go to Metamask extension on your browser, and change
  your network to `localhost:7545`, and add the configuration details. On this network, you need to import account. Click on 'Import Accounts' and paste the 
  private key of the account[0]. 
8. Run `npm run dev` to start the browser. 
9. Now you are ready to do transactions. 


Explaining Migrations: 

Migration files are responsible for deploying the smart contracts on the blockchain network. The blockchain network could be public (mainnet), or 
private (Ganache), or test networks (testnet). If we add any new smart contract, we need to create a `{next_sequence_number}_deploy_{contract_name}` file in the Migrations folder. 

Explaining Tests: 

The test files are written to test the functions of the smart contracts. By running `truffle test` command in the console, we can test our smart contracts. 
The test files use `Mocha` and `Chai` libraries to test the smart contracts. 
