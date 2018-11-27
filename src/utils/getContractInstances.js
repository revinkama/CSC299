

  const componentDidMount = async() =>{
    try{
      const fs = require ("fs");
      const solc = require ("solc");
      const Web3 = require ("web3");
      const web3 = new Web3 (new Web3.providers.HttpProvider ("http://localhost:9545"));
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0].toString(10);
      web3.eth.defaultAccount = account;
      console.log(account.toString(10));


      const initialSupply = 1000;
      const compiledContract = solc.compile (fs.readFileSync ("DiceGame.sol", "utf-8"), 1);
      const abi = compiledContract.contracts[":DiceGame"].interface;
      const bytecode = "0x" + compiledContract.contracts[":DiceGame"].bytecode;
      const gasEstimate = web3.eth.estimateGas({ data: bytecode }) + 1000; 
      const DiceGameContractFactory = web3.eth.contract (JSON.parse (abi));
      const DiceGameInstance = DiceGameContractFactory.new (initialSupply, { 
        from: web3.eth.accounts[1], 
        data: bytecode, 
        gas: gasEstimate 
      }, function (e, instance) { 
        // Note: called twice!
        console.log ("Callback");
        if (typeof instance.address !== "undefined") { 
          console.log ("Contract address: " + instance.address);
          console.log ("Contract transaction hash: " + instance.transactionHash);
          fs.writeFileSync ("address.txt", instance.address, "utf-8");
          fs.writeFileSync ("abi.json", abi, "utf-8");
        } else {
          console.log ("Contract not created"); 
        }
      });
      web3 = web3.eth.contract.setProvider(web3.currentProvider);
      this.setState({web3, contract: DiceGameInstance, account});

    }catch(error){
      alert(
        'Failed to load Web3, accounts, or contracts'
      );
      console.log(error);
    } 
  }