import React, { Component } from 'react';
import logo from './logo.svg';
import getContractInstance from './utils/getContractInstances'
import getWeb3 from './utils/getWeb3';

import './App.css';

class App extends Component {


  state = {message: "", won: false, balance: "0", web3: null, account: "", contract: null, contract_address: "0x50c8d04b3a0f9f8b07472626dabc9d4878776f25" };
  
  
  onSubmit = async(event) => {
    event.preventDefault()

    const {account, contract, web3, contract_address} = this.state;
    
    this.setState({ message: "Waiting on transaction success..." });
    var deploy = await getWeb3(contract_address).rollDice({
      if(deploy = true){
        deploy.transfer({
          account: getWeb3.account,
          balance: getWeb3.balance
        });
      }
    });
    
    this.setState({ message: this.onSubmit.deploy.message});
    
  }


    render() {
      const { account, web3, contract_address, balance } = this.state;
      if (!web3) {
        return <div>Loading Web3, accounts, and contract...</div>;
      }
      return (
      <div id = "Game" className="Game">
        <h2>This is my Dice Game contract</h2>
        <p>
          This contract is managed by: {contract_address}
        </p>
        <p>
          Player: {account}
        </p>
        <p>
          Balance: {balance}
        </p>
        <hr />
        <form>
          <h4>Want to try your luck?</h4>
          <div>
            <h3>Rules</h3>
            <li>7 or 11 are the only winning numbers, unless you roll Doubles!!!</li>
            <li>Doubles allow for another roll, but next total has to be previous total from last roll</li>
            <li>7 is a loss after doubles are rolled!</li>
          </div>
          <div>
            <label>Gamble .005 Ether for 5x the amount!</label>
          </div>
          <button onClick={this.onSubmit}>Play Game</button>
        </form>
        <hr />
      </div>
    );
  }
}
export default App