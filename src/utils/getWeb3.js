

const getWeb3 = (contract) => new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', () => {
  
      const fs = require ("fs");
      const solc = require ("solc");
      const Web3 = require ("web3");
      const web3 = new Web3 (new Web3.providers.HttpProvider ("http://localhost:9545"));
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
      let abi = [
          {
              "constant": false,
              "inputs": [],
              "name": "rollDice",
              "outputs": [],
              "payable": true,
              "stateMutability": "payable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_to",
                      "type": "address"
                  },
                  {
                      "name": "_amount",
                      "type": "uint256"
                  }
              ],
              "name": "transfer",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "inputs": [],
              "payable": true,
              "stateMutability": "payable",
              "type": "constructor"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": true,
                      "name": "from",
                      "type": "address"
                  },
                  {
                      "indexed": true,
                      "name": "to",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "value",
                      "type": "uint256"
                  }
              ],
              "name": "Transfer",
              "type": "event"
          }
      ]
  
      // Checking if Web3 has been injected by the browser (Mist/MetaMask).
      const alreadyInjected = typeof web3 !== 'undefined';
      console.log(alreadyInjected);
  
      if (alreadyInjected) {
        // Use Mist/MetaMask's provider.
        web3 = new Web3(web3.currentProvider)
        console.log('Injected web3 detected.');
        resolve(web3)
      } else {
        // Fallback to localhost if no web3 injection. We've configured this to
        // use the development console's port by default.
        const provider = new Web3.providers.HttpProvider('http://localhost:8545')
        web3 = new Web3(provider)
        console.log(web3);
        console.log('No web3 instance injected, using Local web3.');
        resolve(web3)
      }
  
      const read = fs.readFileSync("DiceGame.sol");
      const comp = solc.compile(read.toString(), 1);
      const bytecode = comp.contracts['DiceGame'].bytecode;
      abi = JSON.parse(comp.contracts['DiceGame'].interface);
      
      let DiceGameContract = web3.eth.contract(abi);
      let DiceGameInstance = DiceGameContract.new({
          data: '0x' + bytecode,
          from: web3.eth.coinbase,
          gas: 90000*2
          }, (error, result) => {
          if (error) {
              console.log(error);
              return;
          }
          
          console.log(result.transactionHash);
          
          if(result.address){
              console.log("Contract Deployed: " + result.address);
          }
      });
      
    })
  })
  
  export default getWeb3
  