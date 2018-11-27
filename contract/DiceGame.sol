pragma solidity ^0.4.17;


contract DiceGame{
    
    
    address player;
    string message = "";
    uint balance = 0;
    bool value;
    address _to;
    uint256 _amount;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    
    constructor()  public payable{
        message = "You have Lost!";
        balance = (.0001 * 5 ether);
        value = false;
    }
    
    
    function rollDice() public payable returns (bool){
        require(player == msg.sender);
        require(msg.value == .0001 ether);
        
        uint side1 = random();
        uint side2 = random();
        
        uint diceTotal = side1 + side2;
        
        while(side1 == side2){
            message = "You have rolled Doubles, you get a free roll!";
            uint newSide1 = random();
            uint newSide2 = random();
            uint newDiceTotal = newSide1 + newSide2;
            
            if(newDiceTotal == 7){
                value = false;
                message = "You have Lost!";
            }
            else if(newDiceTotal == diceTotal){
                value = true;
                message = "You have Won!";
            }
        }
        if(diceTotal == 7 || diceTotal == 11){
            value = true;
            message = "You have Won!";
        }
        
        if(value == true){
            transfer(player, balance);
            return true;
        }
    }
    
    
    function transfer(address, uint256) public {
        _amount = balance;
        _to = player;
        emit Transfer(msg.sender, _to, _amount); 
    }   
    
    
    function random() private view returns (uint256) {
        uint randomnumber = uint(keccak256(abi.encodePacked(now, msg.sender))) % 6 + 1;
        return randomnumber;
    }
}